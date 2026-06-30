import React, { useState } from 'react';

/* ── 공통 모달 래퍼 ── */
function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(36,27,21,.45)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: '#fff', borderRadius: 'var(--r)', padding: '32px 28px',
        width: '100%', maxWidth: 420, boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 700, letterSpacing: '-.02em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--muted)', lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── 아이디 찾기 모달 ── */
function FindIdModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);

  return (
    <Modal title="아이디 찾기" onClose={onClose}>
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-soft)' }}>가입 시 등록한 이메일 또는 휴대폰 번호로 아이디를 확인하세요.</p>
          <input className="pg-input" placeholder="이메일 주소"/>
          <input className="pg-input" type="tel" placeholder="휴대폰 번호 (선택)"/>
          <button className="pg-btn primary" style={{ width: '100%', padding: 13 }}
            onClick={() => { setSent(true); setStep(2); }}>아이디 찾기</button>
        </div>
      )}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>📧</div>
          <div>
            <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 16 }}>이메일로 아이디를 전송했습니다.</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>입력하신 이메일 받은편지함을 확인하세요.</p>
          </div>
          <div style={{ background: 'var(--peach)', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: 'var(--ink-soft)' }}>
            확인된 아이디: <strong style={{ color: 'var(--ink)' }}>user***</strong>
          </div>
          <button className="pg-btn primary" style={{ width: '100%', padding: 13 }} onClick={onClose}>로그인 화면으로</button>
        </div>
      )}
    </Modal>
  );
}

/* ── 비밀번호 찾기 모달 ── */
function FindPwModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');

  return (
    <Modal title="비밀번호 찾기" onClose={onClose}>
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-soft)' }}>가입한 아이디와 이메일을 입력하면 인증코드를 발송합니다.</p>
          <input className="pg-input" placeholder="아이디 (login_id)"/>
          <input className="pg-input" type="email" placeholder="이메일 주소"/>
          <button className="pg-btn primary" style={{ width: '100%', padding: 13 }}
            onClick={() => setStep(2)}>인증코드 발송</button>
        </div>
      )}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-soft)' }}>이메일로 발송된 6자리 인증코드를 입력하세요.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="pg-input" placeholder="인증코드 6자리" value={code} onChange={e => setCode(e.target.value)} style={{ flex: 1 }}/>
            <button className="pg-btn" style={{ whiteSpace: 'nowrap', padding: '0 14px', fontSize: 13 }} onClick={() => setStep(2)}>재발송</button>
          </div>
          <button className="pg-btn primary" style={{ width: '100%', padding: 13 }}
            onClick={() => setStep(3)}>인증 확인</button>
        </div>
      )}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-soft)' }}>새 비밀번호를 입력하세요.</p>
          <input className="pg-input" type="password" placeholder="새 비밀번호"/>
          <input className="pg-input" type="password" placeholder="새 비밀번호 확인"/>
          <button className="pg-btn primary" style={{ width: '100%', padding: 13 }} onClick={() => setStep(4)}>비밀번호 변경</button>
        </div>
      )}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <div>
            <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 16 }}>비밀번호가 변경되었습니다.</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>새 비밀번호로 로그인하세요.</p>
          </div>
          <button className="pg-btn primary" style={{ width: '100%', padding: 13 }} onClick={onClose}>로그인 화면으로</button>
        </div>
      )}
    </Modal>
  );
}

/* ── 메인 로그인 페이지 ── */
export default function LoginPage({ openPage, closePage }) {
  const [modal, setModal] = useState(null); // null | 'findId' | 'findPw'

  return (
    <>
      <div className="po-body" style={{ maxWidth: 480 }}>
        <div className="pg-eyebrow">SC-06</div>
        <h1 className="pg-h1">로그인</h1>
        <p className="pg-sub">계정에 로그인하세요.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input className="pg-input" placeholder="아이디"/>
          <input className="pg-input" type="password" placeholder="비밀번호"/>
          <button className="pg-btn primary" style={{ width: '100%', padding: 15, fontSize: 16 }}
            onClick={() => openPage('mypage')}>로그인</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)' }}>
            <button onClick={() => setModal('findId')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 13, padding: 0 }}>
              아이디 찾기
            </button>
            <button onClick={() => setModal('findPw')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 13, padding: 0 }}>
              비밀번호 찾기
            </button>
          </div>
          <hr className="pg-divider"/>
          <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--ink-soft)' }}>
            계정이 없으신가요?
            <button onClick={() => openPage('signup')}
              style={{ background: 'none', border: 'none', color: 'var(--orange)', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0, marginLeft: 4 }}>
              회원가입 →
            </button>
          </div>
        </div>
      </div>

      {modal === 'findId' && <FindIdModal onClose={() => setModal(null)} />}
      {modal === 'findPw' && <FindPwModal onClose={() => setModal(null)} />}
    </>
  );
}
