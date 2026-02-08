import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Input, Select, Badge } from './AdminComponents';

const UsersPage = () => {
    const [activeTab, setActiveTab] = useState('student');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('');

    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterClass ? s.class === filterClass : true)
    );

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
useEffect(() => {
    fetch('http://localhost:5000/api/users?role=student')
        .then(res => res.json())
        .then(data => setStudents(data.users || []))
        .catch(err => console.error('Error fetching students:', err));

    fetch('http://localhost:5000/api/users?role=teacher')
        .then(res => res.json())
        .then(data => setTeachers(data.users || []))
        .catch(err => console.error('Error fetching teachers:', err));
}, []);

    return (
        <div className="users-page">
            <Card>
                <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--color-border)', marginBottom: '16px' }}>
                    <button
                        className={`tab-btn ${activeTab === 'student' ? 'active' : ''}`}
                        onClick={() => setActiveTab('student')}
                        style={{
                            padding: '8px 16px',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'student' ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === 'student' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Students
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'teacher' ? 'active' : ''}`}
                        onClick={() => setActiveTab('teacher')}
                        style={{
                            padding: '8px 16px',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'teacher' ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === 'teacher' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Teachers
                    </button>
                </div>

                <div className="filters-bar" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <Input
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '250px' }}
                    />
                    {activeTab === 'student' && (
                        <Select
                            value={filterClass}
                            onChange={(e) => setFilterClass(e.target.value)}
                            options={[
                                { value: '', label: 'All Classes' },
                                { value: '10A', label: '10A' },
                                { value: '9B', label: '9B' },
                            ]}
                            style={{ width: '150px' }}
                        />
                    )}
                </div>

                {activeTab === 'student' ? (
                    <Table headers={['ID', 'Name', 'Department', 'Email', 'Actions']}>
                        {filteredStudents.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.department}</td>
                                <td>{student.email}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Button variant="ghost" className="btn-icon">✏️</Button>
                                        <Button variant="ghost" className="btn-icon">👁️</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </Table>
                ) : (
                    <Table headers={['ID', 'Name', 'Department', 'Email', 'Actions']}>
                        {filteredTeachers.map(teacher => (
                            <tr key={teacher.id}>
                                <td>{teacher.id}</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.department}</td>
                                <td>{teacher.email}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Button variant="ghost" className="btn-icon">✏️</Button>
                                        <Button variant="ghost" className="btn-icon">👁️</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </Card>
        </div>
    );
};

export default UsersPage;
