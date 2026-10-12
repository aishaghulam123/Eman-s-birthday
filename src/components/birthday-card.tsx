import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Heart, Sparkles, ArrowDown, ArrowRight, X, Star } from "lucide-react";
import { Button } from "./ui/button";
import { birthdayContent } from "../lib/birthday-content";
import cakeImage from "../assets/birthday-cake.jpg";

type GiftStage = "closed" | "unwrapping" | "envelope" | "unsealing" | "read";

const STARS = [
  [6, 12, 0], [14, 34, 1.2], [23, 8, 0.6], [31, 52, 2], [44, 16, 0.3], [52, 40, 1.6], [63, 10, 0.9],
  [71, 46, 2.4], [80, 18, 0.4], [88, 38, 1.9], [94, 9, 1.1], [10, 62, 1.4], [90, 66, 0.2], [48, 70, 2.1],
] as const;
const CONFETTI_COLORS = ["#f4a6b8", "#f6dc9b", "#ecb8e0", "#f8cfa8", "#ffffff"] as const;
const INTRO_BALLOONS = [[6, 0, "#f4a6b8", 1], [20, 0.5, "#f8cfa8", .8], [36, 0.2, "#ecb8e0", 1.1], [58, 0.7, "#f6dc9b", .85], [74, 0.3, "#f4a6b8", 1], [89, 0.9, "#ecb8e0", .8]] as const;
const DRIFTERS = [8, 19, 31, 44, 57, 69, 81, 92] as const;

function Bow({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 100 105" aria-hidden="true" className={`bow ${className}`}><path className="bow-fill" d="M43 47C28 61 21 78 15 89l20-5 7 15 13-47M57 47c15 14 22 31 28 42l-20-5-7 15-13-47"/><path className="bow-fill" d="M45 40C23 13 7 17 9 34c1 19 20 22 37 13M55 40c22-27 38-23 36-6-1 19-20 22-37 13"/><path className="bow-fold" d="M14 29c12-1 24 9 31 15M86 29C74 28 62 38 55 44M43 51L29 83M57 51l14 32"/><rect x="43" y="36" width="14" height="18" rx="5" className="bow-fill"/></svg>;
}
function Flower({ className }: { className: string }) {
  return <svg viewBox="0 0 80 80" className={`decoration flower ${className}`} aria-hidden="true"><g className="flower-petal">{[0,60,120,180,240,300].map(angle => <ellipse key={angle} cx="40" cy="23" rx="10" ry="16" transform={`rotate(${angle} 40 40)`}/>)}</g><circle className="flower-center" cx="40" cy="40" r="7"/></svg>;
}
function Crown({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 120 70" aria-hidden="true" className={`crown ${className}`}><defs><linearGradient id="gold-foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6dc9b"/><stop offset=".5" stopColor="#d9a94f"/><stop offset="1" stopColor="#f3d488"/></linearGradient></defs><path d="M12 58 6 18l30 24 24-34 24 34 30-24-6 40z" fill="url(#gold-foil)" stroke="#b98a35" strokeWidth="1.5" strokeLinejoin="round"/><rect x="12" y="58" width="96" height="8" rx="4" fill="url(#gold-foil)" stroke="#b98a35" strokeWidth="1.5"/><circle cx="6" cy="16" r="5" fill="#f4a6b8"/><circle cx="60" cy="6" r="5.5" fill="#f4a6b8"/><circle cx="114" cy="16" r="5" fill="#f4a6b8"/><circle cx="36" cy="62" r="2.4" fill="#fff"/><circle cx="60" cy="62" r="2.4" fill="#fff"/><circle cx="84" cy="62" r="2.4" fill="#fff"/></svg>;
}
function Balloon({ className, tint }: { className: string; tint: string }) {
  return <svg viewBox="0 0 60 120" aria-hidden="true" className={`decoration balloon ${className}`}><path d={`M30 4C13 4 5 20 7 35c2 17 15 27 23 30 8-3 21-13 23-30C55 20 47 4 30 4z`} fill={tint} opacity=".92"/><path d="M18 14c-6 5-8 13-7 20" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6"/><path d="M26 66h8l-4 6z" fill={tint}/><path d="M30 72c-6 14 6 22 0 46" stroke="var(--ribbon)" strokeWidth="1.2" fill="none"/></svg>;
}
function Teddy({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 120 120" aria-hidden="true" className={`teddy ${className}`}><circle cx="26" cy="28" r="18" fill="#e8b98a"/><circle cx="94" cy="28" r="18" fill="#e8b98a"/><circle cx="26" cy="28" r="9" fill="#f6d5ba"/><circle cx="94" cy="28" r="9" fill="#f6d5ba"/><circle cx="60" cy="64" r="44" fill="#e8b98a"/><ellipse cx="60" cy="78" rx="19" ry="15" fill="#f6d5ba"/><ellipse cx="60" cy="71" rx="6.5" ry="4.5" fill="#6b3f35"/><path d="M60 75v6m0 0c-4 4-9 3-11 0m11 0c4 4 9 3 11 0" stroke="#6b3f35" strokeWidth="2" fill="none" strokeLinecap="round"/><circle className="teddy-eye" cx="43" cy="56" r="4.5" fill="#4a2a24"/><circle className="teddy-eye" cx="77" cy="56" r="4.5" fill="#4a2a24"/><circle cx="44.5" cy="54.5" r="1.4" fill="#fff"/><circle cx="78.5" cy="54.5" r="1.4" fill="#fff"/><circle cx="32" cy="72" r="6" fill="#f5a3b5" opacity=".6"/><circle cx="88" cy="72" r="6" fill="#f5a3b5" opacity=".6"/><path d="M60 108c-8 0-14 5-22 8l8-12zM60 108c8 0 14 5 22 8l-8-12z" fill="#f4a6b8" stroke="#d9758f" strokeWidth="1.2"/><circle cx="60" cy="108" r="5" fill="#f4a6b8" stroke="#d9758f" strokeWidth="1.2"/></svg>;
}

export function BirthdayCard() {
  const content = birthdayContent;
  const [modal, setModal] = useState<"wish" | "letter" | null>(null);
  const [wished, setWished] = useState(false);
  const [burst, setBurst] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [stage, setStage] = useState<GiftStage>("closed");
  const [intro, setIntro] = useState<"playing" | "opening" | "done">("playing");
  const introTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => () => {
    introTimers.current.forEach(clearTimeout);
    if (burstTimer.current) clearTimeout(burstTimer.current);
    if (stageTimer.current) clearTimeout(stageTimer.current);
  }, []);

  useEffect(() => {
    if (!modal) return;
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const controls = () => dialog?.querySelectorAll<HTMLElement>('button, [tabindex="0"]');
    controls()?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
      if (event.key !== "Tab") return;
      const items = controls();
      if (!items?.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", onKey); triggerRef.current?.focus(); };
  }, [modal]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    introTimers.current.push(setTimeout(startReveal, reduced ? 200 : 4600));
    return () => introTimers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (intro === "done") return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = old; };
  }, [intro]);

  function startReveal() {
    introTimers.current.forEach(clearTimeout);
    setIntro("opening");
    introTimers.current = [setTimeout(() => setIntro("done"), 1500)];
  }

  function showHearts(duration = 5500) {
    setBurst(true); setBurstKey(k => k + 1);
    if (burstTimer.current) clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => setBurst(false), duration);
  }
  function sendWish() { setWished(true); showHearts(); }

  function openGift() {
    if (stage !== "closed") return;
    setStage("unwrapping");
    showHearts(4200);
    if (stageTimer.current) clearTimeout(stageTimer.current);
    stageTimer.current = setTimeout(() => setStage("envelope"), 1250);
  }
  function openEnvelope() {
    if (stage === "read") { setModal("letter"); return; }
    if (stage !== "envelope") return;
    setStage("unsealing");
    if (stageTimer.current) clearTimeout(stageTimer.current);
    stageTimer.current = setTimeout(() => { setStage("read"); setModal("letter"); showHearts(4200); }, 1700);
  }
  function goToGift() {
    setModal(null);
    document.getElementById("love-letter")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  const envelopeOpen = stage === "unsealing" || stage === "read";
  const hint = stage === "closed" ? "Tap the gift" : stage === "envelope" ? "Now tap the envelope" : stage === "read" ? "Tap to read it again" : "";

  return <main className={`birthday-page ${intro === "playing" ? "intro-on" : ""}`}>
    {intro !== "done" && <div className={`intro ${intro === "opening" ? "is-opening" : ""}`} role="dialog" aria-label="Welcome">
      <div className="intro-curtain intro-left" aria-hidden="true"/><div className="intro-curtain intro-right" aria-hidden="true"/>
      <div className="intro-fx" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => <i key={i} className="confetti" style={{ left: `${(i * 37) % 100}%`, "--c": CONFETTI_COLORS[i % 5], "--d": `${3.6 + (i % 5) * 0.5}s`, "--dl": `${(i % 8) * 0.28}s`, "--r": `${(i * 53) % 360}deg` } as CSSProperties}/>)}
        {INTRO_BALLOONS.map(([x, d, c, k], i) => <div key={i} className="intro-balloon" style={{ left: `${x}%`, animationDelay: `${d + 0.2}s`, scale: String(k) }}><Balloon className="" tint={c}/></div>)}
      </div>
      <div className="intro-content">
        <p className="intro-line intro-line-1">Something magical is happening today<span className="dots">…</span></p>
        <div className="intro-reveal">
          <Crown className="intro-crown"/>
          <div className="intro-name">Eman</div>
          <p className="intro-sub"><Heart/>is turning six!<Heart/></p>
        </div>
      </div>
      <button type="button" className="intro-skip" onClick={startReveal}>Skip</button>
    </div>}
    <div className="twinkle-layer" aria-hidden="true">{STARS.map(([x, y, d], i) => <Star key={i} className="twinkle" style={{ left: `${x}%`, top: `${y * 6}px`, animationDelay: `${d}s` }}/>)}</div>
    <div className="drift-layer" aria-hidden="true">{DRIFTERS.map((x, i) => <span key={x} className="drifter" style={{ left: `${x}%`, animationDelay: `${i * 1.7}s`, animationDuration: `${13 + (i % 3) * 3}s` }}/>)}</div>
    <header className="card-header">
      <div className="brand"><Bow/><span>A little love from Aisha</span></div>
    </header>
    <section className="birthday-hero" aria-label="Your birthday greeting">
      <Balloon className="decor-balloon-left balloon-sway" tint="#f4a6b8"/><Balloon className="decor-balloon-right balloon-sway-slow" tint="#f8cfa8"/><Balloon className="decor-balloon-left-2 balloon-sway-slow" tint="#ecb8e0"/>
      <Bow className="decoration decor-bow-left float"/><Bow className="decoration decor-bow-right float-slow"/>
      <Heart className="decoration decor-heart heart-one float" aria-hidden="true"/><Heart className="decoration decor-heart heart-two float-slow" aria-hidden="true"/><Heart className="decoration decor-heart heart-three float" aria-hidden="true"/>
      <Sparkles className="decoration sparkle sparkle-one float" aria-hidden="true"/><Sparkles className="decoration sparkle sparkle-two float-slow" aria-hidden="true"/><Sparkles className="decoration sparkle sparkle-three float" aria-hidden="true"/>
      <Flower className="flower-one float-slow"/><Flower className="flower-two float"/>
      <div className="enter"><div className="eyebrow"><Sparkles/>For the sweetest little girl<Sparkles/></div>
      <h1 className="birthday-title"><span className="title-heading">{content.heading}</span><span className="title-name"><Crown className="crown-float"/><span className="name-shimmer">{content.name}</span></span><span className="title-sub">{content.title}</span></h1></div>
      <p className="hero-intro enter enter-delay">{content.intro}</p>
      <div className="cake-scene cake-reveal"><div className="cake-glow" aria-hidden="true"/><img className="cake-image" src={cakeImage} alt="A beautiful pink birthday cake with bows, flowers, and six glowing candles" width={1024} height={1024} fetchPriority="high"/><div className="cake-caption">Six candles. A million wishes. ♡</div></div>
      <div className="wish-area enter enter-delay"><Button variant="birthday" onClick={() => { setWished(false); setModal("wish"); }}><Sparkles/>Make a little wish<ArrowRight/></Button><p className="wish-helper"><Heart/>A little birthday magic, just for you</p></div>
      <a className="scroll-note" href="#love-letter">A surprise from Aisha<ArrowDown/></a>
    </section>
    <section id="love-letter" className="gift-section" aria-label="A surprise for Eman">
      <div className="gift-inner">
        <div className="letter-top"><Bow/></div>
        <p className="letter-eyebrow">Wrapped in love & tied with a bow</p>
        <h2 className="gift-title">A little surprise is waiting for you, {content.name} <span aria-hidden="true">💗</span></h2>
        <div className="gift-stage">
          <Teddy className="stage-teddy"/>
          {(stage === "closed" || stage === "unwrapping") && <button type="button" className={`gift ${stage === "unwrapping" ? "is-opening" : "is-waiting"}`} onClick={openGift} aria-label="Open the gift">
            <span className="gift-shadow" aria-hidden="true"/>
            <span className="gift-body" aria-hidden="true"><span className="gift-band"/></span>
            <span className="gift-lid" aria-hidden="true"><span className="gift-band"/><Bow className="gift-bow"/></span>
            {stage === "unwrapping" && <span className="spark-ring" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ "--a": `${i * 36}deg` } as CSSProperties}/>)}</span>}
          </button>}
          {(stage === "envelope" || stage === "unsealing" || stage === "read") && <button type="button" className={`envelope ${envelopeOpen ? "is-open" : "is-closed"}`} onClick={openEnvelope} aria-label={stage === "read" ? "Read the note again" : "Open the envelope"}>
            <span className="env-back" aria-hidden="true"/>
            <span className="env-paper" aria-hidden="true"><i/><i/><i/><i/></span>
            <span className="env-front" aria-hidden="true"/>
            <span className="env-flap" aria-hidden="true"/>
            <span className="env-seal" aria-hidden="true"><Heart/></span>
          </button>}
        </div>
        <p className="gift-hint" aria-live="polite">{hint}{hint && <Heart/>}</p>
      </div>
    </section>
    <footer className="card-footer">Made with <Heart aria-hidden="true"/> & a little birthday magic · Just for you</footer>
    {burst && <div key={burstKey} className="heart-burst" aria-hidden="true">{Array.from({length: 18}, (_, i) => <Heart key={i}/>)}</div>}
    {modal && <div className="modal-backdrop" onClick={event => { if (event.target === event.currentTarget) setModal(null); }}><div ref={dialogRef} className={`birthday-modal ${modal === "letter" ? "letter-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <Button className="modal-close" variant="ghost" size="icon" aria-label="Close" onClick={() => setModal(null)}><X/></Button>
      {modal === "wish"
        ? <><Sparkles className="modal-icon"/><h2 id="modal-title" className="modal-title">{wished ? "Your wish is on its way!" : "A wish just for you"}</h2><p className="modal-copy" aria-live="polite">{wished ? `May Allah accept your dua and fill your life with a whole lot of happiness, love, and endless blessings. Happy birthday, ${content.name}! 💗` : "Close your eyes, think of something wonderful, and make a beautiful dua to Allah. ✨. ✨"}</p><Button variant="birthday" onClick={wished ? goToGift : sendWish}>{wished ? <Heart/> : <Sparkles/>}{wished ? "Open your surprise gift" : "Send my wish"}<ArrowRight/></Button></>
        : <><div className="letter-seal reveal-line" style={{ animationDelay: ".1s" }}><Bow/></div>
          <p className="letter-kicker reveal-line" style={{ animationDelay: ".25s" }}>A note from my heart</p>
          <h2 id="modal-title" className="letter-title reveal-line" style={{ animationDelay: ".45s" }}>To little sunshine, {content.name} <span aria-hidden="true">💗</span></h2>
          <p className="letter-message reveal-line" style={{ animationDelay: ".75s" }}>{content.message}</p>
          <div className="letter-sign reveal-line" style={{ animationDelay: "1.15s" }}><span className="sign-closing">{content.closing}</span><span className="sign-name">{content.from} <span aria-hidden="true">🎀</span></span></div>
          <Heart className="letter-heart reveal-line" style={{ animationDelay: "1.45s" }} aria-hidden="true"/></>}
    </div></div>}
  </main>;
}
