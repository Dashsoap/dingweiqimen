/**
 * 九宫详解面板组件
 * 展示每个宫位的详细信息卡片
 * 支持响应式布局：PC端三列，移动端单列
 */

'use client';

import { useState } from 'react';
import type { QimenResult, GongNumber } from '@/lib/types';
import { palaceMeanings } from '@/lib/meanings';

interface GongDetailsProps {
  result: QimenResult;
}

// 宫位名称与宫位数字对应
const gongNameMap: Record<GongNumber, string> = {
  '1': '坎',
  '2': '坤',
  '3': '震',
  '4': '巽',
  '5': '中',
  '6': '乾',
  '7': '兑',
  '8': '艮',
  '9': '离'
};

export default function GongDetails({ result }: GongDetailsProps) {
  const [expandedGong, setExpandedGong] = useState<GongNumber | null>(null);

  // 吉凶文本映射
  const jiXiongTextMap: Record<string, string> = {
    'da_ji': '大吉',
    'xiao_ji': '小吉',
    'ping': '平',
    'xiao_xiong': '小凶',
    'da_xiong': '大凶'
  };

  // 宫位顺序 1-9
  const gongOrder: GongNumber[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // 切换展开/折叠
  const toggleExpand = (gongNum: GongNumber) => {
    setExpandedGong(expandedGong === gongNum ? null : gongNum);
  };

  return (
    <div className="panel">
      <div className="panel-heading">
        <h3 className="panel-title">九宫详解</h3>
      </div>

      <div className="panel-body">
        <div className="gong-details">
          {/* 响应式网格：移动端1列，平板2列，PC端3列 */}
          <div className="gong-details-grid">
            {gongOrder.map((gongNum) => {
              const analysis = result.jiuGongAnalysis[gongNum];
              if (!analysis) return null;

              const gongName = gongNameMap[gongNum];
              const isExpanded = expandedGong === gongNum;

              // 判断面板颜色类型
              let panelType = 'panel-info'; // 默认平
              if (analysis.jiXiong === 'da_ji' || analysis.jiXiong === 'xiao_ji') {
                panelType = 'panel-success';
              } else if (analysis.jiXiong === 'xiao_xiong' || analysis.jiXiong === 'da_xiong') {
                panelType = 'panel-danger';
              }

              // 标签颜色
              let labelType = 'label-default';
              if (analysis.jiXiong === 'da_ji' || analysis.jiXiong === 'xiao_ji') {
                labelType = 'label-success';
              } else if (analysis.jiXiong === 'xiao_xiong' || analysis.jiXiong === 'da_xiong') {
                labelType = 'label-danger';
              }

              // 获取当前宫位的各元素
              const currentMen = result.baMen[gongNum];
              const currentXing = result.jiuXing[gongNum];
              const currentShen = result.baShen[gongNum];
              const currentTianGan = result.tianPanGan[gongNum];

              return (
                <div key={gongNum} className="gong-detail-item">
                  <div className={`panel ${panelType}`} style={{ marginBottom: 0 }}>
                    <div 
                      className="panel-heading" 
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleExpand(gongNum)}
                    >
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                        {gongNum}-{gongName}
                      </h4>
                      <span className={`label ${labelType}`}>
                        {jiXiongTextMap[analysis.jiXiong] || '平'}
                      </span>
                    </div>

                    <div className="panel-body" style={{ fontSize: '14px' }}>
                      {/* 方位和九星 */}
                      <p style={{ marginBottom: '8px' }}>
                        <strong>方位:</strong> {analysis.direction || ''}{' '}
                        <strong>九星:</strong> {currentXing || ''}
                        {analysis.xingAlias && `(${analysis.xingAlias})`}
                      </p>

                      {/* 八门和八神 */}
                      <p style={{ marginBottom: '8px' }}>
                        <strong>八门:</strong> {currentMen || ''}{' '}
                        <strong>八神:</strong> {currentShen || ''}
                      </p>

                      {/* 三奇六仪 */}
                      <p style={{ marginBottom: '8px' }}>
                        <strong>三奇六仪:</strong> {currentTianGan || ''}
                      </p>

                      {/* 基础解释 */}
                      <p style={{
                        marginBottom: '12px',
                        color: '#555',
                        lineHeight: '1.6'
                      }}>
                        {analysis.explain || '暂无解释'}
                      </p>

                      {/* 详细含义区域 - 可展开 */}
                      {isExpanded && (
                        <div style={{
                          borderTop: '1px dashed #ddd',
                          paddingTop: '12px',
                          marginTop: '8px'
                        }}>
                          {/* 宫位含义 */}
                          {gongName && palaceMeanings[gongName + '宫'] && (
                            <div style={{ marginBottom: '12px' }}>
                              <strong style={{ color: '#8B4513' }}>【{gongName}宫】</strong>
                              <p style={{ 
                                margin: '4px 0 0 0', 
                                color: '#666', 
                                lineHeight: '1.6',
                                whiteSpace: 'pre-line'
                              }}>
                                {palaceMeanings[gongName + '宫']}
                              </p>
                            </div>
                          )}

                          {/* 九星含义 */}
                          {currentXing && palaceMeanings[currentXing] && (
                            <div style={{ marginBottom: '12px' }}>
                              <strong style={{ color: '#2E8B57' }}>【{currentXing}】</strong>
                              <p style={{ 
                                margin: '4px 0 0 0', 
                                color: '#666', 
                                lineHeight: '1.6',
                                whiteSpace: 'pre-line'
                              }}>
                                {palaceMeanings[currentXing]}
                              </p>
                            </div>
                          )}

                          {/* 八门含义 */}
                          {currentMen && palaceMeanings[currentMen] && (
                            <div style={{ marginBottom: '12px' }}>
                              <strong style={{ color: '#4169E1' }}>【{currentMen}】</strong>
                              <p style={{ 
                                margin: '4px 0 0 0', 
                                color: '#666', 
                                lineHeight: '1.6',
                                whiteSpace: 'pre-line'
                              }}>
                                {palaceMeanings[currentMen]}
                              </p>
                            </div>
                          )}

                          {/* 八神含义 */}
                          {currentShen && palaceMeanings[currentShen] && (
                            <div style={{ marginBottom: '12px' }}>
                              <strong style={{ color: '#9932CC' }}>【{currentShen}】</strong>
                              <p style={{ 
                                margin: '4px 0 0 0', 
                                color: '#666', 
                                lineHeight: '1.6',
                                whiteSpace: 'pre-line'
                              }}>
                                {palaceMeanings[currentShen]}
                              </p>
                            </div>
                          )}

                          {/* 天干含义 */}
                          {currentTianGan && palaceMeanings[currentTianGan] && (
                            <div style={{ marginBottom: '0' }}>
                              <strong style={{ color: '#CD853F' }}>【{currentTianGan}】</strong>
                              <p style={{ 
                                margin: '4px 0 0 0', 
                                color: '#666', 
                                lineHeight: '1.6',
                                whiteSpace: 'pre-line'
                              }}>
                                {palaceMeanings[currentTianGan]}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 展开/折叠按钮 */}
                      <div 
                        style={{ 
                          textAlign: 'center', 
                          marginTop: '8px',
                          paddingTop: '8px',
                          borderTop: '1px solid #eee'
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(gongNum);
                          }}
                          style={{
                            background: 'none',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '4px 12px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: '#666'
                          }}
                        >
                          {isExpanded ? '收起详解 ▲' : '查看详解 ▼'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
