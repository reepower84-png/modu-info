'use client';

import Image from 'next/image';

export default function KakaoButton() {
  return (
    <a
      href="http://pf.kakao.com/_xbASaxl/chat"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
    >
      <Image
        src="/카톡_원형_로고.png"
        alt="카카오톡 상담"
        width={64}
        height={64}
        className="w-full h-full rounded-full"
      />
    </a>
  );
}
