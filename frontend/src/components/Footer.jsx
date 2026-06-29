import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <a className="brand" href="#top">
              <svg className="mark" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                <path d="M17 2.4 30 7v9.5C30 24.6 24.4 30.4 17 32 9.6 30.4 4 24.6 4 16.5V7L17 2.4Z" fill="#F0691E"/>
                <path d="M11.5 17.2 15.2 21l7.4-8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: 'var(--ink)' }}>AI<b style={{ color: 'var(--orange)' }}>CAPTCHA</b></span>
            </a>
            <p>티켓팅 매크로·스캘퍼를 막는 AI 캡차 SaaS. ImageNet 기반 아스키 타일 드래그-투-타깃.</p>
          </div>
          <div className="foot-links">
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">GitHub</a>
            <a href="#">문의하기</a>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 AICAPTCHA Team. 학습·발표용 프로젝트.</span>
          <span>KakaoCloud · FastAPI · React · MLflow</span>
        </div>
      </div>
    </footer>
  );
}
