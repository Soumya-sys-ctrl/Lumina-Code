import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FloatingSidebar } from './components/FloatingSidebar';
import { DashboardView } from './components/DashboardView';
import { CodeEditorView } from './components/CodeEditorView';
import { AIReviewPanel } from './components/AIReviewPanel';
import { CollaborationView } from './components/CollaborationView';
import { ReportView } from './components/ReportView';

const socket = io('http://localhost:3000');

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [thoughtStream, setThoughtStream] = useState([]);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('job-active', (data) => {
      if (data.jobId === jobId) {
        setAnalysisStatus('active');
      }
    });

    socket.on('job-progress', (data) => {
      if (data.jobId === jobId) {
        setProgress(data.data.progress);
        if (data.data.thoughtChunk) {
          setThoughtStream(prev => [...prev, data.data.thoughtChunk]);
        }
      }
    });

    socket.on('job-completed', (data) => {
      if (data.jobId === jobId) {
        setAnalysisStatus('completed');
        setResult(data.result);
        setProgress(100);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('job-active');
      socket.off('job-progress');
      socket.off('job-completed');
    };
  }, [jobId]);

  const handleAnalyze = async (code, currentTab) => {
    setAnalysisStatus('pending');
    setProgress(0);
    setThoughtStream([]);
    setResult(null);

    try {
      const res = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, mode: 'mock', activeTab: currentTab })
      });
      const data = await res.json();
      setJobId(data.jobId);
    } catch (error) {
      console.error("Failed to queue analysis:", error);
      setAnalysisStatus('error');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Code Editor':
        return <CodeEditorView onAnalyze={handleAnalyze} status={analysisStatus} />;
      case 'AI Review':
        return <AIReviewPanel thoughts={thoughtStream} result={result} progress={progress} status={analysisStatus} />;
      case 'Collaboration':
        return <CollaborationView />;
      case 'Report':
        return <ReportView result={result} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg-dark)' }}>
      <FloatingSidebar
        isConnected={isConnected}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
      />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '24px 24px 24px 32px'
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
