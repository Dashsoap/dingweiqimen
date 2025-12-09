/**
 * 综合分析面板组件
 * 完全复刻原始 Bootstrap 面板风格
 */

import type { QimenResult } from '@/lib/types';

interface AnalysisPanelProps {
  result: QimenResult;
}

export default function AnalysisPanel({ result }: AnalysisPanelProps) {
  // 从 overallAnalysis 中提取建议
  const recommendation = result.overallAnalysis?.recommendation || '';
  const bestDirection = result.overallAnalysis?.bestDirection || '';

  // 将建议拆分成数组
  const suggestions = recommendation
    .split('。')
    .filter(s => s.trim().length > 0)
    .map(s => s.trim() + '。');

  // 吉凶文本映射
  const jiXiongTextMap: Record<string, string> = {
    'da_ji': '大吉',
    'xiao_ji': '小吉',
    'ping': '平',
    'xiao_xiong': '小凶',
    'da_xiong': '大凶'
  };

  return (
    <div className="panel">
      <div className="panel-heading">
        <h3 className="panel-title">分析与建议</h3>
      </div>

      <div className="panel-body">
        {/* 值符值使信息 */}
        <p style={{ marginBottom: '15px', fontSize: '14px' }}>
          值符: <strong>{result.zhiFuXing} ({result.zhiFuGong}宫 - {result.jiuGongAnalysis[result.zhiFuGong]?.gongName || ''})</strong>
          {', '}
          值使: <strong>{result.zhiShiMen} ({result.zhiShiGong}宫 - {result.jiuGongAnalysis[result.zhiShiGong]?.gongName || ''})</strong>
        </p>

        {/* 最佳方位 */}
        {bestDirection && (
          <p style={{ marginBottom: '15px', fontSize: '14px' }}>
            最有利方位: <strong>{bestDirection}</strong>
          </p>
        )}

        {/* 建议列表 */}
        {suggestions.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ fontSize: '14px' }}>建议:</strong>
            <ul style={{
              margin: '10px 0 0 0',
              paddingLeft: '25px',
              lineHeight: '1.8'
            }}>
              {suggestions.map((suggestion, index) => (
                <li key={index} style={{ fontSize: '14px', color: '#555' }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
