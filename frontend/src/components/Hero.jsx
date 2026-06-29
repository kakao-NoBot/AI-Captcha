import React from 'react';
import CaptchaDemo from './CaptchaDemo';

export default function Hero({ openPage }) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Anti-Bot CAPTCHA · 티켓팅 보안</span>
          <h1>사람은 <span className="hl">통과</span>하고,<br/>봇은 막는 AI 캡차</h1>
          <p className="lead">
            ImageNet 기반 아스키 타일을 조건에 맞게 드래그하면 끝.
            사람은 1~2초면 통과하지만, 매크로·스캘퍼 봇은 멈춰 섭니다.
            정답 위치와 드래그 궤적까지 함께 검증합니다.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary btn-lg" href="#demo">지금 체험하기</a>
            <a className="btn btn-outline btn-lg" href="#" onClick={e => { e.preventDefault(); openPage('apply'); }}>API 신청</a>
          </div>
          <div className="hero-meta">
            <div><span className="n">1.4s</span><span className="l">평균 통과 시간</span></div>
            <div><span className="n">99.2%</span><span className="l">봇 차단율</span></div>
            <div><span className="n">~120ms</span><span className="l">검증 응답</span></div>
          </div>
        </div>
        <CaptchaDemo />
      </div>
    </section>
  );
}
