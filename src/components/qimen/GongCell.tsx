/**
 * 九宫格单个宫位组件
 * 完全复刻原始 4×3 Grid 布局
 */

import type { GongNumber, GongAnalysis } from '@/lib/types';
import { JIU_GONG } from '@/lib/qimen';

interface GongCellProps {
  gongNumber: GongNumber;
  tianPanGan?: string;
  diPanGan?: string;
  jiuXing?: string;
  baMen?: string;
  baShen?: string;
  anGan?: string;
  diZhi?: string; // 地支（暗干对应地支）
  analysis?: GongAnalysis;
  isZhiFu?: boolean;
  isZhiShi?: boolean;
  isKongWang?: boolean;
  isYiMa?: boolean;
  isDayXunShou?: boolean; // 是否为日柱旬首
}

// 五行颜色映射
const getWuXingColor = (element?: string): string => {
  if (!element) return '';

  const colorMap: Record<string, string> = {
    // 十天干
    '甲': 'wuxing-mu',
    '乙': 'wuxing-mu',
    '丙': 'wuxing-huo',
    '丁': 'wuxing-huo',
    '戊': 'wuxing-tu',
    '己': 'wuxing-tu',
    '庚': 'wuxing-jin',
    '辛': 'wuxing-jin',
    '壬': 'wuxing-shui',
    '癸': 'wuxing-shui',
    // 八卦宫位
    '震': 'wuxing-mu',
    '巽': 'wuxing-mu',
    '离': 'wuxing-huo',
    '坤': 'wuxing-tu',
    '艮': 'wuxing-tu',
    '中': 'wuxing-tu',
    '乾': 'wuxing-jin',
    '兑': 'wuxing-jin',
    '坎': 'wuxing-shui',
    // 九星
    '天蓬': 'wuxing-shui',
    '天芮': 'wuxing-tu',
    '天冲': 'wuxing-mu',
    '天辅': 'wuxing-mu',
    '天禽': 'wuxing-tu',
    '天心': 'wuxing-jin',
    '天柱': 'wuxing-jin',
    '天任': 'wuxing-tu',
    '天英': 'wuxing-huo',
    // 八门
    '休门': 'wuxing-shui',
    '生门': 'wuxing-tu',
    '伤门': 'wuxing-mu',
    '杜门': 'wuxing-mu',
    '景门': 'wuxing-huo',
    '死门': 'wuxing-tu',
    '惊门': 'wuxing-jin',
    '开门': 'wuxing-jin',
    // 八神
    '值符': 'wuxing-tu',
    '腾蛇': 'wuxing-huo',
    '太阴': 'wuxing-jin',
    '六合': 'wuxing-mu',
    '白虎': 'wuxing-jin',
    '玄武': 'wuxing-shui',
    '九地': 'wuxing-tu',
    '九天': 'wuxing-jin'
  };

  return colorMap[element] || '';
};

// 五行边框颜色映射（用于旬首方框）
const getWuXingBorderColor = (element?: string): string => {
  if (!element) return '';

  const borderMap: Record<string, string> = {
    '甲': 'border-mu',
    '乙': 'border-mu',
    '丙': 'border-huo',
    '丁': 'border-huo',
    '戊': 'border-tu',
    '己': 'border-tu',
    '庚': 'border-jin',
    '辛': 'border-jin',
    '壬': 'border-shui',
    '癸': 'border-shui'
  };

  return borderMap[element] || '';
};

export default function GongCell({
  gongNumber,
  tianPanGan,
  diPanGan,
  jiuXing,
  baMen,
  baShen,
  anGan,
  diZhi,
  analysis,
  isZhiFu = false,
  isZhiShi = false,
  isKongWang = false,
  isYiMa = false,
  isDayXunShou = false
}: GongCellProps) {
  const gongInfo = JIU_GONG[gongNumber];

  // 宫位吉凶类名
  const jiXiongClass = analysis?.jiXiong || 'ping';

  // 宫位特殊标记类名
  const gongClasses = [
    'gong',
    `gong${gongNumber}`,
    jiXiongClass,
    isZhiFu ? 'zhifu' : '',
    isZhiShi ? 'zhishi' : ''
  ].filter(Boolean).join(' ');

  // 各元素的五行颜色
  const tianpanColor = getWuXingColor(tianPanGan);
  const dipanColor = getWuXingColor(diPanGan);
  const xingColor = getWuXingColor(jiuXing);
  const menColor = getWuXingColor(baMen);
  const shenColor = getWuXingColor(baShen);
  const gongColor = getWuXingColor(gongInfo?.name);  // 使用宫位名称（震、巽、离等）

  // 旬首方框边框颜色
  const tianpanBorderColor = isDayXunShou ? getWuXingBorderColor(tianPanGan) : '';

  // 天盘干类名（旬首需要方框）
  const tianpanClasses = [
    'gong-tiangan',
    tianpanColor,
    isDayXunShou ? 'tianpan-boxed' : '',
    tianpanBorderColor
  ].filter(Boolean).join(' ');

  // 天盘干是否为空
  const isTianPanEmpty = !tianPanGan || tianPanGan === '';
  // 地盘干是否为空
  const isDiPanEmpty = !diPanGan || diPanGan === '';

  return (
    <div className={gongClasses}>
      <div className="gong-content">
        {/* Row 1 - Column 1: 地支(暗干) */}
        <div className="gong-dizhi di-zhi">{diZhi || anGan || ''}</div>

        {/* Row 1 - Column 2: 八神 */}
        <div className={`gong-bashen ${shenColor}`}>
          {baShen || ''}
        </div>

        {/* Row 1 - Column 3: 标记区域（驿马/空亡） */}
        <div className="gong-tianganfang">
          {isYiMa && (
            <span className="circle-mark green-circle">马</span>
          )}
          {isKongWang && (
            <span className="circle-mark yellow-circle">空</span>
          )}
        </div>

        {/* Row 2 - Column 1: 地支2（隐藏） */}
        <div className="gong-dizhi2"></div>

        {/* Row 2 - Column 2: 九星 */}
        <div className={`gong-jiuxing ${xingColor}`}>
          {jiuXing || ''}
        </div>

        {/* Row 2 - Column 3: 天干方位2（隐藏） */}
        <div className="gong-tianganfang2"></div>

        {/* Row 3 - Column 1: 宫位名2（隐藏） */}
        <div className="gong-gongname2"></div>

        {/* Row 3 - Column 2: 八门 */}
        <div className={`gong-bamen ${menColor}`}>
          {baMen || ''}
        </div>

        {/* Row 3 - Column 3: 天盘干 */}
        <div className={tianpanClasses}>
          {!isTianPanEmpty ? tianPanGan : ''}
        </div>

        {/* Row 4 - Column 1: 宫位名称 */}
        <div className={`gong-gongname ${gongColor}`}>
          {gongInfo?.name}
        </div>

        {/* Row 4 - Column 2: 宫位数字 */}
        <div className="gong-number">{gongNumber}</div>

        {/* Row 4 - Column 3: 地盘干 */}
        <div className={`gong-dipan ${dipanColor}`}>
          {!isDiPanEmpty ? diPanGan : ''}
        </div>
      </div>
    </div>
  );
}
