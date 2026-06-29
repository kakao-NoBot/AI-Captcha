import React from 'react';

export default function SignupPage({ openPage }) {
  return (
    <div className="po-body" style={{ maxWidth: 480 }}>
      <div className="pg-eyebrow">SC-05</div>
      <h1 className="pg-h1">회원가입</h1>
      <p className="pg-sub">계정을 만들고 API Key를 발급받으세요.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input className="pg-input" placeholder="이름"/>
        <input className="pg-input" placeholder="아이디 (login_id)"/>
        <input className="pg-input" type="password" placeholder="비밀번호"/>
        <input className="pg-input" type="password" placeholder="비밀번호 확인"/>
        <input className="pg-input" type="email" placeholder="이메일"/>
        <input className="pg-input" type="tel" placeholder="휴대폰 번호"/>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ink-soft)', cursor: 'pointer' }}>
          <input type="checkbox" style={{ width: 17, height: 17, accentColor: 'var(--orange)' }}/>
          이용약관 및 개인정보처리방침 동의
        </label>
        <button className="pg-btn primary" style={{ width: '100%', padding: 15, fontSize: 16 }}
          onClick={() => openPage('apply')}>회원가입</button>
        <hr className="pg-divider"/>
        <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--ink-soft)' }}>
          이미 계정이 있으신가요?
          <button onClick={() => openPage('login')}
            style={{ background: 'none', border: 'none', color: 'var(--orange)', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0, marginLeft: 4 }}>
            로그인 →
          </button>
        </div>
      </div>
    </div>
  );
}
