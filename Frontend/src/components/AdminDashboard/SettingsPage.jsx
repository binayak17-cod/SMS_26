import React, { useState } from 'react';
import { Card, Button, Input, Select, Toast } from './AdminComponents';

const SettingsPage = () => {
    const [showToast, setShowToast] = useState(false);
    const [settings, setSettings] = useState({
        scoolName: 'Springfield High School',
        email: 'admin@springfield.edu',
        theme: 'light',
        language: 'en'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="settings-page">
            <Card title="General Settings">
                <Input
                    label="School Name"
                    name="scoolName"
                    value={settings.scoolName}
                    onChange={handleChange}
                />
                <Input
                    label="Admin Email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                />
                <div style={{ padding: '20px 0' }}>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </div>
            </Card>

            <Card title="Appearance & Language">
                <Select
                    label="Theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    options={[
                        { value: 'light', label: 'Light Mode' },
                        { value: 'dark', label: 'Dark Mode' }
                    ]}
                />
                <Select
                    label="Language"
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    options={[
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                        { value: 'fr', label: 'French' }
                    ]}
                />
            </Card>

            <Toast
                message={showToast ? "Settings saved successfully" : ""}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default SettingsPage;
