/**
 * 九星分布计算模块
 * 转盘排法：九星从值符宫整体转动到时干落宫
 */

import type { GongNumber, DiPanGan, TianGan, JiuXingDistribution, JiuXingResult } from './types';

// 洛书九宫顺序（不含中宫5）
const LUO_SHU_ORDER: GongNumber[] = ['1', '8', '3', '4', '9', '2', '7', '6'];

// 九星原位分布
const BASIC_XING: Record<GongNumber, string> = {
  '1': '天蓬',
  '8': '天任',
  '3': '天冲',
  '4': '天辅',
  '9': '天英',
  '2': '天芮',
  '7': '天柱',
  '6': '天心',
  '5': '天禽'  // 中宫
};

/**
 * 排布九星（转盘排法）
 * @param diPan 地盘干分布
 * @param xunShou 旬首六仪
 * @param shiGan 时干（可选，用于计算转动）
 * @returns 九星分布和值符信息
 */
export function distributeJiuXing(
  diPan: DiPanGan,
  xunShou: TianGan,
  shiGan?: TianGan
): JiuXingResult {
  // 1. 查找旬首六仪在地盘上的位置 = 值符宫
  let zhiFuGong: GongNumber = '2'; // 默认寄坤2宫
  for (const gong in diPan) {
    const gongNum = gong as GongNumber;
    if (diPan[gongNum] === xunShou && gongNum !== '5') {
      zhiFuGong = gongNum;
      break;
    }
  }

  // 2. 确定值符星 = 值符宫原位的星
  const zhiFuXing = BASIC_XING[zhiFuGong];

  // 3. 如果没有时干，返回原位九星
  if (!shiGan) {
    return {
      zhiFuGong,
      zhiFuXing,
      jiuXing: { ...BASIC_XING }
    };
  }

  // 4. 查找时干在地盘上的位置 = 时干落宫
  let luoGong: GongNumber = zhiFuGong;
  for (const gong in diPan) {
    const gongNum = gong as GongNumber;
    if (diPan[gongNum] === shiGan && gongNum !== '5') {
      luoGong = gongNum;
      break;
    }
  }

  // 如果找不到时干（甲隐于六仪之下），用值符宫
  // （已经默认设置为 zhiFuGong）

  // 5. 计算九星转动
  const jiuXing: Partial<JiuXingDistribution> = {};
  // 天禽寄坤二宫，中宫显示与坤二宫相同的星

  const zhiFuIndex = LUO_SHU_ORDER.indexOf(zhiFuGong);
  const luoGongIndex = LUO_SHU_ORDER.indexOf(luoGong);

  if (zhiFuIndex === -1 || luoGongIndex === -1) {
    return {
      zhiFuGong,
      zhiFuXing,
      jiuXing: { ...BASIC_XING }
    };
  }

  // 转动步数
  const steps = (luoGongIndex - zhiFuIndex + 8) % 8;

  // 九星整体转动
  for (let i = 0; i < 8; i++) {
    const originalGong = LUO_SHU_ORDER[i];
    const originalXing = BASIC_XING[originalGong];

    const newIndex = (i + steps) % 8;
    const newGong = LUO_SHU_ORDER[newIndex];

    // 天禽寄坤二宫，坤二宫同时有天芮和天禽
    if (originalGong === '2') {
      // 坤二宫原位是天芮，天禽寄此，转动后两星一起走
      jiuXing[newGong] = '禽芮';
    } else {
      jiuXing[newGong] = originalXing;
    }
  }

  // 中宫不显示九星
  jiuXing['5'] = '';

  return {
    zhiFuGong,          // 值符原位宫（旬首六仪在地盘的位置）
    zhiFuLuoGong: luoGong,  // 值符落宫（转动后的位置，即时干落宫）
    zhiFuXing,
    jiuXing: jiuXing as JiuXingDistribution
  };
}
