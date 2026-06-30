import React, { useState } from 'react';

const PLAN_LABELS = {
  Basic: 'Basic — 무료',
  Pro: 'Pro — ₩89,000/월',
  Enterprise: 'Enterprise — 문의',
};

const PLANS = [
  { id: 'Basic',      label: 'BASIC',      price: '₩0',     sub: '월 10만 호출' },
  { id: 'Pro',        label: 'PRO ★',      price: '₩89,000', sub: '월 50만 호출' },
  { id: 'Enterprise', label: 'ENTERPRISE', price: '문의',   sub: '무제한' },
];

export default function ApplyPage({ openPage, initialPlan = 'Pro' }) {
  const [plan, setPlan] = useState(initialPlan);

  return (
    <div className="po-body" style={{ maxWidth: 560 }}>
      <div className="pg-eyebrow">SC-15 · API Key 발급 신청</div>
      <h1 className="pg-h1">이용 신청</h1>
      <p className="pg-sub">요금제를 선택하고 신청을 완료하면 API Key가 즉시 발급됩니다.</p>

      {/* 요금제 카드 — 동일 크기, 선택 시 주황 테두리 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
        {PLANS.map(p => {
          const isSelected = plan === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setPlan(p.id)}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                background: isSelected ? 'var(--peach)' : '#fff',
                border: `2px solid ${isSelected ? 'var(--orange)' : 'var(--line)'}`,
                borderRadius: 'var(--r)',
                padding: '20px 12px',
                /* 높이 고정으로 동일 크기 */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                minHeight: 110,
                transition: '.15s',
                boxShadow: isSelected ? '0 0 0 3px rgba(240,105,30,.12)' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 11,
                letterSpacing: '.14em', textTransform: 'uppercase',
                color: isSelected ? 'var(--orange)' : 'var(--muted)',
              }}>{p.label}</div>
              <div style={{ fontFamily: 'var(--disp)', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>{p.price}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{p.sub}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input className="pg-input" placeholder="서비스/회사명"/>
        <input className="pg-input" type="email" placeholder="연락 이메일"/>
        <div style={{ background: 'var(--peach)', border: '1px solid var(--line)', borderRadius: 12, padding: 16, fontSize: 14, color: 'var(--ink-soft)' }}>
          선택된 요금제: <strong style={{ color: 'var(--orange)' }}>{PLAN_LABELS[plan]}</strong><br/>
          <span style={{ fontSize: 12 }}>신청 완료 후 마이페이지 &gt; API Key 관리에서 확인 가능</span>
        </div>
        <button className="pg-btn primary" style={{ padding: 15, fontSize: 16 }}
          onClick={() => openPage('apply-done')}>신청 및 API Key 발급</button>
      </div>
    </div>
  );
}
