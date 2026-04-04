import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export function CodeHealthRadar({ metrics }) {
    if (!metrics) return null;

    const data = [
        { subject: 'Security', A: metrics.security, fullMark: 100 },
        { subject: 'Maintainability', A: metrics.maintainability, fullMark: 100 },
        { subject: 'Efficiency', A: metrics.efficiency, fullMark: 100 }
    ];

    return (
        <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="var(--border-light)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: 'Inter' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Code Health" dataKey="A" stroke="var(--accent-lime)" fill="var(--accent-lime)" fillOpacity={0.5} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
