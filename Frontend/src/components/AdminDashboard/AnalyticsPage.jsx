import React from 'react';
import { Card } from './AdminComponents';

// Simple Donut Chart Component
const DonutChart = ({ data, size = 150 }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let cumulativeValue = 0;

    const getCoordinatesForPercent = (percent) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    const slices = data.map((slice, index) => {
        const startPercent = cumulativeValue / total;
        const endPercent = (cumulativeValue + slice.value) / total;
        cumulativeValue += slice.value;

        const [startX, startY] = getCoordinatesForPercent(startPercent);
        const [endX, endY] = getCoordinatesForPercent(endPercent);

        const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;

        const pathData = [
            `M ${startX} ${startY}`, // Move
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
            `L 0 0`, // Line to center
        ].join(' ');

        return (
            <path d={pathData} fill={slice.color} key={index} />
        );
    });

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
                {slices}
            </svg>
            <div style={{
                position: 'absolute',
                top: '25%', left: '25%', width: '50%', height: '50%',
                background: 'var(--color-surface)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: '1rem', fontWeight: 700 }}>{total}</span>
            </div>
        </div>
    );
};

// Simple Bar Chart Component
const BarChart = ({ data, height = 200 }) => {
    const max = Math.max(...data.map(d => d.value));

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', height: height, gap: '16px', padding: '20px 0 0 0' }}>
            {data.map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div
                        style={{
                            width: '100%',
                            height: `${(item.value / max) * 100}%`,
                            background: item.color,
                            borderRadius: '4px 4px 0 0',
                            minHeight: '4px',
                            transition: 'height 0.5s ease'
                        }}
                    ></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

const AnalyticsPage = () => {
    const genderData = [
        { label: 'Male', value: 320, color: '#3b82f6' },
        { label: 'Female', value: 280, color: '#ec4899' },
    ];

    const teacherGenderData = [
        { label: 'Male', value: 45, color: '#3b82f6' },
        { label: 'Female', value: 35, color: '#ec4899' },
    ];

    const employeeGenderData = [
        { label: 'Male', value: 15, color: '#3b82f6' },
        { label: 'Female', value: 10, color: '#ec4899' },
    ];

    const distributionData = [
        { label: 'Students', value: 600, color: '#3b82f6' },
        { label: 'Teachers', value: 80, color: '#10b981' },
        { label: 'Employees', value: 25, color: '#f59e0b' },
    ];

    return (
        <div className="analytics-page">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

                {/* Gender Distribution */}
                <Card title="Student Gender Distribution">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                        <DonutChart data={genderData} />
                        <div className="legend">
                            {genderData.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ width: '12px', height: '12px', background: item.color, borderRadius: '50%' }}></span>
                                    <span style={{ fontSize: '0.9rem' }}>{item.label}: {item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Total Distribution */}
                <Card title="Total User Distribution">
                    <BarChart data={distributionData} />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
                        {distributionData.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '10px', height: '10px', background: item.color, borderRadius: '2px' }}></span>
                                <span style={{ fontSize: '0.8rem' }}>{item.label} ({item.value})</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Teacher & Employee Gender */}
                <Card title="Staff Gender Distribution">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Teachers</h4>
                            <DonutChart data={teacherGenderData} size={120} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Employees</h4>
                            <DonutChart data={employeeGenderData} size={120} />
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default AnalyticsPage;
