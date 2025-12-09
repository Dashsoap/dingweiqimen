/**
 * 奇门遁甲九宫格主界面组件
 * 完全复刻原始 3×3 方正九宫格布局
 */

'use client';

import GongCell from './GongCell';
import type { QimenResult, GongNumber } from '@/lib/types';

interface QimenBoardProps {
  result: QimenResult;
}

export default function QimenBoard({ result }: QimenBoardProps) {
  // 九宫格洛书顺序
  // 4 9 2
  // 3 5 7
  // 8 1 6
  const gridLayout: GongNumber[][] = [
    ['4', '9', '2'],
    ['3', '5', '7'],
    ['8', '1', '6']
  ];

  return (
    <div className="qimen-pan">
      <div className="pan-outer">
        <div className="pan-grid">
          {gridLayout.flat().map((gongNumber) => {
            const analysis = result.jiuGongAnalysis[gongNumber];
            const isZhiFu = result.zhiFuGong === gongNumber;
            const isZhiShi = result.zhiShiGong === gongNumber;
            const isKongWang = result.kongWangGong?.includes(gongNumber);
            const isYiMa = result.yiMa?.gong === gongNumber;

            // 检查是否为日柱旬首（需要方框标记）
            // 旬首是日柱天干对应的六仪之一
            const dayTianGan = result.siZhu?.day?.charAt(0); // 日柱天干
            const tianPanGan = result.tianPanGan[gongNumber];
            const isDayXunShou = !!(tianPanGan && dayTianGan &&
              ['戊', '己', '庚', '辛', '壬', '癸'].includes(tianPanGan));

            // 获取暗干对应的地支
            const diZhi = result.anGan?.[gongNumber];

            return (
              <GongCell
                key={gongNumber}
                gongNumber={gongNumber}
                tianPanGan={result.tianPanGan[gongNumber]}
                diPanGan={result.diPanGan[gongNumber]}
                jiuXing={result.jiuXing[gongNumber]}
                baMen={result.baMen[gongNumber]}
                baShen={result.baShen[gongNumber]}
                anGan={result.anGan?.[gongNumber]}
                diZhi={diZhi}
                analysis={analysis}
                isZhiFu={isZhiFu}
                isZhiShi={isZhiShi}
                isKongWang={isKongWang}
                isYiMa={isYiMa}
                isDayXunShou={isDayXunShou}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
