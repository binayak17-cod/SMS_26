import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Table, Badge } from './AdminComponents';
import './DashboardPage.css';

const DashboardPage = () => {
    const mountRef = useRef(null);
    const navigate = useNavigate();
    const [kpiData, setKpiData] = React.useState([
        { title: 'Total Students', value: '0', change: '+0%', color: 'primary' },
        { title: 'Total Teachers', value: '0', change: '+0%', color: 'success' },
        { title: 'Overall Attendance', value: '0%', change: '0%', color: 'warning' },
        { title: 'Active Classes', value: '0', change: '+0%', color: 'info' },
    ]);

    useEffect(() => {
        // Fetch dashboard stats
        fetch('http://localhost:5000/api/dashboard/stats')
            .then(res => res.json())
            .then(data => {
                console.log('Dashboard stats:', data);
                if (data.success) {
                    setKpiData([
                        { title: 'Total Students', value: data.totalStudents || '0', change: '+12%', color: 'primary' },
                        { title: 'Total Teachers', value: data.totalTeachers || '0', change: '+2%', color: 'success' },
                        { title: 'Overall Attendance', value: data.overallAttendance || '0%', change: '0%', color: 'warning' },
                        { title: 'Active Classes', value: data.activeClasses || '0', change: '+5%', color: 'info' },
                    ]);
                }
            })
            .catch(err => console.error('Error fetching stats:', err));
    }, []);

    // Three.js Background Effect
    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Particles
        const geometry = new THREE.BufferGeometry();
        const particlesCount = 50;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Create a soft circle texture
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 1)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 0.15,
            map: texture,
            transparent: true,
            opacity: 0.4, // subtle
            color: 0x3b82f6
        });

        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        camera.position.z = 5;

        // Animation
        let mouseX = 0;
        let mouseY = 0;

        const animate = () => {
            requestAnimationFrame(animate);

            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        const handleResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);



    const recentActivity = [
        { id: 1, user: 'Sarah Connor', action: 'Created new Student ID', time: '10 mins ago' },
        { id: 2, user: 'Admin User', action: 'Updated Attendance for Class 10A', time: '1 hour ago' },
        { id: 3, user: 'John Doe', action: 'Uploaded Marks for English', time: '2 hours ago' },
        { id: 4, user: 'System', action: 'Backup completed successfully', time: '1 day ago' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="dashboard-page">
            <div className="three-bg" ref={mountRef}></div>

            <motion.div
                className="dashboard-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* KPI Cards */}
                <div className="kpi-grid">
                    {kpiData.map((kpi, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="kpi-card">
                                <div className="kpi-header">
                                    <h4>{kpi.title}</h4>
                                    <span className={`kpi-change text-${kpi.color}`}>{kpi.change}</span>
                                </div>
                                <div className="kpi-value">{kpi.value}</div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions & Activity */}
                <div className="dashboard-split">
                    <motion.div variants={itemVariants} className="split-left">
                        <Card title="Quick Actions">
                            <div className="quick-actions-grid">
                                <Button
                                    variant="primary"
                                    icon="🆔"
                                    onClick={() => navigate('/admin/id-creation')}
                                >
                                    Create New ID
                                </Button>
                                <Button
                                    variant="secondary"
                                    icon="📅"
                                    onClick={() => navigate('/admin/attendance')}
                                >
                                    Update Attendance
                                </Button>
                                <Button
                                    variant="secondary"
                                    icon="📝"
                                    onClick={() => navigate('/admin/marks')}
                                >
                                    Update Marks
                                </Button>
                                {/* Role Assignment isn't a direct match for 'Send Notice' typically, 
                                    but let's route it to Role Assignment for now as a 'connected page' example, 
                                    or Analytics if more appropriate. Let's redirect to Users for notices. */}
                                <Button
                                    variant="secondary"
                                    icon="📢"
                                    onClick={() => navigate('/admin/users')}
                                >
                                    Manage Users
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="split-right">
                        <Card title="Recent Activity" action={<Button variant="ghost" onClick={() => navigate('/admin/analytics')}>View Reports</Button>}>
                            <div className="activity-list">
                                {recentActivity.map(activity => (
                                    <div key={activity.id} className="activity-item">
                                        <div className="activity-avatar">{activity.user.charAt(0)}</div>
                                        <div className="activity-details">
                                            <p className="activity-action">{activity.action}</p>
                                            <p className="activity-meta">{activity.user} • {activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default DashboardPage;
