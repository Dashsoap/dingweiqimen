
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
      // 添加时间戳避免缓存
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/qimen?t=${timestamp}`, {
        cache: 'no-store'
      });
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
      {/* 导航栏 */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#1a1a2e',
        borderBottom: '2px solid #16213e',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div className="container" style={{
          maxWidth: '1170px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60px'
          }}>
            <div style={{ 
              color: '#e8d5b7', 
              fontSize: '20px', 
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              🔮 丁未学堂·奇门遁甲排盘
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
        <h1 className="page-title" style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          奇门遁甲排盘系统
        </h1>

        {/* 模式切换 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setMode('realtime')}
            style={{
              padding: '12px 32px',
              backgroundColor: mode === 'realtime' ? '#667eea' : '#f7f7f7',
              color: mode === 'realtime' ? '#fff' : '#555',
              border: mode === 'realtime' ? '2px solid #667eea' : '2px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: mode === 'realtime' ? '0 4px 12px rgba(102, 126, 234, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)',
              minWidth: '140px'
            }}
            onMouseOver={(e) => {
              if (mode !== 'realtime') {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.borderColor = '#667eea';
              }
            }}
            onMouseOut={(e) => {
              if (mode !== 'realtime') {
                e.currentTarget.style.backgroundColor = '#f7f7f7';
                e.currentTarget.style.borderColor = '#e0e0e0';
              }
            }}
          >
            ⚡ 实时排盘
          </button>
          <button
            onClick={() => setMode('custom')}
            style={{
              padding: '12px 32px',
              backgroundColor: mode === 'custom' ? '#764ba2' : '#f7f7f7',
              color: mode === 'custom' ? '#fff' : '#555',
              border: mode === 'custom' ? '2px solid #764ba2' : '2px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: mode === 'custom' ? '0 4px 12px rgba(118, 75, 162, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)',
              minWidth: '140px'
            }}
            onMouseOver={(e) => {
              if (mode !== 'custom') {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.borderColor = '#764ba2';
              }
            }}
            onMouseOut={(e) => {
              if (mode !== 'custom') {
                e.currentTarget.style.backgroundColor = '#f7f7f7';
                e.currentTarget.style.borderColor = '#e0e0e0';
              }
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
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <button
              onClick={fetchRealtimePan}
              disabled={isLoading}
              style={{
                padding: '14px 48px',
                background: isLoading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: isLoading ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                transform: isLoading ? 'none' : 'translateY(0)'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {isLoading ? '⏳ 排盘中...' : '🔄 刷新排盘'}
            </button>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div style={{
            backgroundColor: '#fff3f3',
            borderLeft: '4px solid #ff4757',
            color: '#e55039',
            padding: '16px 20px',
            marginBottom: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(255, 71, 87, 0.1)'
          }}>
            <strong>❌ 错误：</strong> {error}
          </div>
        )}

        {/* 加载中提示 */}
        {isLoading && !result && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '16px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>⏳</div>
            <div style={{ 
              fontSize: '20px', 
              marginBottom: '8px',
              color: '#667eea',
              fontWeight: '600'
            }}>正在计算排盘...</div>
            <div style={{ fontSize: '14px', color: '#888' }}>请稍候</div>
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
            padding: '80px 20px',
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            borderRadius: '16px',
            border: '2px dashed #667eea40'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔮</div>
            <h3 style={{ 
              fontSize: '26px', 
              marginBottom: '12px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700'
            }}>
              {mode === 'realtime' ? '点击「刷新排盘」开始' : '填写表单开始自定义排盘'}
            </h3>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: '1.6' }}>
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
          <div style={{ 
            textAlign: 'center', 
            color: '#999', 
            fontSize: '13px',
            padding: '20px 0'
          }}>
            <p style={{ margin: '0', opacity: 0.8 }}>© 2024 丁未学堂·奇门遁甲排盘系统</p>
          </div>
        </div>
      </footer>
    </>
  );
}
