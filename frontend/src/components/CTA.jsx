import React from 'react';

export default function CTA({ openPage }) {
  return (
    <section className="band">
      <div className="wrap">
        <div className="cta-band" id="start">
          <div>
            <h2>오늘부터 봇을 멈춰 세우세요</h2>
            <p>위젯 한 줄 추가로 연동 완료. Basic 요금제는 무료로 시작할 수 있습니다.</p>
          </div>
          <a className="btn" href="#" onClick={e => { e.preventDefault(); openPage('apply'); }}>
            무료로 API 발급받기
          </a>
        </div>
      </div>
    </section>
  );
}
