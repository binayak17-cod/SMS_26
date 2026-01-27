import React from 'react';
import './AdminComponents.css';

export const Card = ({ children, title, action, className = '' }) => {
    return (
        <div className={`admin-card ${className}`}>
            {title && (
                <div className="admin-card-header">
                    <h3 className="admin-card-title">{title}</h3>
                    {action && <div className="admin-card-action">{action}</div>}
                </div>
            )}
            <div className="admin-card-content">
                {children}
            </div>
        </div>
    );
};

export const Button = ({ children, variant = 'primary', icon, onClick, className = '' }) => {
    return (
        <button 
            className={`admin-btn admin-btn-${variant} ${className}`}
            onClick={onClick}
        >
            {icon && <span className="admin-btn-icon">{icon}</span>}
            {children}
        </button>
    );
};

export const Table = ({ children, className = '' }) => {
    return (
        <div className={`admin-table-wrapper ${className}`}>
            <table className="admin-table">
                {children}
            </table>
        </div>
    );
};

export const Badge = ({ children, variant = 'default', className = '' }) => {
    return (
        <span className={`admin-badge admin-badge-${variant} ${className}`}>
            {children}
        </span>
    );
};