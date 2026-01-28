'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const navItems = [
  { id: 'home', label: '홈' },
  { id: 'services', label: '서비스' },
  { id: 'features', label: '특장점' },
  { id: 'process', label: '진행절차' },
  { id: 'contact', label: '문의하기' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/ChatGPT_Image_2026년_1월_28일_오후_09_22_19_2-removebg-preview.png"
              alt="모두정보통신"
              width={250}
              height={80}
              className="h-20 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  isScrolled
                    ? activeSection === item.id
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                    : activeSection === item.id
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      isScrolled ? 'bg-primary-600' : 'bg-white'
                    }`}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <button
            onClick={() => scrollToSection('contact')}
            className={`hidden md:block px-6 py-2.5 rounded-full font-medium transition-all ${
              isScrolled
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-white text-primary-600 hover:bg-gray-100'
            }`}
          >
            무료 상담
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-white shadow-lg px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full mt-4 px-4 py-3 bg-primary-600 text-white text-center rounded-lg font-medium hover:bg-primary-700"
          >
            무료 상담
          </button>
        </nav>
      </div>
    </header>
  );
}
