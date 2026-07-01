import React from 'react';

export default function Compare() {
  return (
    <section className="band tint" id="compare">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">Why AICAPTCHA</span>
          <h2>기존 캡차와 무엇이 다른가</h2>
          <p>왜곡 텍스트나 단순 이미지 선택은 봇에게 이미 뚫렸습니다. 우리는 인식·배치·행동을 한 번에 검증합니다.</p>
        </div>
        <div className="compare">
          <div className="cmp old" data-reveal style={{ transitionDelay: '100ms' }}>
            <h3>기존 CAPTCHA</h3>
            <div className="sub">왜곡 텍스트 · 단순 이미지 선택</div>
            <ul>
              <li><span className="ico">✕</span> VLM·자동화 도구에 우회 사례 다수</li>
              <li><span className="ico">✕</span> 흐릿한 글자에 사용자 피로도 높음</li>
              <li><span className="ico">✕</span> 정답만 맞으면 통과 — 행동 검증 없음</li>
              <li><span className="ico">✕</span> 매크로의 대량 시도를 막지 못함</li>
            </ul>
          </div>
          <div className="cmp new" data-reveal style={{ transitionDelay: '220ms' }}>
            <h3>AICAPTCHA <span className="pill">Ours</span></h3>
            <div className="sub">아스키 타일 드래그-투-타깃</div>
            <ul>
              <li><span className="ico">✓</span> 사람은 쉽고 VLM은 약한 아스키 지각 활용</li>
              <li><span className="ico">✓</span> 정밀 드래그 배치로 스크립트 난이도 상승</li>
              <li><span className="ico">✓</span> 속도·가속·경로 등 드래그 궤적까지 검증</li>
              <li><span className="ico">✓</span> 일회성 토큰·rate limit으로 대량 시도 차단</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
