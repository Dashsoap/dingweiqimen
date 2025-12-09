/**
 * 自定义排盘表单组件
 * 完全复刻原始 Bootstrap 表单风格
 */

'use client';

import { useState } from 'react';

interface CustomPanelFormProps {
  onSubmit: (params: {
    date: string;
    time: string;
    method: string;
    purpose: string;
    type: string;
  }) => void;
  isLoading?: boolean;
}

export default function CustomPanelForm({ onSubmit, isLoading = false }: CustomPanelFormProps) {
  // 获取当前日期时间
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().slice(0, 5);

  const [formData, setFormData] = useState({
    date: currentDate,
    time: currentTime,
    method: '时家',
    purpose: '综合',
    type: '四柱'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    const now = new Date();
    setFormData({
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      method: '时家',
      purpose: '综合',
      type: '四柱'
    });
  };

  return (
    <div className="panel" style={{ marginBottom: '20px' }}>
      <div className="panel-heading">
        <h3 className="panel-title">自定义排盘</h3>
      </div>

      <div className="panel-body">
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            marginBottom: '15px'
          }}>
            {/* 日期选择 */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#333'
              }}>
                日期
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                required
              />
            </div>

            {/* 时间选择 */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#333'
              }}>
                时间
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                required
              />
            </div>

            {/* 排盘类型 */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#333'
              }}>
                排盘类型
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="四柱">四柱</option>
                <option value="三元">三元</option>
              </select>
            </div>

            {/* 排盘方法 */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#333'
              }}>
                排盘方法
              </label>
              <select
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="时家">时家</option>
                <option value="日家">日家</option>
                <option value="月家">月家</option>
                <option value="年家">年家</option>
              </select>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#777' }}>
                时家奇门：以时辰为主，适合短期预测
              </p>
            </div>
          </div>

          {/* 用途选择 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#333'
            }}>
              排盘用途
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '8px'
            }}>
              {['综合', '事业', '财运', '婚姻', '健康', '学业'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFormData({ ...formData, purpose: item })}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: formData.purpose === item ? '#337ab7' : '#fff',
                    color: formData.purpose === item ? '#fff' : '#333',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 按钮组 */}
          <div style={{
            display: 'flex',
            gap: '10px',
            paddingTop: '15px',
            borderTop: '1px solid #ddd'
          }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                flex: 1,
                backgroundColor: isLoading ? '#ccc' : '#337ab7',
                color: '#fff',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? '排盘中...' : '📝 开始排盘'}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              style={{
                padding: '12px 20px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              重置
            </button>
          </div>

          {/* 说明文字 */}
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#d9edf7',
            border: '1px solid #bce8f1',
            borderRadius: '4px',
            color: '#31708f',
            fontSize: '13px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>ℹ️ 使用说明</div>
            <ul style={{ margin: '5px 0 0 20px', paddingLeft: 0, lineHeight: '1.6' }}>
              <li>选择要预测的日期和时间</li>
              <li>根据需求选择排盘方法（推荐使用时家奇门）</li>
              <li>选择排盘用途以获得更精准的建议</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
