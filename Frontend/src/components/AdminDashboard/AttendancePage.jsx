import React, { useState } from 'react';
import { Card, Table, Button, Input, Select, Badge, Toast } from './AdminComponents';

const AttendancePage = () => {
    const [filterClass, setFilterClass] = useState('10A');
    const [filterDate, setFilterDate] = useState('2023-10-27');
    const [editingRow, setEditingRow] = useState(null);
    const [showToast, setShowToast] = useState(false);

    // Dummy Data
    const [attendanceData, setAttendanceData] = useState([
        { id: 1, name: 'Alice Smith', roll: 12, status: 'Present', remarks: '' },
        { id: 2, name: 'Bob Johnson', roll: 14, status: 'Absent', remarks: 'Sick Leave' },
        { id: 3, name: 'Charlie Brown', roll: 5, status: 'Present', remarks: '' },
        { id: 4, name: 'David Lee', roll: 8, status: 'Late', remarks: 'Bus delay' },
    ]);

    const [editFormData, setEditFormData] = useState({});

    const handleEditClick = (record) => {
        setEditingRow(record.id);
        setEditFormData({ ...record });
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditFormData({});
    };

    const handleSave = () => {
        setAttendanceData(prev => prev.map(item => item.id === editingRow ? editFormData : item));
        setEditingRow(null);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleChange = (field, value) => {
        setEditFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="attendance-page">
            <Card title="Attendance Management">
                <div className="filters-bar" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <Select
                        label="Class"
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        options={[
                            { value: '10A', label: '10A' },
                            { value: '9B', label: '9B' },
                        ]}
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                    <div style={{ alignSelf: 'flex-end' }}>
                        <Button variant="primary" icon="🔍">Filter</Button>
                    </div>
                </div>

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
            </Card>

            <Toast
                message={showToast ? "Attendance updated successfully" : ""}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default AttendancePage;
