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

export default function GuidePage({ openPage }) {
  const [codeTab, setCodeTab] = useState('curl');

  return (
    <div className="po-body">
      <div className="pg-eyebrow">SC-11 · API 사용법</div>
      <h1 className="pg-h1">AICAPTCHA 연동 가이드</h1>
      <p className="pg-sub">3단계로 봇 차단을 시작하세요. API Key 발급부터 토큰 검증까지 모두 안내합니다.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { n: '01', color: 'var(--orange)', title: 'API Key 발급', desc: '마이페이지 또는 이용신청에서 API Key를 발급받으세요.', btn: true },
          { n: '02', color: 'var(--gold)',   title: 'CAPTCHA 요청', desc: '엔드포인트 + API Key로 ASCII 아트 CAPTCHA 문제를 요청합니다.' },
          { n: '03', color: 'var(--ok)',     title: '검증 / Token', desc: '사용자 응답 전송 후 일회성 통과 Token을 수신합니다.' },
        ].map(s => (
          <div className="pg-card" key={s.n} style={{ borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontFamily: 'var(--disp)', fontSize: 28, fontWeight: 700, color: s.color, marginBottom: 12 }}>{s.n}</div>
            <h3 className="pg-h3">{s.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '6px 0 0' }}>{s.desc}</p>
            {s.btn && (
              <button className="pg-btn primary" style={{ marginTop: 16, fontSize: 13, padding: '9px 16px' }}
                onClick={() => openPage('apply')}>이용 신청 →</button>
            )}
          </div>
        ))}
      </div>

      <h2 className="pg-h2" style={{ marginBottom: 16 }}>API 예제 코드</h2>
      <div className="tab-bar">
        {['curl', 'python', 'node'].map(t => (
          <button key={t} className={`tab${codeTab === t ? ' active' : ''}`} onClick={() => setCodeTab(t)}>
            {t === 'curl' ? 'cURL' : t === 'python' ? 'Python' : 'Node.js'}
          </button>
        ))}
      </div>
      <pre className="pg-code">{CODE[codeTab]}</pre>

      <div className="pg-card" style={{ marginTop: 28, background: 'var(--peach)', borderColor: 'var(--peach-deep)' }}>
        <h3 className="pg-h3" style={{ marginBottom: 8 }}>📌 빠른 연동 — 위젯 한 줄</h3>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 10 }}>프론트엔드에 스크립트 태그 하나로 위젯을 추가할 수 있습니다.</p>
        <pre className="pg-code" style={{ margin: 0 }}>{`<div class="ai-captcha" data-sitekey="YOUR_SITE_KEY"></div>
<script src="https://js.aicaptcha.dev/v1/api.js" async defer></script>`}</pre>
      </div>
    </div>
  );
}
