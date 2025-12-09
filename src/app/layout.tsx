import type { Metadata } from "next";
import "./globals.css";
import "./qimen.css";

export const metadata: Metadata = {
  title: "奇门遁甲排盘系统",
  description: "基于 Next.js 的专业奇门遁甲排盘系统，支持实时排盘与自定义排盘",
  keywords: ["奇门遁甲", "排盘", "风水", "预测", "九宫"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
