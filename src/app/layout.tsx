import type { Metadata } from "next";
import "./globals.css";
import KakaoButton from "@/components/KakaoButton";

export const metadata: Metadata = {
  title: "모두정보통신 - 전국대표번호, 070번호, 번호이동 전문",
  description: "전화 한 통으로 전국을 연결하다. 전국대표번호, 070번호, 타지역서비스, 번호이동 전문 통신 서비스",
  keywords: "전국대표번호, 070번호, 타지역서비스, 번호이동, 통신서비스, 모두정보통신",
  openGraph: {
    title: "모두정보통신 - 전국대표번호, 070번호, 번호이동 전문",
    description: "전화 한 통으로 전국을 연결하다. 전국대표번호, 070번호, 타지역서비스, 번호이동 전문 통신 서비스",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <KakaoButton />
      </body>
    </html>
  );
}
