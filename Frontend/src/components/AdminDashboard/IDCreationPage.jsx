import React, { useState } from 'react';
import { Card, Input, Select, Button, Toast } from './AdminComponents';
import { motion, AnimatePresence } from 'framer-motion';

const IDCreationPage = () => {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        id: '',
        class: '',
        department: '',
        semester:'',
        sec: '',
        password: ''
    });
    const [showToast, setShowToast] = useState(false);
    const [createdUser, setCreatedUser] = useState(null);

    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
        let pass = "";
        for (let i = 0; i < 10; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData(prev => ({ ...prev, password: pass }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData, role };
        try {
            const res = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || 'Failed to create user');
                return;
            }
            setCreatedUser({ ...formData, role });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setFormData({ name: '', email: '', id: '', class: '', department: '', sec: '', password: '' });
        } catch (error) {
            console.error('Create user error', error);
            alert('Network error while creating user');
        }
    }; 

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formData.password);
        alert("Password copied!");
    };

    return (
        <div className="id-creation-page" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div className="form-section">
                <Card title="Create New User ID">
                    <form onSubmit={handleSubmit}>
                        <Select
                            label="Role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            options={[
                                { value: 'student', label: 'Student' },
                                { value: 'teacher', label: 'Teacher' },
                            ]}
                        />

                        <Input
                            label="Full Name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            
                        />

                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            
                        />

                        {role === 'student' ? (
                            <>
                                <Input
                                    label="Student Roll No"
                                    name="id"
                                    required
                                    value={formData.id}
                                    onChange={handleChange}
                                   
                                />
                                <Select
                                    label="Department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { value: '', label: 'Select Department' },
                                        { value: 'CSE', label: 'CSE' },
                                        { value: 'BSH', label: 'BSH' },
                                        { value: 'ECE', label: 'ECE' },
                                        { value: 'MECH', label: 'MECHANICAL' },
                                        { value: 'CIVIL', label: 'CIVIL' },
                                        { value: 'EEE', label: 'EEE' },
                                        { value: 'CHEM', label: 'CHEMICAL' },
                                        { value: 'BIOTECH', label: 'BIOTECH' },
                                    ]}
                                />
                                <Select
                                    label="Section"
                                    name="sec"
                                    value={formData.sec}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { value: '', label: 'Select Section' },
                                        { value: 'A', label: 'A' },
                                        { value: 'B', label: 'B' },
                                        { value: 'C', label: 'C' },
                                    ]}
                                    
                                />
                                <Select
                                    label="Semester"
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { value: '', label: 'Select Semester' },
                                        { value: 'Sem 1', label: 'Sem 1' },
                                        { value: 'Sem 2', label: 'Sem 2' },
                                        { value: 'Sem 3', label: 'Sem 3' },
                                        { value: 'Sem 4', label: 'Sem 4' },
                                        { value: 'Sem 5', label: 'Sem 5' },
                                        { value: 'Sem 6', label: 'Sem 6' },
                                        { value: 'Sem 7', label: 'Sem 7' },
                                        { value: 'Sem 8', label: 'Sem 8' },
                                    ]}
                                />
                            </>
                        ) : (
                            <>
                                <Input
                                    label="Teacher ID"
                                    name="id"
                                    required
                                    value={formData.id}
                                    onChange={handleChange}
                                    
                                />
                                <Select
                                    label="Department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    options={[
                                        { value: '', label: 'Select Department' },
                                        { value: 'CSE', label: 'CSE' },
                                        { value: 'BSH', label: 'BSH' },
                                        { value: 'ECE', label: 'ECE' },
                                        { value: 'MECH', label: 'MECHANICAL' },
                                        { value: 'CIVIL', label: 'CIVIL' },
                                        { value: 'EEE', label: 'EEE' },
                                        { value: 'CHEM', label: 'CHEMICAL' },
                                        { value: 'BIOTECH', label: 'BIOTECH' },

                                    ]}
                                />
                            </>
                        )}

                        <div className="form-group">
                            <label>Password</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    className="admin-input"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{ flex: 1 }}
                                    
                                />
                                <Button type="button" onClick={generatePassword} variant="secondary">Generate</Button>
                                <Button type="button" onClick={copyToClipboard} variant="ghost" title="Copy">📋</Button> 
                            </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <Button type="submit" variant="primary" style={{ width: '100%' }}>Create ID</Button>
                        </div>
                    </form>
                </Card>
            </div>

            <div className="preview-section">
                <AnimatePresence>
                    {createdUser && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Card title="Recently Created ID" className="id-card-preview">
                                <div style={{ textAlign: 'center', padding: '20px' }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '50%',
                                        background: 'var(--color-primary)', color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '2rem', fontWeight: 'bold', margin: '0 auto 16px'
                                    }}>
                                        {createdUser.name.charAt(0)}
                                    </div>
                                    <h3 style={{ margin: '0 0 8px' }}>{createdUser.name}</h3>
                                    <span className={`admin-badge badge-${createdUser.role === 'student' ? 'info' : 'warning'}`}>
                                        {createdUser.role.toUpperCase()}
                                    </span>

                                    <div style={{ marginTop: '24px', textAlign: 'left', background: 'var(--color-bg)', padding: '16px', borderRadius: '8px' }}>
                                        <p><strong>ID:</strong> {createdUser.id}</p>
                                        <p><strong>Email:</strong> {createdUser.email}</p>
                                        {createdUser.role === 'student' ? (
                                            <p><strong>Class:</strong> {createdUser.class}</p>
                                        ) : (
                                            <p><strong>Dept:</strong> {createdUser.department}</p>
                                        )}
                                        <p><strong>Password:</strong> <span style={{ fontFamily: 'monospace', background: '#e2e8f0', padding: '2px 4px', borderRadius: '4px' }}>{createdUser.password}</span></p>
                                    </div>

                                    <div style={{ marginTop: '16px' }}>
                                        <Button type="button" variant="secondary" style={{ width: '100%' }}>Print ID Card</Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Toast
                message={showToast ? `User ${createdUser?.name} created successfully!` : ""}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default IDCreationPage;