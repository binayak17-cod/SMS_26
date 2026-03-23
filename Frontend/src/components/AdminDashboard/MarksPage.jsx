import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Input, Select, Badge, Toast } from './AdminComponents';

const MarksPage = () => {
    const [filterClass, setFilterClass] = useState('');
    const [filterSubject, setFilterSubject] = useState('');
    const [filterSemester, setFilterSemester] = useState('');
    const [filterExam, setFilterExam] = useState('Internal');
    const [editingRow, setEditingRow] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [students, setStudents] = useState([]);
    const [marksData, setMarksData] = useState([]);
    const [editFormData, setEditFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [totalMarks, setTotalMarks] = useState(100);

    // Fetch students on mount
    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch subjects when class changes
    useEffect(() => {
        if (filterClass) {
            fetchSubjectsForClass(filterClass);
        }
    }, [filterClass]);

    // Fetch marks when all required filters are set
    useEffect(() => {
        if (filterClass && filterSubject && filterSemester && filterExam) {
            fetchMarks();
        }
    }, [filterClass, filterSubject, filterSemester, filterExam]);

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

                    // Deduplicate subjects by name
                    const uniqueSubjects = [...new Map(
                        subjectsList.map(s => [s.subject, s])
                    ).values()];

                    setSubjects(uniqueSubjects);

                    // Set semesters
                    const semsList = data.semesters || [];
                    setSemesters(semsList);

                    if (uniqueSubjects.length > 0 && !filterSubject) {
                        setFilterSubject(uniqueSubjects[0].subject);
                    }
                    if (semsList.length > 0 && !filterSemester) {
                        setFilterSemester(semsList[0]);
                    }
                    return;
                }
            }

            setSubjects([]);
            setSemesters([]);
        } catch (err) {
            console.error('Error fetching subjects:', err);
            setSubjects([]);
        }
    };

    const fetchMarks = async () => {
        if (!filterClass || !filterSubject || !filterSemester || !filterExam) return;
        setLoading(true);
        try {
            // Get students in this class
            const classStudents = students.filter(
                s => `${s.department}${s.sec}` === filterClass
            );

            // Fetch results for each student
            const marksPromises = classStudents.map(async (student) => {
                try {
                    const res = await fetch(
                        `http://localhost:5000/api/results/${student.id}?semester=${encodeURIComponent(filterSemester)}&exam_type=${encodeURIComponent(filterExam)}`
                    );
                    if (res.ok) {
                        const data = await res.json();
                        const result = (data.results || []).find(
                            r => r.subject === filterSubject
                        );
                        return {
                            id: student.id,
                            name: student.name,
                            roll: student.id,
                            marks: result ? result.obtainedMarks : '',
                            totalMarks: result ? result.totalMarks : totalMarks,
                            score: result ? result.score : null,
                            hasResult: !!result
                        };
                    }
                } catch (err) {
                    console.error(`Error fetching results for ${student.id}:`, err);
                }
                return {
                    id: student.id,
                    name: student.name,
                    roll: student.id,
                    marks: '',
                    totalMarks: totalMarks,
                    score: null,
                    hasResult: false
                };
            });

            const results = await Promise.all(marksPromises);
            setMarksData(results);
        } catch (err) {
            console.error('Error fetching marks:', err);
            showToastMessage('Error fetching marks');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (record) => {
        setEditingRow(record.id);
        setEditFormData({
            ...record,
            marks: record.marks !== '' ? record.marks : '',
            totalMarks: record.totalMarks || totalMarks
        });
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditFormData({});
    };

    const handleSave = async () => {
        const marks = parseFloat(editFormData.marks);
        const total = parseFloat(editFormData.totalMarks) || totalMarks;

        if (isNaN(marks) || marks < 0) {
            showToastMessage('Please enter valid marks');
            return;
        }
        if (marks > total) {
            showToastMessage(`Marks cannot exceed ${total}`);
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: editFormData.id,
                    semester: filterSemester,
                    examType: filterExam,
                    subject: filterSubject,
                    marks: marks,
                    totalMarks: total
                })
            });

            if (res.ok) {
                const score = total > 0 ? Math.round(marks / total * 100 * 100) / 100 : 0;
                setMarksData(prev =>
                    prev.map(item =>
                        item.id === editingRow
                            ? { ...item, marks, totalMarks: total, score, hasResult: true }
                            : item
                    )
                );
                setEditingRow(null);
                showToastMessage('Marks saved successfully');
            } else {
                const errData = await res.json();
                showToastMessage(errData.message || 'Error saving marks');
            }
        } catch (err) {
            console.error('Error saving marks:', err);
            showToastMessage('Error saving marks');
        }
    };

    const handleChange = (field, value) => {
        setEditFormData(prev => ({ ...prev, [field]: value }));
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const getGrade = (score) => {
        if (score === null || score === undefined) return '-';
        if (score >= 90) return 'A+';
        if (score >= 80) return 'A';
        if (score >= 70) return 'B';
        if (score >= 60) return 'C';
        if (score >= 40) return 'D';
        return 'F';
    };

    const getGradeColor = (grade) => {
        if (grade === 'A+' || grade === 'A') return '#059669';
        if (grade === 'B') return '#3b82f6';
        if (grade === 'C') return '#f59e0b';
        if (grade === 'D') return '#f97316';
        if (grade === 'F') return '#dc2626';
        return '#9ca3af';
    };

    return (
        <div className="marks-page">
            <Card title="Marks Entry">
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
                                ? semesters.map(s => ({ value: s, label: s }))
                                : [{ value: '', label: 'No semesters' }]
                        }
                    />
                    <Select
                        label="Subject"
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        options={
                            subjects.length > 0
                                ? subjects.map(s => ({ value: s.subject, label: s.subject }))
                                : [{ value: '', label: 'No subjects' }]
                        }
                    />
                    <Select
                        label="Exam Type"
                        value={filterExam}
                        onChange={(e) => setFilterExam(e.target.value)}
                        options={[
                            { value: 'Internal', label: 'Internal' },
                            { value: 'Semester', label: 'Semester' },
                        ]}
                    />
                    <Input
                        label="Total Marks"
                        type="number"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(parseInt(e.target.value) || 100)}
                        style={{ width: '100px' }}
                    />
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
                ) : !filterSubject || !filterSemester ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        Please select class, semester and subject to view marks
                    </div>
                ) : marksData.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>No students found for this class</div>
                ) : (
                    <Table headers={['Roll No', 'Student Name', 'Marks', 'Grade', 'Actions']}>
                        {marksData.map(record => {
                            const grade = getGrade(record.score);
                            return (
                                <tr key={record.id}>
                                    <td>{record.roll}</td>
                                    <td>{record.name}</td>
                                    <td>
                                        {editingRow === record.id ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <input
                                                    className="admin-input"
                                                    type="number"
                                                    value={editFormData.marks}
                                                    onChange={(e) => handleChange('marks', e.target.value)}
                                                    style={{ padding: '4px 8px', fontSize: '0.875rem', width: '70px' }}
                                                    min="0"
                                                    max={editFormData.totalMarks}
                                                />
                                                <span style={{ color: '#6b7280', fontSize: '13px' }}>/ {editFormData.totalMarks}</span>
                                            </div>
                                        ) : (
                                            <span>
                                                {record.marks !== '' ? (
                                                    <><strong>{record.marks}</strong> / {record.totalMarks}</>
                                                ) : (
                                                    <span style={{ color: '#9ca3af' }}>Not entered</span>
                                                )}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 700, color: getGradeColor(grade) }}>
                                            {grade}
                                        </span>
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
                            );
                        })}
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

export default MarksPage;
