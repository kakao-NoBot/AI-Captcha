import React from 'react';

const BrandMark = () => (
  <svg className="mark" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17 2.4 30 7v9.5C30 24.6 24.4 30.4 17 32 9.6 30.4 4 24.6 4 16.5V7L17 2.4Z" fill="#F0691E"/>
    <path d="M17 2.4 30 7v9.5C30 24.6 24.4 30.4 17 32V2.4Z" fill="#DD5413"/>
    <path d="M11.5 17.2 15.2 21l7.4-8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Nav({ openPage }) {
  return (
    <header>
      <div className="wrap nav">
        <a className="brand" href="#top" aria-label="AICAPTCHA 홈">
          <BrandMark />
          <span style={{ color: 'var(--ink)' }}>AI<b style={{ color: 'var(--orange)' }}>CAPTCHA</b></span>
        </a>

        <nav className="nav-right" aria-label="주요 메뉴">
          <div className="nav-links">
            <a href="#compare">차별성</a>
            <a href="#metrics">성능</a>
            <a href="#flow">동작 과정</a>
            <a href="#cases">사용 사례</a>
            <a href="#pricing">가격</a>
            <a href="#" onClick={e => { e.preventDefault(); openPage('guide'); }}>가이드</a>
            <a href="#" onClick={e => { e.preventDefault(); openPage('board'); }}>공지/FAQ</a>
          </div>
          <a className="btn btn-ghost" href="#" onClick={e => { e.preventDefault(); openPage('login'); }}>로그인</a>
          <a className="btn btn-primary" href="#" onClick={e => { e.preventDefault(); openPage('apply'); }}>무료로 시작하기</a>
          <button className="menu-toggle" aria-label="메뉴 열기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#241B15" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
