import React, { useState } from 'react';
import { Card, Input, Button, Table, Badge, Modal, Toast } from './AdminComponents';

const RoleAssignmentPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([
        { id: 'T001', name: 'Mr. Anderson', email: 'anderson@school.com', role: 'Teacher' },
        { id: 'S001', name: 'Alice Smith', email: 'alice@school.com', role: 'Student' },
        { id: 'E001', name: 'John Admin', email: 'admin@school.com', role: 'Admin' },
    ]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [targetRole, setTargetRole] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleSearch = () => {
        // In real app, API search. Here just filter local dummy data
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openConfirmModal = (user, newRole) => {
        if (user.role === newRole) return;
        setSelectedUser(user);
        setTargetRole(newRole);
        setIsModalOpen(true);
    };

    const handleConfirmRoleChange = () => {
        setUsers(users.map(u =>
            u.id === selectedUser.id ? { ...u, role: targetRole } : u
        ));
        setIsModalOpen(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="role-assignment-page">
            <Card title="Role Assignment">
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <Input
                        placeholder="Search by name, email or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '300px' }}
                    />
                    <Button variant="primary" onClick={handleSearch} icon="🔍">Search</Button>
                </div>

                <Table headers={['ID', 'Name', 'Email', 'Current Role', 'Assign New Role']}>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Badge type={
                                    user.role === 'Admin' ? 'danger' :
                                        user.role === 'Teacher' ? 'warning' : 'info'
                                }>
                                    {user.role}
                                </Badge>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {user.role !== 'Teacher' && (
                                        <Button
                                            variant="secondary"
                                            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                                            onClick={() => openConfirmModal(user, 'Teacher')}
                                        >
                                            Make Teacher
                                        </Button>
                                    )}
                                    {user.role !== 'Student' && (
                                        <Button
                                            variant="secondary"
                                            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                                            onClick={() => openConfirmModal(user, 'Student')}
                                        >
                                            Make Student
                                        </Button>
                                    )}
                                    {user.role !== 'Admin' && (
                                        <Button
                                            variant="ghost"
                                            style={{ fontSize: '0.75rem', padding: '4px 8px', color: 'var(--color-danger)' }}
                                            onClick={() => openConfirmModal(user, 'Admin')}
                                        >
                                            Make Admin
                                        </Button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirm Role Change"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleConfirmRoleChange}>Confirm Change</Button>
                    </>
                }
            >
                <p>
                    Are you sure you want to change <strong>{selectedUser?.name}</strong>'s role
                    from <strong>{selectedUser?.role}</strong> to <strong>{targetRole}</strong>?
                </p>
                <p style={{ marginTop: '12px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    This may update their access permissions immediately.
                </p>
            </Modal>

            <Toast
                message={showToast ? `Role updated successfully` : ""}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default RoleAssignmentPage;
