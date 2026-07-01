// Flow.jsx

import React from 'react';

const steps = [
  { title: '문제 생성', desc: 'API 요청 시 카테고리에 맞는 아스키 타일과 정답 위치·디코이 범위를 무작위로 구성해 출제합니다.' },
  { title: '사용자 검증', desc: '사용자의 드래그 결과와 궤적(속도·가속·경로)을 서버 정답 키와 함께 판정합니다.' },
  { title: '토큰 발급', desc: '검증에 성공하면 일회성 인증 토큰을 반환하고, 백엔드에서 토큰을 최종 검증합니다.' },
];

export default function Flow() {
  return (
    <section className="band tint" id="flow">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">How it works</span>
          <h2>세 단계로 끝나는 검증</h2>
          <p>발급부터 토큰 반환까지, 사이트에 위젯 한 줄을 붙이는 것으로 시작됩니다.</p>
        </div>
        <div className="flow">
          {steps.map((s, i) => (
            <div className="step" key={i} data-reveal style={{ transitionDelay: `${i * 130}ms` }}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
