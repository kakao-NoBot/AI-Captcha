// App.jsx

import React, { useState, useEffect } from 'react';
import './styles/main.css';
import homeIcon from './assets/home.png';

// Layout components
import Nav from './components/Nav';
import Hero from './components/Hero';
import Compare from './components/Compare';
import Metrics from './components/Metrics';
import Flow from './components/Flow';
import Cases from './components/Cases';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

// Pages (overlays)
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MypagePage from './pages/MypagePage';
import PaymentPage from './pages/PaymentPage';
import GuidePage from './pages/GuidePage';
import BoardPage from './pages/BoardPage';
import PlanPayPage from './pages/PlanPayPage';
import EnterprisePage from './pages/EnterprisePage';

const PAGE_TITLES = {
  login:      '로그인',
  signup:     '회원가입',
  mypage:     '마이페이지',
  payment:    '결제',
  guide:      '사용자 가이드',
  board:      '공지사항 / FAQ / CAPTCHA 연구',
  apply:      '이용 신청',
  'apply-done': '이용 신청 완료',
  'plan-pay': '요금제 결제',
};

function HomeButton({ onClick }) {
  return (
    <button className="po-back po-home" onClick={onClick} aria-label="홈으로" title="홈으로">
      <img src={homeIcon} alt="" />
    </button>
  );
}

// Page overlay wrapper
function PageOverlay({ id, activePage, title, onBack, extra, children }) {
  const isActive = activePage === id;

  useEffect(() => {
    if (isActive) window.scrollTo(0, 0);
  }, [isActive]);

  return (
    <div className={`page-overlay${isActive ? ' active' : ''}`}>
      <div className="po-nav">
        <HomeButton onClick={onBack} />
        <span className="po-title" dangerouslySetInnerHTML={{ __html: 'AI<b style="color:var(--orange)">CAPTCHA</b>' }}/>
        {extra}
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(null);
  const [planPayArgs, setPlanPayArgs] = useState({ plan: 'Pro' });
  const [mypageTab, setMypageTab] = useState('info');

  const openPage = (id) => setPage(id);
  const closePage = () => setPage(null);

  const openPlanPayment = (plan) => {
    setPlanPayArgs({ plan });
    setPage('plan-pay');
  };

  const openMypageOnApiKey = () => {
    setMypageTab('apikey');
    setPage('mypage');
  };

  // 오버레이가 열려 있을 때 배경(body) 스크롤바를 숨겨 이중 스크롤바 방지
  useEffect(() => {
    document.body.style.overflow = page ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [page]);

  // 스크롤 진입 시 요소 표시 (IntersectionObserver)
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Main page */}
      <Nav openPage={openPage} />
      <a id="top"/>
      <Hero openPage={openPage} />
      <Compare />
      <Metrics />
      <Flow />
<Cases />
      <Pricing openPage={openPage} openPlanPayment={openPlanPayment} />
      <GuidePage openPage={openPage} />
      <Footer />

      {/* Chatbot FAB + Widget */}
      <ChatbotWidget />

      {/* ── Page Overlays ── */}

      {/* Login */}
      <PageOverlay id="login" activePage={page} onBack={closePage}>
        <LoginPage openPage={openPage} closePage={closePage} />
      </PageOverlay>

      {/* Signup */}
      <div className={`page-overlay${page === 'signup' ? ' active' : ''}`}>
        <div className="po-nav">
          <button className="po-back" onClick={() => openPage('login')}>로그인으로</button>
          <span className="po-title" dangerouslySetInnerHTML={{ __html: 'AI<b style="color:var(--orange)">CAPTCHA</b>' }}/>
        </div>
        <SignupPage openPage={openPage} />
      </div>

      {/* Mypage */}
      <div className={`page-overlay${page === 'mypage' ? ' active' : ''}`}>
        <div className="po-nav">
          <HomeButton onClick={closePage} />
          <span className="po-title">마이페이지</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 14, color: 'var(--ink-soft)', display: 'flex', alignItems: 'center' }}>홍길동님</span>
            <button className="pg-btn" style={{ fontSize: 13, padding: '7px 14px' }} onClick={closePage}>로그아웃</button>
          </div>
        </div>
        <div className="po-body">
          <MypagePage openPage={openPage} closePage={closePage} initialTab={mypageTab} />
        </div>
      </div>

      {/* Payment (ticketing) */}
      <div className={`page-overlay${page === 'payment' ? ' active' : ''}`}>
        <div className="po-nav">
          <button className="po-back" onClick={closePage}>← CAPTCHA로</button>
          <span className="po-title">TICKETING · CHECKOUT</span>
          <button className="pg-btn" style={{ marginLeft: 'auto', fontSize: 13, padding: '7px 14px' }}>주문 취소</button>
        </div>
        <PaymentPage closePage={closePage} />
      </div>

      {/* Board */}
      <div className={`page-overlay${page === 'board' ? ' active' : ''}`}>
        <div className="po-nav">
          <HomeButton onClick={closePage} />
          <span className="po-title">공지사항 / FAQ / CAPTCHA 연구</span>
        </div>
        <BoardPage />
      </div>

      {/* Enterprise Inquiry */}
      <div className={`page-overlay${page === 'enterprise' ? ' active' : ''}`}>
        <div className="po-nav">
          <HomeButton onClick={closePage} />
          <span className="po-title" dangerouslySetInnerHTML={{ __html: 'AI<b style="color:var(--orange)">CAPTCHA</b> · Enterprise 도입 문의' }}/>
        </div>
        <EnterprisePage closePage={closePage} />
      </div>

      {/* Plan Payment */}
      <div className={`page-overlay${page === 'plan-pay' ? ' active' : ''}`}>
        <div className="po-nav">
          <HomeButton onClick={closePage} />
          <span className="po-title" dangerouslySetInnerHTML={{ __html: 'AI<b style="color:var(--orange)">CAPTCHA</b> · 요금제 결제' }}/>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontSize: 11, background: 'var(--peach)', color: 'var(--orange-2)', padding: '4px 10px', borderRadius: 999, fontWeight: 600 }}>TEST MODE · 실제 결제 없음</span>
          </div>
        </div>
        <PlanPayPage planName={planPayArgs.plan} closePage={closePage} openPage={openPage} openMypageOnApiKey={openMypageOnApiKey} />
      </div>
    </>
  );
}
