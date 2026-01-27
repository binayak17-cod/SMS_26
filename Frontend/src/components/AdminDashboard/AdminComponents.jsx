import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminComponents.css';

// --- Card ---
export const Card = ({ title, children, className = '', action }) => (
    <motion.div
        className={`admin-card ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        {(title || action) && (
            <div className="card-header">
                {title && <h3>{title}</h3>}
                {action && <div className="card-action">{action}</div>}
            </div>
        )}
        <div className="card-body">
            {children}
        </div>
    </motion.div>
);

// --- Button ---
export const Button = ({ children, variant = 'primary', onClick, icon, disabled, className = '', type = 'button' }) => (
    <motion.button
        type={type}
        className={`admin-btn btn-${variant} ${className}`}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
    </motion.button>
);

// --- Input ---
export const Input = ({ label, error, ...props }) => (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
        {label && <label>{label}</label>}
        <input className="admin-input" {...props} />
        {error && <span className="error-text">{error}</span>}
    </div>
);

// --- Select ---
export const Select = ({ label, options, error, ...props }) => (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
        {label && <label>{label}</label>}
        <select className="admin-select" {...props}>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        {error && <span className="error-text">{error}</span>}
    </div>
);

// --- Badge ---
export const Badge = ({ type = 'info', children }) => (
    <span className={`admin-badge badge-${type}`}>
        {children}
    </span>
);

// --- Table ---
export const Table = ({ headers, children, actions }) => (
    <div className="table-container">
        <table className="admin-table">
            <thead>
                <tr>
                    {headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    </div>
);

// --- Modal ---
export const Modal = ({ isOpen, onClose, title, children, footer }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    className="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />
                <motion.div
                    className="modal-container"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                >
                    <div className="modal-header">
                        <h3>{title}</h3>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    {footer && (
                        <div className="modal-footer">
                            {footer}
                        </div>
                    )}
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

// --- Toast ---
export const Toast = ({ message, type = 'success', onClose }) => (
    <AnimatePresence>
        {message && (
            <motion.div
                className={`admin-toast toast-${type}`}
                initial={{ opacity: 0, y: 20, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 20, x: '-50%' }}
            >
                <span>{message}</span>
            </motion.div>
        )}
    </AnimatePresence>
);

// --- Skeleton Loader ---
export const Skeleton = ({ height = '20px', width = '100%', style }) => (
    <div className="skeleton-loader" style={{ height, width, ...style }}></div>
);
