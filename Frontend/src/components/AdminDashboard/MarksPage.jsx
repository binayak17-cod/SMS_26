import React, { useState } from 'react';
import { Card, Table, Button, Input, Select, Toast } from './AdminComponents';

const MarksPage = () => {
    const [filterClass, setFilterClass] = useState('10A');
    const [filterSubject, setFilterSubject] = useState('Math');
    const [filterExam, setFilterExam] = useState('MidTerm');
    const [editingRow, setEditingRow] = useState(null);
    const [showToast, setShowToast] = useState(false);

    // Dummy Data
    const [marksData, setMarksData] = useState([
        { id: 1, name: 'Alice Smith', roll: 12, marks: 85, grade: 'A', remarks: 'Good' },
        { id: 2, name: 'Bob Johnson', roll: 14, marks: 65, grade: 'B', remarks: 'Needs improvement' },
        { id: 3, name: 'Charlie Brown', roll: 5, marks: 92, grade: 'A+', remarks: 'Excellent' },
        { id: 4, name: 'David Lee', roll: 8, marks: 45, grade: 'D', remarks: 'Fail' },
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
        // Simple logic to auto-calculate grade (mock)
        let grade = 'F';
        const m = parseInt(editFormData.marks);
        if (m >= 90) grade = 'A+';
        else if (m >= 80) grade = 'A';
        else if (m >= 70) grade = 'B';
        else if (m >= 60) grade = 'C';
        else if (m >= 40) grade = 'D';

        const updatedRecord = { ...editFormData, grade };
        setMarksData(prev => prev.map(item => item.id === editingRow ? updatedRecord : item));
        setEditingRow(null);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleChange = (field, value) => {
        setEditFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="marks-page">
            <Card title="Marks Entry">
                <div className="filters-bar" style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <Select
                        label="Class"
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        options={[
                            { value: '10A', label: '10A' },
                            { value: '9B', label: '9B' },
                        ]}
                    />
                    <Select
                        label="Subject"
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        options={[
                            { value: 'Math', label: 'Mathematics' },
                            { value: 'Science', label: 'Science' },
                            { value: 'English', label: 'English' },
                        ]}
                    />
                    <Select
                        label="Exam"
                        value={filterExam}
                        onChange={(e) => setFilterExam(e.target.value)}
                        options={[
                            { value: 'MidTerm', label: 'Mid Term' },
                            { value: 'Final', label: 'Final Exam' },
                        ]}
                    />
                </div>

                <Table headers={['Roll No', 'Student Name', 'Marks (100)', 'Grade', 'Remarks', 'Actions']}>
                    {marksData.map(record => (
                        <tr key={record.id}>
                            <td>{record.roll}</td>
                            <td>{record.name}</td>
                            <td>
                                {editingRow === record.id ? (
                                    <input
                                        className="admin-input"
                                        type="number"
                                        value={editFormData.marks}
                                        onChange={(e) => handleChange('marks', e.target.value)}
                                        style={{ padding: '4px 8px', fontSize: '0.875rem', width: '80px' }}
                                    />
                                ) : (
                                    record.marks
                                )}
                            </td>
                            <td>
                                <span style={{ fontWeight: 600 }}>{record.grade}</span>
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
                                    record.remarks
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
                message={showToast ? "Marks saved successfully" : ""}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default MarksPage;
