import React from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Activity, GitPullRequest, AlertCircle, CheckCircle } from 'lucide-react';

export function DashboardView() {
    const stats = [
        { label: 'Reviews Today', value: '12', icon: Activity, color: 'var(--accent-cyan)' },
        { label: 'Pending PRs', value: '4', icon: GitPullRequest, color: 'var(--accent-purple)' },
        { label: 'Critical Issues', value: '2', icon: AlertCircle, color: 'var(--error)' },
        { label: 'Issues Resolved', value: '8', icon: CheckCircle, color: 'var(--success)' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto' }}
        >
            <header>
                <h1 className="text-gradient" style={{ margin: 0, fontSize: '32px' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Global code quality and daily activity metrics.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                {stats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8, boxShadow: `0 0 20px ${s.color}40`, borderColor: s.color }}
                            className="glass-panel"
                            style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}
                        >
                            <div style={{ padding: '12px', borderRadius: '12px', background: `${s.color}20`, color: s.color }}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-main)' }}>{s.value}</div>
                                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{s.label}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div style={{ flex: 1, display: 'flex', gap: '24px' }}>
                <div className="glass-panel" style={{ flex: 2, padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <h3>Recent Activity</h3>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-light)', borderRadius: '12px', marginTop: '16px' }}>
                        <Activity size={48} opacity={0.2} style={{ animation: 'floatSlow 4s ease-in-out infinite' }} />
                    </div>
                </div>
                <div className="glass-panel" style={{ flex: 1, padding: '24px' }}>
                    <h3>System Status</h3>
                    <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Engine Load</span>
                            <span style={{ color: 'var(--success)' }}>Normal (12%)</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>AI Latency</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>145ms</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Connected Workers</span>
                            <span style={{ color: 'var(--accent-purple)' }}>4/4</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Model Version</span>
                            <span style={{ color: 'var(--text-main)' }}>Lumina-v4.2</span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
