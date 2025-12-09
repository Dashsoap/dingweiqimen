/**
 * 奇门遁甲 TypeScript 类型定义
 */

// ============ 基础类型 ============

/** 阴阳遁类型 */
export type YinYangDun = 'yang' | 'yin';

/** 五行类型 */
export type WuXing = 'jin' | 'mu' | 'shui' | 'huo' | 'tu';

/** 宫位编号 (1-9) */
export type GongNumber = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/** 天干 */
export type TianGan = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';

/** 地支 */
export type DiZhi = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

/** 九星 */
export type JiuXing = '天蓬' | '天芮' | '天冲' | '天辅' | '天禽' | '天心' | '天柱' | '天任' | '天英';

/** 八门 */
export type BaMen = '休门' | '生门' | '伤门' | '杜门' | '景门' | '死门' | '惊门' | '开门';

/** 八神 */
export type BaShen = '值符' | '腾蛇' | '太阴' | '六合' | '白虎' | '玄武' | '九地' | '九天';

/** 吉凶类型 */
export type JiXiong = 'da_ji' | 'xiao_ji' | 'ping' | 'xiao_xiong' | 'da_xiong';

/** 排盘类型 */
export type PanType = '四柱' | '日家' | '月家' | '年家';

/** 排盘方法 */
export type PanMethod = '时家' | '日家' | '月家' | '年家';

/** 用途 */
export type Purpose = '综合' | '事业' | '财运' | '婚姻' | '健康' | '学业';

// ============ 数据结构 ============

/** 九宫信息 */
export interface JiuGongInfo {
  name: string;
  direction: string;
  element: WuXing;
  color: string;
  yinyang: '阴' | '阳' | '阴阳';
}

/** 九星信息 */
export interface JiuXingInfo {
  alias: string;
  element: WuXing;
  color: string;
  feature: string;
}

/** 八门信息 */
export interface BaMenInfo {
  feature: string;
  type: JiXiong;
  element: WuXing;
  color: string;
}

/** 八神信息 */
export interface BaShenInfo {
  feature: string;
  type: JiXiong;
}

/** 局数信息 */
export interface JuShuInfo {
  jieQiName: string;
  type: YinYangDun;
  num: number;
  yuan: string;
  fullName: string;
  formatCode: string;
}

/** 四柱 */
export interface SiZhu {
  year: string;
  month: string;
  day: string;
  time: string;
}

/** 基本信息 */
export interface BasicInfo {
  type: PanType;
  method: PanMethod;
  date: string;
  lunarDate: string;
  purpose?: Purpose;
  location?: string;
}

/** 宫位分析 */
export interface GongAnalysis {
  gongName: string;
  direction: string;
  jiXiong: JiXiong;
  description?: string;
  xingAlias?: string;
  explain?: string;
}

/** 地盘干分布 */
export type DiPanGan = Record<GongNumber, TianGan>;

/** 天盘干分布 */
export type TianPanGan = Record<GongNumber, TianGan>;

/** 九星分布 */
export type JiuXingDistribution = Record<GongNumber, string>;

/** 八门分布 */
export type BaMenDistribution = Record<GongNumber, string>;

/** 八神分布 */
export type BaShenDistribution = Record<GongNumber, string>;

/** 暗干分布 */
export type AnGanDistribution = Record<GongNumber, string>;

/** 值符值使信息 */
export interface ZhiFuZhiShi {
  zhiFuGong: GongNumber;
  zhiFuXing: string;
  zhiFuLuoGong?: GongNumber;
  zhiShiMen: string;
  zhiShiGong: GongNumber;
}

/** 奇门排盘计算结果 */
export interface QimenResult {
  // 基本信息
  basicInfo: BasicInfo;
  siZhu: SiZhu;

  // 局数与旬首
  juShu: JuShuInfo;
  xunShou: string;

  // 值符值使
  zhiFuGong: GongNumber;
  zhiFuXing: string;
  zhiFuLuoGong?: GongNumber;
  zhiShiMen: string;
  zhiShiGong: GongNumber;

  // 各盘分布
  diPanGan: DiPanGan;
  tianPanGan: TianPanGan;
  jiuXing: JiuXingDistribution;
  baMen: BaMenDistribution;
  baShen: BaShenDistribution;
  anGan: AnGanDistribution;

  // 额外信息
  kongWangGan: string[];
  kongWangGong: GongNumber[];
  yiMa: {
    gan: TianGan;
    gong: GongNumber;
  };

  // 分析
  jiuGongAnalysis: Record<GongNumber, GongAnalysis>;
  overallAnalysis: {
    bestDirection: string;
    recommendation: string;
  };
}

// ============ 函数参数类型 ============

/** 排盘选项 */
export interface QimenOptions {
  type?: PanType;
  method?: PanMethod;
  purpose?: Purpose;
  location?: string;
}

/** 九星分布返回值 */
export interface JiuXingResult {
  zhiFuGong: GongNumber;
  zhiFuXing: string;
  zhiFuLuoGong?: GongNumber;
  jiuXing: JiuXingDistribution;
}

/** 八门分布返回值 */
export interface BaMenResult {
  zhiShiGong: GongNumber;
  zhiShiMen: string;
  baMen: BaMenDistribution;
}

/** 八神分布返回值 */
export type BaShenResult = BaShenDistribution;
