import React, { useState } from 'react';

const PAGE_SIZE = 10;

/* 공지사항 — 11개 이상 데이터로 2페이지 동작 확인 */
const NOTICES = [
  { id: 11, badge: '공지', title: 'API v1.3 배포 예정 안내 — 멀티 유형 캡챠 지원', date: '2026-06-28' },
  { id: 10, badge: '공지', title: '서버 증설 완료 — 응답 속도 개선 (평균 98ms)', date: '2026-06-25' },
  { id: 9,  badge: '공지', title: 'Enterprise 요금제 온프레미스 배포 가이드 공개', date: '2026-06-22' },
  { id: 8,  badge: '공지', title: 'API v1.2 배포 안내 — 드래그 궤적 검증 강화', date: '2026-06-20' },
  { id: 7,  badge: '공지', title: '카카오페이 · 토스페이먼츠 결제 연동 데모 추가', date: '2026-06-10' },
  { id: 6,  badge: null,   title: 'React SDK v0.9 베타 릴리즈', date: '2026-06-08' },
  { id: 5,  badge: null,   title: '서비스 점검 안내 (6월 5일 새벽 2:00~4:00)', date: '2026-06-01' },
  { id: 4,  badge: null,   title: 'Vue.js 플러그인 정식 배포', date: '2026-05-28' },
  { id: 3,  badge: null,   title: 'Pro 요금제 API 한도 상향 조정 완료', date: '2026-05-15' },
  { id: 2,  badge: null,   title: 'FastAPI · Django 백엔드 SDK 공개', date: '2026-05-08' },
  { id: 1,  badge: null,   title: 'AICAPTCHA 서비스 공개 오픈', date: '2026-05-01' },
];

const FAQS = [
  ['API Key는 어떻게 발급받나요?', '이용 신청 페이지에서 요금제를 선택하고 신청하면 자동으로 API Key가 발급됩니다. 마이페이지 > API Key 관리에서도 확인할 수 있습니다.'],
  ['CAPTCHA 통과율이 낮으면 어떻게 하나요?', '유형 2(드래그) 실패 시 유형 1(4지선다)로 자동 전환됩니다. 사용자 피로도를 최소화하는 폴백 구조입니다.'],
  ['one-time token의 유효 시간은 얼마인가요?', '기본 180초(3분)입니다. 재사용이 불가능하며 만료 시 CAPTCHA를 다시 풀어야 합니다.'],
  ['React/Vue 위젯은 지원하나요?', '네, SDK 플러그인 형태로 React, Vue, FastAPI, Node.js, Django 등을 지원합니다.'],
];

const RESEARCH = [
  { id: 3, title: 'ASCII 아트 CAPTCHA — 인간 정답률 vs VLM 인식률 비교 리포트', date: '2026-05-20' },
  { id: 2, title: '드래그 궤적 기반 봇 탐지 알고리즘 설계 노트', date: '2026-04-30' },
  { id: 1, title: 'ImageNet 8-class 전이학습 결과 요약', date: '2026-04-10' },
];

/* 페이지네이션 컴포넌트 */
function Pagination({ total, page, pageSize, onChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
      <button className="pg-btn" style={{ padding: '7px 12px', fontSize: 13 }}
        disabled={page === 1} onClick={() => onChange(page - 1)}>‹</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
        <button key={n} className="pg-btn" style={{
          padding: '7px 14px', fontSize: 13,
          ...(n === page ? { background: 'var(--orange)', color: '#fff', borderColor: 'var(--orange)' } : {}),
        }} onClick={() => onChange(n)}>{n}</button>
      ))}
      <button className="pg-btn" style={{ padding: '7px 12px', fontSize: 13 }}
        disabled={page === totalPages} onClick={() => onChange(page + 1)}>›</button>
    </div>
  );
}

export default function BoardPage() {
  const [tab, setTab] = useState('notice');
  const [noticePage, setNoticePage] = useState(1);

  /* 공지사항 페이지네이션 */
  const noticeSlice = NOTICES.slice((noticePage - 1) * PAGE_SIZE, noticePage * PAGE_SIZE);

  return (
    <div className="po-body">
      <div className="pg-eyebrow">SC-13 · SC-14</div>
      <h1 className="pg-h1">커뮤니티 & 리소스</h1>
      <p className="pg-sub">공지사항, 자주 묻는 질문, 연구 리포트를 확인하세요.</p>

      <div className="tab-bar">
        {[['notice','공지사항'],['faq','FAQ'],['research','CAPTCHA 연구']].map(([id, label]) => (
          <button key={id} className={`tab${tab === id ? ' active' : ''}`} onClick={() => { setTab(id); setNoticePage(1); }}>{label}</button>
        ))}
      </div>

      {/* 공지사항 */}
      {tab === 'notice' && (
        <>
          <table className="pg-table" style={{ marginBottom: 8 }}>
            <thead>
              <tr><th style={{ width: 60 }}>번호</th><th>제목</th><th style={{ width: 130 }}>작성일</th></tr>
            </thead>
            <tbody>
              {noticeSlice.map(n => (
                <tr key={n.id} style={{ cursor: 'pointer' }}>
                  <td className="num">{n.id}</td>
                  <td>
                    {n.badge && <span className="badge-notice">공지</span>}
                    {n.title}
                  </td>
                  <td style={{ color: 'var(--muted)' }}>{n.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={NOTICES.length} page={noticePage} pageSize={PAGE_SIZE} onChange={setNoticePage} />
        </>
      )}

      {/* FAQ */}
      {tab === 'faq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map(([q, a], i) => (
            <details key={i} className="pg-card" style={{ cursor: 'pointer' }}>
              <summary style={{ fontWeight: 600, fontSize: 15, listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                <span><span className="badge-notice badge-faq">FAQ</span>{q}</span>
                <span style={{ color: 'var(--orange)' }}>+</span>
              </summary>
              <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--ink-soft)' }}>{a}</p>
            </details>
          ))}
        </div>
      )}

      {/* CAPTCHA 연구 */}
      {tab === 'research' && (
        <table className="pg-table">
          <thead><tr><th style={{ width: 60 }}>번호</th><th>제목</th><th style={{ width: 130 }}>작성일</th></tr></thead>
          <tbody>
            {RESEARCH.map(r => (
              <tr key={r.id} style={{ cursor: 'pointer' }}>
                <td className="num">{r.id}</td>
                <td><span className="badge-notice badge-research">연구</span>{r.title}</td>
                <td style={{ color: 'var(--muted)' }}>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
