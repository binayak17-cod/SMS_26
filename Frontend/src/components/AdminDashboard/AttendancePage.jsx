import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Input, Select, Badge, Toast } from './AdminComponents';

const AttendancePage = () => {
    const [filterClass, setFilterClass] = useState('');
    const [filterSemester, setFilterSemester] = useState('');
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterSubject, setFilterSubject] = useState('');
    const [filterSessionType, setFilterSessionType] = useState('Theory');
    const [editingRow, setEditingRow] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [editFormData, setEditFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

   
    useEffect(() => {
        if (filterClass) {
            fetchSubjectsForClass(filterClass);
        }
    }, [filterClass]);


    useEffect(() => {
        if (filterClass && filterSemester && filterSubject && filterSessionType && filterDate) {
            fetchAttendance();
        }
    }, [filterClass, filterSemester, filterDate, filterSubject, filterSessionType]);

    const fetchStudents = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users?role=student');
            const data = await res.json();
            const studentsList = data.users || [];
            setStudents(studentsList);

            const uniqueClasses = [...new Set(
                studentsList.map(s => `${s.department}${s.sec}`)
            )].sort();

            setClasses(uniqueClasses);

            if (!filterClass && uniqueClasses.length > 0) {
                setFilterClass(uniqueClasses[0]);
            }
        } catch (err) {
            console.error('Error fetching students:', err);
            showToastMessage('Error fetching students');
        }
    };

    const fetchSubjectsForClass = async (className) => {
        try {
            
            const classStudents = students.filter(
                s => `${s.department}${s.sec}` === className
            );

            if (classStudents.length > 0) {
                const firstStudent = classStudents[0];
                const res = await fetch(
                    `http://localhost:5000/api/student/subjects?studentId=${firstStudent.id}`
                );
                if (res.ok) {
                    const data = await res.json();
                    const subjectsList = (data.subjects || []).map(s => ({
                        subject: s.subject,
                        session_type: s.session_type
                    }));
                    
                    const uniqueSubjects = [...new Map(
                        subjectsList.map(s => [s.subject, s])
                    ).values()];
                    
                    setSubjects(uniqueSubjects);

                    const semsList = data.semesters || [];
                    setSemesters(semsList);
                    if (semsList.length > 0 && !filterSemester) {
                        setFilterSemester(semsList[0]);
                    }

                    if (uniqueSubjects.length > 0 && !filterSubject) {
                        setFilterSubject(uniqueSubjects[0].subject);
                        setFilterSessionType(uniqueSubjects[0].session_type);
                    }
                    return;
                }
            }

            setSubjects([]);
        } catch (err) {
            console.error('Error fetching subjects:', err);
            setSubjects([]);
        }
    };

    const fetchAttendance = async () => {
        if (!filterClass || !filterSemester || !filterSubject || !filterSessionType) return;
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:5000/api/attendance?class=${filterClass}&semester=${encodeURIComponent(filterSemester)}&date=${filterDate}&subject=${encodeURIComponent(filterSubject)}&session_type=${encodeURIComponent(filterSessionType)}`
            );

            if (!res.ok) {
                throw new Error('Failed to fetch attendance');
            }

            const data = await res.json();

            if (!data.attendance || data.attendance.length === 0) {
          
                const initialRecords = students
                    .filter(s => `${s.department}${s.sec}` === filterClass && s.semester === filterSemester)
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
         
            const initialRecords = students
                .filter(s => `${s.department}${s.sec}` === filterClass && s.semester === filterSemester)
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
                    subject: filterSubject,
                    session_type: filterSessionType,
                    status: editFormData.status,
                    remarks: editFormData.remarks || ''
                })
            });

            if (res.ok) {
                setAttendanceData(prev =>
                    prev.map(item => item.id === editingRow ? editFormData : item)
                );
                setEditingRow(null);
                showToastMessage('Attendance updated successfully');
            } else {
                const errData = await res.json();
                showToastMessage(errData.error || 'Error updating attendance');
            }
        } catch (err) {
            console.error('Error saving attendance:', err);
            showToastMessage('Error saving attendance');
        }
    };

    const handleMarkAll = async (status) => {
        setLoading(true);
        try {
            const promises = attendanceData.map(record =>
                fetch('http://localhost:5000/api/attendance', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentId: record.id,
                        date: filterDate,
                        class: filterClass,
                        subject: filterSubject,
                        session_type: filterSessionType,
                        status: status,
                        remarks: ''
                    })
                })
            );

            const results = await Promise.all(promises);
            const allOk = results.every(r => r.ok);

            if (allOk) {
                setAttendanceData(prev =>
                    prev.map(item => ({ ...item, status }))
                );
                showToastMessage(`All students marked as ${status}`);
            } else {
                showToastMessage('Some records failed to update');
            }
        } catch (err) {
            console.error('Error marking all:', err);
            showToastMessage('Error updating attendance');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setEditFormData(prev => ({ ...prev, [field]: value }));
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };


    const uniqueSubjects = [...new Map(
        subjects.map(s => [`${s.subject}_${s.session_type}`, s])
    ).values()];

    const handleSubjectChange = (e) => {
        const value = e.target.value;
        setFilterSubject(value);

        const match = subjects.find(s => s.subject === value);
        if (match) {
            setFilterSessionType(match.session_type);
        }
    };

    return (
        <div className="attendance-page">
            <Card title="Attendance Management">
                <div className="filters-bar" style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <Select
                        label="Class"
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        options={classes.map(cls => ({ value: cls, label: cls }))}
                    />
                    <Select
                        label="Semester"
                        value={filterSemester}
                        onChange={(e) => setFilterSemester(e.target.value)}
                        options={
                            semesters.length > 0
                                ? semesters.map(sem => ({ value: sem, label: sem }))
                                : [{ value: '', label: 'No semesters' }]
                        }
                    />
                    <Select
                        label="Subject"
                        value={filterSubject}
                        onChange={handleSubjectChange}
                        options={
                            uniqueSubjects.length > 0
                                ? uniqueSubjects.map(s => ({
                                    value: s.subject,
                                    label: `${s.subject} (${s.session_type})`
                                }))
                                : [{ value: '', label: 'No subjects found' }]
                        }
                    />
                    <Select
                        label="Session Type"
                        value={filterSessionType}
                        onChange={(e) => setFilterSessionType(e.target.value)}
                        options={[
                            { value: 'Theory', label: 'Theory' },
                            { value: 'Lab', label: 'Lab' }
                        ]}
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>

                {attendanceData.length > 0 && !loading && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <Button variant="primary" onClick={() => handleMarkAll('Present')}>
                            Mark All Present
                        </Button>
                        <Button variant="ghost" onClick={() => handleMarkAll('Absent')}>
                            Mark All Absent
                        </Button>
                    </div>
                )}

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
                ) : !filterSubject ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        Please select a class and subject to view attendance
                    </div>
                ) : attendanceData.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>No students found for this class</div>
                ) : (
                    <Table headers={['Roll No', 'Student Name', 'Status', 'Actions']}>
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
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Button variant="primary" onClick={handleSave} style={{ padding: '4px 12px' }}>Save</Button>
                                            <Button variant="ghost" onClick={handleCancel} style={{ padding: '4px 8px' }}>Cancel</Button>
                                        </div>
                                    ) : (
                                        <Button variant="ghost" onClick={() => handleEditClick(record)} className="btn-icon">Edit</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </Card>

            <Toast
                message={toastMessage}
                onClose={() => setToastMessage('')}
            />
        </div>
    );
};

export default AttendancePage;