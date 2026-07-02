// SignupPage.jsx

import React, { useState } from 'react';

export default function SignupPage({ openPage }) {
  const [name, setName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const errorStyle = { border: '1.5px solid #c0392b' };

  const isValid =
    name.trim() && loginId.trim() && password.trim() &&
    passwordConfirm.trim() && email.trim() && phone.trim() && agreed;

  const handleSignup = () => {
    if (!isValid) { setAttempted(true); return; }
    openPage('login');   // 'apply' → 'login'으로 변경
  };

  return (
    <div className="po-body" style={{ maxWidth: 480 }}>
      <div className="pg-eyebrow">SC-05</div>
      <h1 className="pg-h1">회원가입</h1>
      <p className="pg-sub">계정을 만들고 API Key를 발급받으세요.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          className="pg-input"
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
          style={attempted && !name.trim() ? errorStyle : {}}
        />
        <input
          className="pg-input"
          placeholder="아이디"
          value={loginId}
          onChange={e => setLoginId(e.target.value)}
          style={attempted && !loginId.trim() ? errorStyle : {}}
        />
        <input
          className="pg-input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={attempted && !password.trim() ? errorStyle : {}}
        />
        <input
          className="pg-input"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          style={attempted && !passwordConfirm.trim() ? errorStyle : {}}
        />
        <input
          className="pg-input"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={attempted && !email.trim() ? errorStyle : {}}
        />
        <input
          className="pg-input"
          type="tel"
          placeholder="휴대폰 번호"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={attempted && !phone.trim() ? errorStyle : {}}
        />
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
            color: 'var(--ink-soft)',
            cursor: 'pointer',
          }}
        >
          <span style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                margin: 0,
                opacity: 0,
                cursor: 'pointer',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 6,
                border: attempted && !agreed
                  ? '1.5px solid #c0392b'
                  : `1.5px solid ${agreed ? 'var(--orange)' : '#d8d0c4'}`,
                background: agreed ? 'var(--orange)' : '#fff',
                transition: 'background 0.15s ease, border-color 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                style={{
                  opacity: agreed ? 1 : 0,
                  transform: agreed ? 'scale(1)' : 'scale(0.6)',
                  transition: 'opacity 0.12s ease, transform 0.12s ease',
                }}
              >
                <path
                  d="M1 5L4.2 8L11 1"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          이용약관 및 개인정보처리방침 동의
        </label>
        <button
          className="pg-btn primary"
          style={{ width: '100%', padding: 15, fontSize: 16, opacity: isValid ? 1 : 0.5, cursor: isValid ? 'pointer' : 'not-allowed' }}
          onClick={handleSignup}
        >회원가입</button>
        <hr className="pg-divider"/>
        <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--ink-soft)' }}>
          이미 계정이 있으신가요?
          <button onClick={() => openPage('login')}
            style={{ background: 'none', border: 'none', color: 'var(--orange)', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0, marginLeft: 4 }}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}