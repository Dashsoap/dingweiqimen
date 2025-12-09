/**
 * 基本信息展示组件
 * 完全复刻原始 flex inline 布局
 */

import type { QimenResult } from '@/lib/types';

interface BasicInfoProps {
  result: QimenResult;
}

export default function BasicInfo({ result }: BasicInfoProps) {
  return (
    <div className="basic-info">
      {/* 公历时间 */}
      <div className="info-item">
        <strong>公历：</strong> {result.basicInfo.date}
      </div>

      {/* 农历时间 */}
      <div className="info-item">
        <strong>农历：</strong> {result.basicInfo.lunarDate}
      </div>

      {/* 四柱八字 */}
      <div className="info-item" style={{ width: '100%' }}>
        <strong>四柱八字：</strong>
        <div style={{ marginTop: '5px' }}>
          <span style={{ marginRight: '15px' }}>年柱: {result.siZhu.year}</span>
          <span style={{ marginRight: '15px' }}>月柱: {result.siZhu.month}</span>
          <span style={{ marginRight: '15px' }}>日柱: {result.siZhu.day}</span>
          <span>时柱: {result.siZhu.time}</span>
        </div>
      </div>

      {/* 节气 */}
      <div className="info-item">
        <strong>节气：</strong> {result.juShu.jieQiName}
      </div>

      {/* 局数 */}
      <div className="info-item">
        <strong>局数：</strong> {result.juShu.fullName}
      </div>

      {/* 旬首 */}
      <div className="info-item">
        <strong>旬首：</strong> {result.xunShou}
      </div>

      {/* 排盘方法 */}
      <div className="info-item">
        <strong>排盘方法：</strong> {result.basicInfo.method}
      </div>

      {/* 值符 */}
      <div className="info-item">
        <strong>值符：</strong> {result.zhiFuXing} (落{result.zhiFuGong}宫)
      </div>

      {/* 值使 */}
      <div className="info-item">
        <strong>值使：</strong> {result.zhiShiMen} (落{result.zhiShiGong}宫)
      </div>

      {/* 空亡 */}
      {result.kongWangGan && result.kongWangGan.length > 0 && (
        <div className="info-item">
          <strong>空亡：</strong> {result.kongWangGan.join('、')}
          {result.kongWangGong && result.kongWangGong.length > 0 && (
            <span> ({result.kongWangGong.map(g => `${g}宫`).join('、')})</span>
          )}
        </div>
      )}

      {/* 驿马 */}
      {result.yiMa && result.yiMa.gan && (
        <div className="info-item">
          <strong>驿马：</strong> {result.yiMa.gan} (落{result.yiMa.gong}宫)
        </div>
      )}

      {/* 用途 */}
      <div className="info-item">
        <strong>排盘用途：</strong> {result.basicInfo.purpose}
      </div>
    </div>
  );
}
