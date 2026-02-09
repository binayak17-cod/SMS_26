import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Input, Select, Badge, Toast } from './AdminComponents';

const AttendancePage = () => {
    const [filterClass, setFilterClass] = useState('');
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
    const [editingRow, setEditingRow] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [editFormData, setEditFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState([]);

    // Fetch students from database
    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch attendance when filters change
    useEffect(() => {
        if (filterClass) {
            fetchAttendance();
        }
    }, [filterClass, filterDate]);

    const fetchStudents = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users?role=student');
            const data = await res.json();
            const studentsList = data.users || [];
            setStudents(studentsList);
            
            // Extract unique classes from students
            const uniqueClasses = [...new Set(
                studentsList.map(s => `${s.department}${s.sec}`)
            )].sort();
            
            setClasses(uniqueClasses);
            
            // Set default class if not set
            if (!filterClass && uniqueClasses.length > 0) {
                setFilterClass(uniqueClasses[0]);
            }
        } catch (err) {
            console.error('Error fetching students:', err);
            showToastMessage('Error fetching students');
        }
    };

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:5000/api/attendance?class=${filterClass}&date=${filterDate}`
            );
            
            if (!res.ok) {
                throw new Error('Failed to fetch attendance');
            }
            
            const data = await res.json();
            
            // If no attendance records exist, create initial records from students
            if (!data.attendance || data.attendance.length === 0) {
                const initialRecords = students
                    .filter(s => `${s.department}${s.sec}` === filterClass)
                    .map(s => ({
                        id: s.id,
                        roll: s.id,
                        name: s.name,
                        status: 'Absent',
                        remarks: ''
                    }));
                setAttendanceData(initialRecords);
            } else {
                setAttendanceData(data.attendance);
            }
        } catch (err) {
            console.error('Error fetching attendance:', err);
            // Show students list even if fetch fails
            const initialRecords = students
                .filter(s => `${s.department}${s.sec}` === filterClass)
                .map(s => ({
                    id: s.id,
                    roll: s.id,
                    name: s.name,
                    status: 'Absent',
                    remarks: ''
                }));
            setAttendanceData(initialRecords);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (record) => {
        setEditingRow(record.id);
        setEditFormData({ ...record });
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditFormData({});
    };

    const handleSave = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: editFormData.id,
                    date: filterDate,
                    class: filterClass,
                    status: editFormData.status,
                    remarks: editFormData.remarks
                })
            });

            if (res.ok) {
                setAttendanceData(prev => 
                    prev.map(item => item.id === editingRow ? editFormData : item)
                );
                setEditingRow(null);
                showToastMessage('Attendance updated successfully');
            } else {
                showToastMessage('Error updating attendance');
            }
        } catch (err) {
            console.error('Error saving attendance:', err);
            showToastMessage('Error saving attendance');
        }
    };

    const handleChange = (field, value) => {
        setEditFormData(prev => ({ ...prev, [field]: value }));
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="attendance-page">
            <Card title="Attendance Management">
                <div className="filters-bar" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <Select
                        label="Class"
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        options={classes.map(cls => ({ value: cls, label: cls }))}
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
                ) : attendanceData.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>No students found for this class</div>
                ) : (
                    <Table headers={['Roll No', 'Student Name', 'Status', 'Remarks', 'Actions']}>
                        {attendanceData.map(record => (
                            <tr key={record.id}>
                                <td>{record.roll}</td>
                                <td>{record.name}</td>
                                <td>
                                    {editingRow === record.id ? (
                                        <select
                                            className="admin-select"
                                            value={editFormData.status}
                                            onChange={(e) => handleChange('status', e.target.value)}
                                            style={{ padding: '4px 8px', fontSize: '0.875rem' }}
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Late">Late</option>
                                        </select>
                                    ) : (
                                        <Badge type={
                                            record.status === 'Present' ? 'success' :
                                                record.status === 'Absent' ? 'danger' : 'warning'
                                        }>
                                            {record.status}
                                        </Badge>
                                    )}
                                </td>
                                <td>
                                    {editingRow === record.id ? (
                                        <input
                                            className="admin-input"
                                            value={editFormData.remarks}
                                            onChange={(e) => handleChange('remarks', e.target.value)}
                                            style={{ padding: '4px 8px', fontSize: '0.875rem' }}
                                        />
                                    ) : (
                                        record.remarks || '-'
                                    )}
                                </td>
                                <td>
                                    {editingRow === record.id ? (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Button variant="success" onClick={handleSave} style={{ padding: '4px 8px' }}>💾</Button>
                                            <Button variant="ghost" onClick={handleCancel} style={{ padding: '4px 8px' }}>❌</Button>
                                        </div>
                                    ) : (
                                        <Button variant="ghost" onClick={() => handleEditClick(record)} className="btn-icon">✏️</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </Card>

            <Toast
                message={toastMessage}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default AttendancePage;