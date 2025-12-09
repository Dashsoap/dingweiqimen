
'use client';

import { useState, useEffect } from 'react';
import QimenBoard from '@/components/qimen/QimenBoard';
import BasicInfo from '@/components/qimen/BasicInfo';
import AnalysisPanel from '@/components/qimen/AnalysisPanel';
import GongDetails from '@/components/qimen/GongDetails';
import CustomPanelForm from '@/components/qimen/CustomPanelForm';
import type { QimenResult } from '@/lib/types';

export default function HomePage() {
  const [result, setResult] = useState<QimenResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'realtime' | 'custom'>('realtime');

  // 实时排盘 - 页面加载时自动获取
  useEffect(() => {
    if (mode === 'realtime') {
      fetchRealtimePan();
    }
  }, [mode]);

  // 获取实时排盘
  const fetchRealtimePan = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/qimen');
      if (!response.ok) {
        throw new Error('获取排盘数据失败');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || '排盘失败，请稍后重试');
      console.error('排盘错误:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 自定义排盘
  const handleCustomPan = async (params: {
    date: string;
    time: string;
    method: string;
    purpose: string;
    type: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        date: params.date,
        time: params.time + ':00', // 添加秒数
        method: params.method,
        purpose: params.purpose,
        type: params.type
      });

      const response = await fetch(`/api/qimen?${queryParams}`);
      if (!response.ok) {
        throw new Error('获取排盘数据失败');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || '排盘失败，请稍后重试');
      console.error('排盘错误:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Bootstrap 风格导航栏 */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#222',
        borderBottom: '1px solid #080808',
        zIndex: 1000,
        boxShadow: '0 1px 10px rgba(0,0,0,0.1)'
      }}>
        <div className="container" style={{
          maxWidth: '1170px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '50px'
          }}>
            <div style={{ color: '#9d9d9d', fontSize: '18px', fontWeight: 'bold' }}>
              丁未学堂-奇门遁甲排盘系统
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <div className="container" style={{
        maxWidth: '1170px',
        margin: '0 auto',
        padding: '0 15px'
      }}>
        {/* 页面标题 */}
        <h1 className="page-title" style={{ textAlign: 'center' }}>
          丁未学堂-奇门遁甲排盘系统
        </h1>

        {/* 模式切换 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setMode('realtime')}
            style={{
              padding: '10px 30px',
              backgroundColor: mode === 'realtime' ? '#337ab7' : '#fff',
              color: mode === 'realtime' ? '#fff' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: mode === 'realtime' ? 'bold' : 'normal'
            }}
          >
            ⏰ 实时排盘
          </button>
          <button
            onClick={() => setMode('custom')}
            style={{
              padding: '10px 30px',
              backgroundColor: mode === 'custom' ? '#337ab7' : '#fff',
              color: mode === 'custom' ? '#fff' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: mode === 'custom' ? 'bold' : 'normal'
            }}
          >
            ⚙️ 自定义排盘
          </button>
        </div>

        {/* 自定义排盘表单 */}
        {mode === 'custom' && (
          <CustomPanelForm onSubmit={handleCustomPan} isLoading={isLoading} />
        )}

        {/* 实时排盘按钮 */}
        {mode === 'realtime' && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button
              onClick={fetchRealtimePan}
              disabled={isLoading}
              style={{
                padding: '12px 40px',
                backgroundColor: isLoading ? '#ccc' : '#5cb85c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {isLoading ? '排盘中...' : '🔄 刷新排盘'}
            </button>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div style={{
            backgroundColor: '#f2dede',
            borderColor: '#ebccd1',
            color: '#a94442',
            padding: '15px',
            marginBottom: '20px',
            border: '1px solid transparent',
            borderRadius: '4px'
          }}>
            <strong>错误：</strong> {error}
          </div>
        )}

        {/* 加载中提示 */}
        {isLoading && !result && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#777'
          }}>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>⏳ 正在计算排盘...</div>
            <div style={{ fontSize: '14px' }}>请稍候</div>
          </div>
        )}

        {/* 排盘结果 */}
        {result && (
          <div>
            {/* 基本信息 */}
            <BasicInfo result={result} />

            {/* 九宫格 */}
            <QimenBoard result={result} />

            {/* 综合分析 */}
            <AnalysisPanel result={result} />

            {/* 九宫详解 */}
            <GongDetails result={result} />
          </div>
        )}

        {/* 初始提示 */}
        {!result && !isLoading && !error && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔮</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#666' }}>
              {mode === 'realtime' ? '点击「刷新排盘」开始' : '填写表单开始自定义排盘'}
            </h3>
            <p style={{ fontSize: '14px', color: '#999' }}>
              使用奇门遁甲排盘系统预测吉凶、趋避凶险
            </p>
          </div>
        )}
      </div>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container" style={{
          maxWidth: '1170px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <div style={{ textAlign: 'center', color: '#777', fontSize: '12px' }}>
            <p style={{ margin: '0 0 5px 0' }}>奇门遁甲排盘系统</p>
          </div>
        </div>
      </footer>
    </>
  );
}
