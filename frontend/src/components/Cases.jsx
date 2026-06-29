import React from 'react';

const cases = [
  { icon: '🎫', title: '티켓팅 플랫폼', desc: '콘서트·스포츠·공연 예매 시 매크로·스캘퍼 봇을 사전에 차단합니다.' },
  { icon: '🛒', title: '한정판 쇼핑몰', desc: '선착순 한정 상품 구매에서 자동화 스크립트의 대량 접근을 막습니다.' },
  { icon: '🔑', title: '회원가입 / 로그인', desc: '대량 계정 생성 및 크리덴셜 스터핑 공격을 효과적으로 차단합니다.' },
  { icon: '📋', title: '이벤트 응모', desc: '선착순 경품 응모에서 동일 사용자의 반복 제출을 방지합니다.' },
];

export default function Cases() {
  return (
    <section className="band tint" id="cases">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Use Cases</span>
          <h2>어디서 쓰이나요</h2>
          <p>티켓팅, 한정판 쇼핑, 회원가입, 선착순 이벤트 등 봇 차단이 필요한 모든 곳에 적용됩니다.</p>
        </div>
        <div className="cases-grid">
          {cases.map((c, i) => (
            <div className="case-card" key={i}>
              <div className="case-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
