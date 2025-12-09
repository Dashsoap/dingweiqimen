/**
 * 九宫详解面板组件
 * 展示每个宫位的详细信息卡片
 */

import type { QimenResult } from '@/lib/types';

interface GongDetailsProps {
  result: QimenResult;
}

export default function GongDetails({ result }: GongDetailsProps) {
  // 吉凶文本映射
  const jiXiongTextMap: Record<string, string> = {
    'da_ji': '大吉',
    'xiao_ji': '小吉',
    'ping': '平',
    'xiao_xiong': '小凶',
    'da_xiong': '大凶'
  };

  // 宫位顺序 1-9
  const gongOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="panel">
      <div className="panel-heading">
        <h3 className="panel-title">九宫详解</h3>
      </div>

      <div className="panel-body">
        <div className="gong-details">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px'
          }}>
            {gongOrder.map((gongNum) => {
              const analysis = result.jiuGongAnalysis[gongNum];
              if (!analysis) return null;

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

              return (
                <div key={gongNum}>
                  <div className={`panel ${panelType}`} style={{ marginBottom: 0 }}>
                    <div className="panel-heading" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                        {gongNum}-{analysis.gongName}
                      </h4>
                      <span className={`label ${labelType}`}>
                        {jiXiongTextMap[analysis.jiXiong] || '平'}
                      </span>
                    </div>

                    <div className="panel-body" style={{ fontSize: '14px' }}>
                      {/* 方位和九星 */}
                      <p style={{ marginBottom: '8px' }}>
                        <strong>方位:</strong> {analysis.direction || ''}{' '}
                        <strong>九星:</strong> {analysis.xing || ''}
                        {analysis.xingAlias && `(${analysis.xingAlias})`}
                      </p>

                      {/* 八门 */}
                      {analysis.men && (
                        <p style={{ marginBottom: '8px' }}>
                          <strong>八门:</strong> {analysis.men}{' '}
                          {analysis.shen && (
                            <>
                              <strong>八神:</strong> {analysis.shen}
                            </>
                          )}
                        </p>
                      )}

                      {/* 三奇六仪 */}
                      <p style={{ marginBottom: '8px' }}>
                        <strong>三奇六仪:</strong> {result.tianPanGan[gongNum] || ''}
                      </p>

                      {/* 解释 */}
                      <p style={{
                        marginBottom: 0,
                        color: '#555',
                        lineHeight: '1.6'
                      }}>
                        {analysis.explain || '暂无解释'}
                      </p>
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
