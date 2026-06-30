import React, { useState } from 'react';

const VOLUMES = ['월 50만 건 이하', '월 50~200만 건', '월 200~500만 건', '월 500만 건 이상', '미정'];

export default function EnterprisePage({ closePage }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', volume: '', message: '' });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.company || !form.name || !form.email) return alert('회사명, 담당자명, 이메일은 필수입니다.');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="po-body" style={{ maxWidth: 560, textAlign: 'center', paddingTop: 60 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg viewBox="0 0 34 34" fill="none" width={34} height={34}>
            <path d="M7 17.5 13.5 24 27 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="pg-h1" style={{ marginBottom: 12 }}>문의가 접수되었습니다!</h2>
        <p className="pg-sub">담당자가 영업일 기준 1~2일 내로 <strong>{form.email}</strong> 로 연락드리겠습니다.</p>
        <button className="pg-btn primary" style={{ marginTop: 32, padding: '12px 32px' }} onClick={closePage}>홈으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="po-body" style={{ maxWidth: 600 }}>
      <div className="pg-eyebrow">Enterprise · 도입 문의</div>
      <h1 className="pg-h1">서비스 도입 문의</h1>
      <p className="pg-sub">아래 양식을 작성해 주시면 담당자가 맞춤 견적과 함께 연락드립니다.</p>

      <div className="pg-card" style={{ marginBottom: 16 }}>
        <div className="pg-label">기업 정보</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="pg-input" placeholder="회사명 / 서비스명 *" value={form.company} onChange={set('company')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input className="pg-input" placeholder="담당자명 *" value={form.name} onChange={set('name')} />
            <input className="pg-input" placeholder="전화번호 (선택)" value={form.phone} onChange={set('phone')} />
          </div>
          <input className="pg-input" type="email" placeholder="연락 이메일 *" value={form.email} onChange={set('email')} />
        </div>
      </div>

      <div className="pg-card" style={{ marginBottom: 16 }}>
        <div className="pg-label">도입 정보</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <select className="pg-input" value={form.volume} onChange={set('volume')} style={{ cursor: 'pointer' }}>
            <option value="">예상 월 호출량 선택</option>
            {VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <textarea
            className="pg-input"
            placeholder="도입 목적 및 문의 내용을 자유롭게 작성해 주세요."
            value={form.message}
            onChange={set('message')}
            rows={5}
            style={{ resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>
      </div>

      <div style={{ background: 'var(--peach)', border: '1px solid var(--peach-deep)', borderRadius: 12, padding: '14px 16px', fontSize: 13, color: 'var(--ink-soft)', marginBottom: 20 }}>
        ✓ SLA 99.9% 보장 &nbsp;·&nbsp; ✓ API Key 무제한 &nbsp;·&nbsp; ✓ 전담 매니저 &nbsp;·&nbsp; ✓ 온프레미스 배포 가능
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="pg-btn" onClick={closePage}>취소</button>
        <button className="pg-btn primary" style={{ flex: 1, padding: 14, fontSize: 15 }} onClick={handleSubmit}>
          문의 제출하기
        </button>
      </div>
    </div>
  );
}
