import React, { useState } from 'react';

const CODE = {
  curl: `curl -s https://api.aicaptcha.dev/v1/captcha \\
  -H "Authorization: Bearer YOUR_API_KEY"

# 응답
# {"captcha_id": "cap_abc123", "ascii_image": "...", "ui_type": "choice"}

curl -s https://api.aicaptcha.dev/v1/verify \\
  -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  --data-urlencode "captcha_id=cap_abc123" \\
  --data-urlencode "answer=banana"

# 응답
# {"success": true, "token": "aicap_tok_xyz...", "expires_in": 180}`,

  python: `import requests

# 1. CAPTCHA 발급
resp = requests.get(
    "https://api.aicaptcha.dev/v1/captcha",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)
captcha = resp.json()

# 2. 검증
verify = requests.post(
    "https://api.aicaptcha.dev/v1/verify",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    data={"captcha_id": captcha["captcha_id"], "answer": user_answer}
)
result = verify.json()
# {"success": True, "token": "aicap_tok_xyz...", "expires_in": 180}`,

  node: `const fetch = require('node-fetch');

// 1. CAPTCHA 발급
const captcha = await fetch('https://api.aicaptcha.dev/v1/captcha', {
  headers: { Authorization: 'Bearer YOUR_API_KEY' }
}).then(r => r.json());

// 2. 검증
const result = await fetch('https://api.aicaptcha.dev/v1/verify', {
  method: 'POST',
  headers: { Authorization: 'Bearer YOUR_API_KEY' },
  body: new URLSearchParams({ captcha_id: captcha.captcha_id, answer: userAnswer })
}).then(r => r.json());
// { success: true, token: 'aicap_tok_xyz...', expires_in: 180 }`,
};

const WIDGET_CODE = '<div class="ai-captcha" data-sitekey="YOUR_SITE_KEY"></div>\n'
  + '<script src="https://js.aicaptcha.dev/v1/api.js" async defer><' + '/script>';

const STEPS = [
  { n: '01', color: 'var(--orange)', bg: '#fff4ee', shadow: '0 8px 24px rgba(240,105,30,0.18)', title: 'API Key 발급', desc: '마이페이지 또는 이용신청에서 API Key를 발급받으세요.' },
  { n: '02', color: 'var(--gold)',   bg: '#fffbeb', shadow: '0 8px 24px rgba(202,138,4,0.18)',  title: 'CAPTCHA 요청', desc: '엔드포인트 + API Key로 ASCII 아트 CAPTCHA 문제를 요청합니다.' },
  { n: '03', color: 'var(--ok)',     bg: '#f0fdf4', shadow: '0 8px 24px rgba(34,197,94,0.18)',  title: '검증 / Token', desc: '사용자 응답 전송 후 일회성 통과 Token을 수신합니다.' },
];

export default function GuidePage({ openPage }) {
  const [codeTab, setCodeTab] = useState('curl');
  const [hovered, setHovered] = useState(null);

  return (
    <section className="band" id="guide">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">Guide · API 사용법</span>
          <h2>AICAPTCHA 연동 가이드</h2>
          <p>3단계로 봇 차단을 시작하세요. API Key 발급부터 토큰 검증까지 모두 안내합니다.</p>
        </div>

        <div className="flow" style={{ marginBottom: 48 }}>
          {STEPS.map(s => {
            const isHovered = hovered === s.n;
            return (
              <div
                className="step"
                key={s.n}
                data-reveal
                style={{
                  borderTop: `3px solid ${s.color}`,
                  // opacity를 포함해 CSS [data-reveal]의 transition을 대체 — hover 효과와 공존
                  transition: 'opacity 0.75s cubic-bezier(0.25, 0.10, 0.25, 1.00), transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease',
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                  background: isHovered ? s.bg : undefined,
                  boxShadow: isHovered ? s.shadow : undefined,
                  cursor: 'default',
                }}
                onMouseEnter={() => setHovered(s.n)}
                onMouseLeave={() => setHovered(null)}
              >
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div data-reveal style={{ transitionDelay: '100ms' }}>
          <div style={{ marginBottom: 12, fontWeight: 700, fontSize: 18 }}>API 예제 코드</div>
          <div className="tab-bar">
            {['curl', 'python', 'node'].map(t => (
              <button key={t} className={`tab${codeTab === t ? ' active' : ''}`} onClick={() => setCodeTab(t)}>
                {t === 'curl' ? 'cURL' : t === 'python' ? 'Python' : 'Node.js'}
              </button>
            ))}
          </div>
          <pre className="pg-code">{CODE[codeTab]}</pre>
        </div>

        <div className="case-card" data-reveal style={{ transitionDelay: '200ms', marginTop: 24, background: 'var(--peach)', border: '1px solid var(--peach-deep)' }}>
          <div className="case-icon">📌</div>
          <h3>빠른 연동 — 위젯 한 줄</h3>
          <p>프론트엔드에 스크립트 태그 하나로 위젯을 추가할 수 있습니다.</p>
          <pre className="pg-code" style={{ margin: '10px 0 0' }}>{WIDGET_CODE}</pre>
        </div>
      </div>
    </section>
  );
}
