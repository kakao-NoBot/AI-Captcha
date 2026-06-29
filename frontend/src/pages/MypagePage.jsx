import React, { useState, useEffect } from 'react';

const realKey = 'sk-aicap_prod_7f3a91b2c4d5e6f789012345xxxx';

/* ── 공통 모달 ── */
function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(36,27,21,.45)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 'var(--r)', padding: '32px 28px', width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--muted)', lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── 비밀번호 변경 모달 ── */
function ChangePwModal({ onClose }) {
  const [done, setDone] = useState(false);
  return (
    <Modal title="비밀번호 변경" onClose={onClose}>
      {!done ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="pg-input" type="password" placeholder="현재 비밀번호"/>
          <input className="pg-input" type="password" placeholder="새 비밀번호"/>
          <input className="pg-input" type="password" placeholder="새 비밀번호 확인"/>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>영문·숫자·특수문자 포함 8자 이상</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button className="pg-btn" style={{ flex: 1, padding: 13 }} onClick={onClose}>취소</button>
            <button className="pg-btn primary" style={{ flex: 1, padding: 13 }} onClick={() => setDone(true)}>변경하기</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>비밀번호가 변경되었습니다.</p>
          <button className="pg-btn primary" style={{ width: '100%', padding: 13 }} onClick={onClose}>확인</button>
        </div>
      )}
    </Modal>
  );
}

/* ── 정보 수정 모달 ── */
function EditInfoModal({ onClose }) {
  const [done, setDone] = useState(false);
  return (
    <Modal title="정보 수정" onClose={onClose}>
      {!done ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="pg-input" defaultValue="홍길동" placeholder="이름"/>
          <input className="pg-input" type="email" defaultValue="user@example.com" placeholder="이메일"/>
          <input className="pg-input" type="tel" defaultValue="010-1234-5678" placeholder="휴대폰 번호"/>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button className="pg-btn" style={{ flex: 1, padding: 13 }} onClick={onClose}>취소</button>
            <button className="pg-btn primary" style={{ flex: 1, padding: 13 }} onClick={() => setDone(true)}>저장</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>정보가 수정되었습니다.</p>
          <button className="pg-btn primary" style={{ width: '100%', padding: 13 }} onClick={onClose}>확인</button>
        </div>
      )}
    </Modal>
  );
}

/* ── SC-07 내 정보 탭 ── */
function InfoTab() {
  const [modal, setModal] = useState(null); // null | 'pw' | 'edit'
  return (
    <>
      <div className="pg-label">SC-07 · 사용자 정보</div>
      <h2 className="pg-h2" style={{ marginBottom: 20 }}>내 정보</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>이름</div>
          <input className="pg-input" defaultValue="홍길동" readOnly style={{ background: 'var(--paper)' }}/>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>이메일</div>
          <input className="pg-input" defaultValue="user@example.com" readOnly style={{ background: 'var(--paper)' }}/>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>요금제</div>
          <input className="pg-input" defaultValue="Pro" readOnly style={{ background: 'var(--paper)' }}/>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>가입일</div>
          <input className="pg-input" defaultValue="2026-01-01" readOnly style={{ background: 'var(--paper)' }}/>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button className="pg-btn" onClick={() => setModal('pw')}>비밀번호 변경</button>
          <button className="pg-btn" onClick={() => setModal('edit')}>정보 수정</button>
        </div>
      </div>

      {modal === 'pw'   && <ChangePwModal onClose={() => setModal(null)} />}
      {modal === 'edit' && <EditInfoModal onClose={() => setModal(null)} />}
    </>
  );
}

/* ── SC-08 API Key 탭 ── */
function ApiKeyTab({ openPage }) {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(realKey);
  const [copyLabel, setCopyLabel] = useState('복사');

  const copy = () => {
    navigator.clipboard.writeText(key).catch(() => {});
    setCopyLabel('복사됨 ✓');
    setTimeout(() => setCopyLabel('복사'), 1500);
  };
  const reissue = () => {
    if (window.confirm('재발급하면 기존 Key가 즉시 만료됩니다. 계속하시겠어요?')) {
      const newKey = 'sk-aicap_prod_' + Math.random().toString(36).slice(2, 18) + 'xxxx';
      setKey(newKey);
      setVisible(true);
      alert('새 API Key가 발급되었습니다.');
    }
  };

  return (
    <>
      <div className="pg-label">SC-08 · API Key 관리</div>
      <h2 className="pg-h2" style={{ marginBottom: 20 }}>API Key 관리</h2>
      <div className="pg-card" style={{ maxWidth: 560 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span className="pg-h3">현재 API Key</span>
          <span className="pill" style={{ background: 'var(--ok)' }}>사용 중</span>
        </div>
        <div className="key-box">
          <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{visible ? key : 'sk-••••••••••••••••••••••••xxxx'}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="pg-btn" style={{ padding: '7px 12px', fontSize: 13 }} onClick={() => setVisible(v => !v)}>조회</button>
            <button className="pg-btn" style={{ padding: '7px 12px', fontSize: 13 }} onClick={copy}>{copyLabel}</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, margin: '14px 0', fontSize: 13, color: 'var(--ink-soft)' }}>
          <span>발급일: 2026-01-01</span><span>만료일: 2027-01-01</span><span>요금제: Pro</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="pg-btn primary" onClick={reissue}>재발급</button>
          <button className="pg-btn" onClick={() => openPage('guide')}>사용 가이드 보기</button>
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>재발급 시 기존 Key는 즉시 만료됩니다.</p>
      </div>
      <div style={{ background: 'var(--peach)', border: '1px solid var(--line)', borderRadius: 10, padding: '14px 16px', marginTop: 14, fontSize: 13, color: 'var(--ink-soft)', maxWidth: 560 }}>
        ※ 발급 한도 / Key 개수 제한은 요금제(plan)별 api_limit 정책에 따름
      </div>
    </>
  );
}

/* ── SC-09 사용량 탭 ── */
function UsageTab() {
  useEffect(() => {
    const drawBar = (id, data) => {
      const el = document.getElementById(id);
      if (!el || el.children.length > 0) return;
      const max = Math.max(...data);
      data.forEach(v => {
        const b = document.createElement('div');
        b.style.cssText = `flex:1;background:linear-gradient(180deg,var(--orange),var(--gold));border-radius:3px 3px 0 0;height:${Math.round(v/max*100)}%;min-height:3px;opacity:.85`;
        el.appendChild(b);
      });
    };
    drawBar('chart-daily',   [820,1100,950,1240,1380,990,670,1050,1180,1320,880,740,1060,1290,1100,930,1040,1170,1350,990,850,1080,1250,1060,970,1130,1200,1340,1180,1240]);
    drawBar('chart-monthly', [18000,22000,19500,24000,28000,31200,29800,33000,27000,30500,31200,32800]);
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div className="pg-label">SC-09 · 사용량 조회</div>
          <h2 className="pg-h2">사용량 조회</h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="pg-btn" style={{ fontSize: 13, padding: '8px 14px' }}>기간 선택 ▾</button>
          <button className="pg-btn" style={{ fontSize: 13, padding: '8px 14px' }}>CSV 다운로드</button>
        </div>
      </div>
      <div className="pg-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 10 }}>
          <span>이번 달 API 호출량</span><strong>31,200 / 50,000회</strong>
        </div>
        <div className="usage-bar-wrap"><div className="usage-bar" style={{ width: '62%' }}/></div>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '8px 0 0' }}>한도의 62% 사용 중 (Pro 요금제 api_limit 기준)</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div className="pg-card" style={{ minHeight: 160, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="pg-label" style={{ margin: 0 }}>일별 호출량 (최근 30일)</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 3, paddingTop: 8 }} id="chart-daily"/>
        </div>
        <div className="pg-card" style={{ minHeight: 160, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="pg-label" style={{ margin: 0 }}>월별 호출량 (최근 12개월)</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 4, paddingTop: 8 }} id="chart-monthly"/>
        </div>
      </div>
      <table className="pg-table">
        <thead><tr><th>날짜</th><th>CAPTCHA 발급</th><th>CAPTCHA 검증</th><th>성공률</th></tr></thead>
        <tbody>
          <tr><td>2026-06-12</td><td>1,240</td><td>1,198</td><td>96.6%</td></tr>
          <tr><td>2026-06-11</td><td>1,180</td><td>1,142</td><td>96.8%</td></tr>
          <tr><td>2026-06-10</td><td>995</td><td>961</td><td>96.6%</td></tr>
          <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>— 더보기 —</td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ── SC-17 계정 탈퇴 탭 (탈퇴사유 제거) ── */
function DeactivateTab({ closePage }) {
  const [agreed, setAgreed] = useState(false);
  const confirm_ = () => {
    if (!agreed) { alert('탈퇴 동의 체크박스를 선택해주세요.'); return; }
    if (window.confirm('정말로 탈퇴하시겠어요? 이 작업은 되돌릴 수 없습니다.')) {
      closePage();
      alert('탈퇴가 완료되었습니다.');
    }
  };

  return (
    <>
      <div className="pg-label">SC-17 · 계정 탈퇴</div>
      <h2 className="pg-h2" style={{ marginBottom: 20 }}>계정 탈퇴</h2>
      <div className="warn-box" style={{ maxWidth: 520, marginBottom: 20 }}>
        <strong>⚠ 탈퇴 시 안내</strong>
        계정 정보, API Key, 결제/사용량 이력이 모두 삭제되며 복구할 수 없습니다.<br/>
        진행 중인 요금제 구독은 즉시 해지됩니다.<br/>
        작성한 게시글/문의 내역은 별도 처리 정책에 따릅니다.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
        <input className="pg-input" type="password" placeholder="비밀번호 확인"/>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ink-soft)', cursor: 'pointer' }}>
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ width: 17, height: 17, accentColor: '#c0392b' }}/>
          위 내용을 확인했으며 탈퇴에 동의합니다
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="pg-btn">취소</button>
          <button className="pg-btn danger" onClick={confirm_}>탈퇴하기</button>
        </div>
      </div>
    </>
  );
}

const TABS = [
  { id: 'info',       label: '내 정보' },
  { id: 'apikey',     label: 'API Key 관리' },
  { id: 'usage',      label: '사용량 조회' },
  { id: 'deactivate', label: '계정 탈퇴', danger: true },
];

export default function MypagePage({ openPage, closePage }) {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="mp-wrap">
      <div className="mp-sidebar">
        {TABS.map(t => (
          <button key={t.id}
            className={`mp-nav-item${activeTab === t.id ? ' active' : ''}`}
            onClick={() => setActiveTab(t.id)}
            style={t.danger ? { color: '#c0392b' } : {}}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mp-content">
        {activeTab === 'info'       && <InfoTab />}
        {activeTab === 'apikey'     && <ApiKeyTab openPage={openPage} />}
        {activeTab === 'usage'      && <UsageTab />}
        {activeTab === 'deactivate' && <DeactivateTab closePage={closePage} />}
      </div>
    </div>
  );
}
