/**
 * 奇门遁甲排盘 API 路由
 * 提供 GET 请求获取排盘数据
 */

import { NextRequest, NextResponse } from 'next/server';
import { calculate } from '@/lib/qimen';
import type { QimenOptions } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // 获取请求参数
    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    const type = searchParams.get('type') || '四柱';
    const method = searchParams.get('method') || '时家';
    const purpose = searchParams.get('purpose') || '综合';
    const location = searchParams.get('location') || '默认位置';

    // 确定使用的日期时间
    let date: Date;
    if (dateParam && timeParam) {
      // 自定义排盘 - 使用用户提供的日期和时间
      const dateTimeString = `${dateParam}T${timeParam}`;
      date = new Date(dateTimeString);

      // 验证日期是否有效
      if (isNaN(date.getTime())) {
        return NextResponse.json(
          { error: '无效的日期时间格式' },
          { status: 400 }
        );
      }
    } else if (dateParam) {
      // 只提供了日期，使用当前时间
      date = new Date(`${dateParam}T${new Date().toTimeString().slice(0, 8)}`);
    } else {
      // 实时排盘 - 使用当前时间
      date = new Date();
    }

    // 构建排盘选项
    const options: QimenOptions = {
      type: type as any,
      method: method as any,
      purpose: purpose as any,
      location
    };

    // 执行排盘计算
    const result = calculate(date, options);

    // 检查是否有错误
    if ('error' in result && result.error) {
      return NextResponse.json(
        { error: result.message || '排盘计算出错' },
        { status: 500 }
      );
    }

    // 返回成功结果
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error: any) {
    console.error('API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误', message: error.message },
      { status: 500 }
    );
  }
}
