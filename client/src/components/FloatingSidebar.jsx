import React from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { LayoutDashboard, Code2, Sparkles, Users, FileBarChart, LogOut, Settings } from 'lucide-react';

const TABS = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'Code Editor', icon: Code2, label: 'Editor' },
    { id: 'AI Review', icon: Sparkles, label: 'Auto Review' },
    { id: 'Collaboration', icon: Users, label: 'Team' },
    { id: 'Report', icon: FileBarChart, label: 'Insights' },
];

export function FloatingSidebar({ isConnected, activeTab, onTabSelect }) {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{
                width: '260px',
                margin: '24px 0 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10
            }}
            className="glass-panel"
        >
            <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '12px',
                    background: 'var(--gradient-main)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'var(--neon-glow)'
                }}>
                    <Sparkles size={20} color="#fff" />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }} className="text-gradient">Lumina Code</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <div style={{
                            width: '8px', height: '8px', borderRadius: '50%',
                            background: isConnected ? 'var(--success)' : 'var(--error)',
                            boxShadow: isConnected ? `0 0 10px var(--success)` : `0 0 10px var(--error)`
                        }} />
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {isConnected ? 'System Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>

            <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onTabSelect(tab.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px 16px', borderRadius: '12px',
                                border: isActive ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                                background: isActive ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
                                color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                width: '100%',
                                fontWeight: isActive ? 600 : 500,
                                boxShadow: isActive ? 'var(--neon-glow)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Icon size={20} style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(0,240,255,0.8))' : 'none' }} />
                            {tab.label}
                        </motion.button>
                    );
                })}
            </nav>

            <div style={{ padding: '24px 16px', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 16px', borderRadius: '12px',
                        border: 'none', background: 'transparent',
                        color: 'var(--text-muted)', cursor: 'pointer', width: '100%'
                    }}
                >
                    <Settings size={20} /> Settings
                </motion.button>
            </div>
        </motion.div>
    );
}
