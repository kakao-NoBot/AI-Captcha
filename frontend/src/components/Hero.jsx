// Hero.jsx

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CaptchaDemo from './CaptchaDemo';

export default function Hero({ openPage }) {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = demoOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [demoOpen]);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-content">
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <span className="eyebrow">Anti-Bot CAPTCHA · 티켓팅 보안</span>
            <h1>사람은 <span className="hl">통과</span>하고,<br/>봇은 막는 AI 캡차</h1>
            <p className="lead">
              ImageNet 기반 아스키 타일을 조건에 맞게 드래그하면 끝.
              사람은 1~2초면 통과하지만, 매크로·스캘퍼 봇은 멈춰 섭니다.
              정답 위치와 드래그 궤적까지 함께 검증합니다.
            </p>
            <div className="hero-cta" style={{ justifyContent: 'center', position: 'relative', zIndex: 10 }}>
              <button className="btn btn-primary btn-lg" onClick={() => setDemoOpen(true)}>지금 체험하기</button>
              <a className="btn btn-outline btn-lg" href="#pricing" onClick={e => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}>요금제 보기</a>
            </div>
            <div className="hero-meta">
              <div><span className="n">1.4s</span><span className="l">평균 통과 시간</span></div>
              <div><span className="n">99.2%</span><span className="l">봇 차단율</span></div>
              <div><span className="n">~120ms</span><span className="l">검증 응답</span></div>
            </div>
          </div>
        </div>
      </section>

      {demoOpen && createPortal(
        <div
          onClick={() => setDemoOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
                width: '85%',
                maxWidth: '900px',
                position: 'relative',
            }}
          >
            <CaptchaDemo />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}