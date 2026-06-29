import React, { useState, useCallback, useRef } from 'react';

/* ── SVG Glyphs ── */
const GLYPHS = {
  radish: (
    <svg viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="30" r="11" fill="#F4F0E8" stroke="#241B15" strokeWidth="2"/>
      <path d="M24 19c1-4 4-7 8-8-1 4-4 7-8 8Zm0 0c-1-4-4-7-8-8 1 4 4 7 8 8Z" fill="#7FB069"/>
      <path d="M24 19v-9" stroke="#7FB069" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  banana: (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M10 13c2 13 11 23 26 24-3 4-9 6-15 4C12 38 7 27 9 15c0-1 1-2 1-2Z" fill="#F4A62A" stroke="#241B15" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M10 13c-1-2 0-4 2-4" stroke="#241B15" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  carrot: (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M12 36 31 17l-1 9 8-2-20 19c-2 2-6 1-7-2-1-2 0-4 1-5Z" fill="#F0691E" stroke="#241B15" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M31 17c1-4 4-6 8-6m-8 6c0-4-2-7-5-8m5 8c4-1 6 1 7 4" stroke="#7FB069" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  pumpkin: (
    <svg viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="29" rx="15" ry="12" fill="#F0691E" stroke="#241B15" strokeWidth="2"/>
      <path d="M24 18v22M16 19c-3 4-3 16 0 21M32 19c3 4 3 16 0 21" stroke="#241B15" strokeWidth="1.6"/>
      <path d="M24 17c0-3 2-5 5-5" stroke="#7FB069" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const POOL = [
  { key: 'radish',  name: '무',    correct: false },
  { key: 'banana',  name: '바나나', correct: true  },
  { key: 'carrot',  name: '당근',  correct: false },
  { key: 'pumpkin', name: '호박',  correct: false },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ══════════════════════════════════════
   유형 1 — 4지선다 클릭
══════════════════════════════════════ */
function CaptchaType1() {
  const [tiles, setTiles] = useState(() => shuffle(POOL));
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // null | 'ok' | 'bad'
  const [token, setToken] = useState('');

  const reset = () => {
    setTiles(shuffle(POOL));
    setSelected(null);
    setResult(null);
    setToken('');
  };

  const pick = (tile) => {
    if (result === 'ok') return;
    setSelected(tile.key);
    if (tile.correct) {
      const tok = 'aicap_' + Math.random().toString(36).slice(2, 8).toUpperCase();
      setToken(tok);
      setResult('ok');
    } else {
      setResult('bad');
      setTimeout(() => { setSelected(null); setResult(null); }, 900);
    }
  };

  return (
    <div className="demo-body">
      <div className="demo-q">
        <span>아래 4개 중 <b style={{ color: 'var(--orange)' }}>바나나</b>를 클릭하세요</span>
      </div>

      <div className="tiles" style={{ marginTop: 16 }}>
        {tiles.map(tile => (
          <button
            key={tile.key}
            className={`tile${selected === tile.key ? ' sel' : ''}`}
            type="button"
            aria-label={tile.name + ' 선택'}
            disabled={result === 'ok'}
            onClick={() => pick(tile)}
            style={result === 'bad' && selected === tile.key ? { borderColor: 'var(--bad)', boxShadow: '0 0 0 3px rgba(216,73,47,.18)' } : {}}
          >
            {GLYPHS[tile.key]}
            <span className="cap">{tile.name}</span>
          </button>
        ))}
      </div>

      <div className="demo-foot">
        <div className={`status${result === 'ok' ? ' ok' : result === 'bad' ? ' bad' : ''}`}>
          {result === 'ok'
            ? <>검증 성공 · 클릭 위치 정상 <span className="token">{token}</span></>
            : result === 'bad'
            ? '바나나가 아니에요. 다시 선택하세요.'
            : '보기 중 정답을 클릭하세요.'}
        </div>
        <button className="reset" onClick={reset}>새로운 문제</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   유형 2 — 드래그-투-타깃
══════════════════════════════════════ */
function CaptchaType2() {
  const [tiles, setTiles] = useState(() => shuffle(POOL));
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const [dropState, setDropState] = useState('idle');
  const [status, setStatus] = useState({ msg: '타일을 끌어다 놓거나, 클릭해서 선택하세요.', cls: '' });
  const [token, setToken] = useState('');
  const [ghost, setGhost] = useState(null);

  const selectedRef = useRef(null);
  const solvedRef = useRef(false);
  selectedRef.current = selected;
  solvedRef.current = solved;

  const reset = useCallback(() => {
    setTiles(shuffle(POOL));
    setSelected(null);
    setSolved(false);
    setDropState('idle');
    setStatus({ msg: '타일을 끌어다 놓거나, 클릭해서 선택하세요.', cls: '' });
    setToken('');
  }, []);

  const selectTile = useCallback((key) => {
    if (solvedRef.current) return;
    setSelected(key);
    setStatus({ msg: '선택됨 — 장바구니를 눌러 담으세요.', cls: '' });
  }, []);

  const submit = useCallback((tileKey) => {
    const tile = POOL.find(t => t.key === tileKey);
    if (!tile) return;
    if (tile.correct) {
      setSolved(true);
      solvedRef.current = true;
      setDropState('done');
      const tok = 'aicap_' + Math.random().toString(36).slice(2, 8).toUpperCase();
      setToken(tok);
      setStatus({ msg: '검증 성공 · 행동 신호 정상', cls: 'ok', tok });
    } else {
      setStatus({ msg: '바나나가 아니에요. 다시 시도해 주세요.', cls: 'bad' });
      setSelected(null);
    }
  }, []);

  const onPointerDown = useCallback((e, key) => {
    if (solvedRef.current) return;
    selectTile(key);
    setGhost({ key, x: e.clientX, y: e.clientY });
    const onMove = (ev) => {
      setGhost({ key, x: ev.clientX, y: ev.clientY });
      const drop = document.getElementById('captcha-drop-t2');
      if (drop) {
        const r = drop.getBoundingClientRect();
        const isOver = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
        setDropState(isOver ? 'hot' : 'idle');
      }
    };
    const onUp = (ev) => {
      window.removeEventListener('pointermove', onMove);
      setGhost(null);
      const drop = document.getElementById('captcha-drop-t2');
      if (drop) {
        const r = drop.getBoundingClientRect();
        const isOver = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
        if (isOver && selectedRef.current) submit(selectedRef.current);
      }
      setDropState(d => d === 'hot' ? 'idle' : d);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
    e.preventDefault();
  }, [selectTile, submit]);

  const dropClass = `drop${dropState === 'hot' ? ' hot' : ''}${dropState === 'done' ? ' done' : ''}`;

  return (
    <div className="demo-body">
      <div className="demo-q">
        <span><b style={{ color: 'var(--orange)' }}>바나나</b>를 장바구니로 드래그하세요</span>
        <span className="drag-ic">DRAG →</span>
      </div>

      <div className="tiles">
        {tiles.map(item => (
          <button
            key={item.key}
            className={`tile${selected === item.key ? ' sel' : ''}`}
            type="button"
            aria-label={item.name + ' 선택'}
            onPointerDown={e => onPointerDown(e, item.key)}
            onClick={() => selectTile(item.key)}
          >
            {GLYPHS[item.key]}
            <span className="cap">{item.name}</span>
          </button>
        ))}
      </div>

      <div className={dropClass} id="captcha-drop-t2" onClick={() => { if (selected && !solved) submit(selected); }}>
        <div className="cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="#F0691E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/>
            <path d="M2.5 3h2l2.2 12.4a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.2L21.5 7H6"/>
          </svg>
        </div>
        <div className="dtxt">
          {dropState === 'done'
            ? <><b style={{ color: 'var(--ok)' }}>사람 확인 완료 ✓</b><span>드래그 궤적 정상 · 토큰 발급됨</span></>
            : <><b>여기로 드롭</b><span>맞는 타일을 장바구니에 담아주세요</span></>}
        </div>
      </div>

      <div className="demo-foot">
        <div className={`status${status.cls ? ' ' + status.cls : ''}`}>
          {status.msg}
          {status.tok && <span className="token">{status.tok}</span>}
        </div>
        <button className="reset" onClick={reset}>새로운 문제</button>
      </div>

      {ghost && (
        <div className="ghost" style={{ left: ghost.x, top: ghost.y, position: 'fixed' }}>
          {GLYPHS[ghost.key]}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   메인 래퍼 — 유형 탭 토글
══════════════════════════════════════ */
export default function CaptchaDemo() {
  const [type, setType] = useState(1);

  return (
    <div className="demo" id="demo">
      <div className="demo-top">
        <div className="dots"><i/><i/><i/></div>
        {/* 유형 탭 */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
          {[1, 2].map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                fontFamily: 'var(--disp)', fontSize: 11, fontWeight: 700,
                letterSpacing: '.1em', padding: '3px 10px', borderRadius: 8,
                border: '1.5px solid',
                borderColor: type === t ? 'var(--orange)' : 'var(--line)',
                background: type === t ? 'var(--orange)' : '#fff',
                color: type === t ? '#fff' : 'var(--muted)',
                cursor: 'pointer', transition: '.15s',
              }}
            >
              유형 {t}
            </button>
          ))}
        </div>
        <span className="tag">{type === 1 ? 'Live demo · 유형 1 선택' : 'Live demo · 유형 2 드래그'}</span>
      </div>

      {type === 1 ? <CaptchaType1 /> : <CaptchaType2 />}
    </div>
  );
}
