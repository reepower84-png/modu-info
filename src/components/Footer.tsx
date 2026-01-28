'use client';

import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Brand */}
          <div>
            <Image
              src="/ChatGPT_Image_2026년_1월_28일_오후_09_22_19_2-removebg-preview.png"
              alt="모두정보통신"
              width={220}
              height={70}
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              전화 한 통으로 전국을 연결하다.<br />
              전국대표번호, 070번호, 타지역서비스, 번호이동 전문
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-right">
            <nav className="flex flex-wrap gap-4 md:justify-end mb-4">
              {['홈', '서비스', '특장점', '진행절차', '문의하기'].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const ids = ['home', 'services', 'features', 'process', 'contact'];
                    const element = document.getElementById(ids[index]);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Company Info */}
        <div className="text-gray-400 text-sm space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span><strong className="text-gray-300">상호:</strong> 제이코리아</span>
            <span><strong className="text-gray-300">대표:</strong> 이주영</span>
            <span><strong className="text-gray-300">사업자등록번호:</strong> 278-30-01540</span>
          </div>
          <div>
            <strong className="text-gray-300">주소:</strong> 인천광역시 계양구 오조산로57번길 15, 7층 7106호
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} 모두정보통신. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
