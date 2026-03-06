/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Menu, X, BarChart3, Target, Zap, Users, Lightbulb, TrendingUp, Star, Quote } from 'lucide-react';

// --- Helpers ---

const CountUp = ({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const current = Math.floor(easeProgress * (to - from) + from);
      node.textContent = current.toLocaleString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span ref={nodeRef} />;
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-end gap-2 text-3xl font-bold tracking-tighter z-50 relative font-sans group">
          <span>INNO<span className="text-[var(--accent)]">UP</span></span>
          <span className="text-xs font-medium text-white/60 mb-1 tracking-widest group-hover:text-white transition-colors">Marketing & Design</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('philosophy')} className="text-sm font-medium hover:text-[var(--accent)] text-white/80 transition-colors">철학</button>
          <button onClick={() => scrollTo('process')} className="text-sm font-medium hover:text-[var(--accent)] text-white/80 transition-colors">프로세스</button>
          <button onClick={() => scrollTo('services')} className="text-sm font-medium hover:text-[var(--accent)] text-white/80 transition-colors">서비스</button>
          <button onClick={() => scrollTo('contact')} className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
            무료 진단 신청
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8"
            >
              <button onClick={() => scrollTo('philosophy')} className="text-2xl font-bold">철학</button>
              <button onClick={() => scrollTo('process')} className="text-2xl font-bold">프로세스</button>
              <button onClick={() => scrollTo('services')} className="text-2xl font-bold">서비스</button>
              <button onClick={() => scrollTo('contact')} className="text-2xl font-bold text-[var(--accent)]">문의하기</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Geometric Background with Overlay */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        {/* Static Grid - Enhanced Visibility */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-40" />
        
        {/* Moving Diagonal Lines - More Visible */}
        <motion.div 
          animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(255,255,255,0.2)_40px,rgba(255,255,255,0.2)_42px)]"
        />

        {/* Lighter Gradient Overlay to reveal patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-[var(--accent)] rounded-full opacity-[0.15] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex flex-col items-center gap-1 mb-10 relative group"
          >
            <span className="text-lg md:text-xl font-bold tracking-wider text-white relative z-10 px-2">
              이노업마케팅 10년차 마케팅&디자인 전문가
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              className="h-1 bg-[var(--accent)] w-full rounded-full shadow-[0_0_10px_var(--accent)]"
            />
          </motion.div>

          <h1 className="text-display mb-8 leading-relaxed">
            <motion.span variants={itemVariants} className="block font-bold mb-2">
              단순한 광고가 아닌
            </motion.span>
            <motion.span variants={itemVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 pb-2">
              <span className="text-[var(--accent)]">혁신</span>을 쌓아올립니다
            </motion.span>
          </h1>

          <motion.p 
            variants={itemVariants}
            className="text-body max-w-2xl mx-auto mb-12 text-white/90 font-medium"
          >
            수치상의 성공을 넘어 고객이 브랜드를 사랑하게 만드는 힘.<br className="hidden sm:block" />
            이노업마케팅이 당신만의 '진짜 이야기'를 찾아드립니다.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })} className="group relative px-8 py-4 bg-[var(--accent)] text-white font-bold rounded-full overflow-hidden shadow-[0_0_40px_-10px_var(--accent)] hover:shadow-[0_0_60px_-10px_var(--accent)] transition-shadow duration-500">
              <span className="relative z-10 flex items-center gap-2">
                내 브랜드 진단하기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors text-sm font-bold">
              서비스 알아보기
            </button>
            <a 
              href="https://blog.naver.com/marketer_bomgyeol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105 transform duration-200"
            >
              공식 블로그 <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ChevronDown />
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-8 border-y border-white/10 bg-black overflow-hidden relative z-20">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-16"
      >
        {[...Array(2)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--accent)] to-white animate-gradient-x">
            STRATEGY • CREATIVE • DESIGN • DATA • GROWTH • INNOVATION • BRANDING •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-32 px-6 relative bg-white text-black">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[var(--accent)] font-bold tracking-widest text-xs mb-4 block">OUR PHILOSOPHY</span>
            <h2 className="text-h2 mb-8 leading-tight text-black">
              이노업은<br/>
              단순 대행사가 아닌<br/>
              <span className="text-[var(--accent)]">성장 파트너</span>입니다.
            </h2>
            <p className="text-body mb-8 text-zinc-600 font-medium">
              시끄러운 세상 속에서, 우리는 신호를 만듭니다. 더 크게 소리치는 것이 아니라, 더 명확하게 전달하는 것이 진정한 마케팅이라고 믿습니다. 데이터 사이언스의 정밀함과 하이엔드 디자인의 예술성을 결합하여 브랜드의 성장을 견인합니다.
            </p>
            
            {/* Infographic-style Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-[var(--accent)] text-white shadow-lg relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 text-white flex items-center">
                  <CountUp from={0} to={200} />+
                </div>
                <div className="text-sm text-white/80 font-medium">누적 클라이언트</div>
                <div className="w-full bg-black/20 h-1 mt-4 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-white"
                  />
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-[var(--accent)] text-white shadow-lg relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 text-white flex items-center">
                  <CountUp from={0} to={10} />Y
                </div>
                <div className="text-sm text-white/80 font-medium">경력 및 노하우</div>
                 <div className="w-full bg-black/20 h-1 mt-4 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                    className="h-full bg-white"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Visual Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 mt-12"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group shadow-2xl">
                 <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" 
                  alt="Strategy" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                  <span className="font-bold text-lg text-white">전략 기획</span>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-black text-white flex flex-col justify-between h-40 shadow-xl">
                <Lightbulb className="w-8 h-8 text-[var(--accent)]" />
                <span className="font-bold">창의적<br/>솔루션</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-2xl bg-white text-[var(--accent)] flex flex-col justify-between h-40 shadow-xl border border-zinc-100">
                <BarChart3 className="w-8 h-8" />
                <span className="font-bold text-black">데이터<br/>분석</span>
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
                  alt="Analytics" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                  <span className="font-bold text-lg text-white">성과 최적화</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { num: "01", title: "진단", desc: "브랜드 현황 및 경쟁사 심층 분석" },
    { num: "02", title: "전략", desc: "데이터 기반 맞춤형 로드맵 수립" },
    { num: "03", title: "실행", desc: "고퀄리티 콘텐츠 제작 및 채널 배포" },
    { num: "04", title: "최적화", desc: "성과 분석을 통한 지속적 개선" },
  ];

  return (
    <section id="process" className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-[var(--accent)] font-bold tracking-widest text-xs mb-4 block">WORK PROCESS</span>
          <h2 className="text-h2">체계적인 성장 시스템</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-white/10 z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-[var(--accent)] origin-left"
            />
          </div>
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10"
            >
              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "var(--accent)" }}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`w-24 h-24 rounded-full bg-[#111] border ${activeStep === i ? 'border-[var(--accent)] scale-110' : 'border-white/10'} flex items-center justify-center mb-8 mx-auto relative group transition-all cursor-pointer`}
              >
                <div className={`absolute inset-0 rounded-full border border-[var(--accent)] transition-opacity duration-500 ${activeStep === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                <span className={`text-2xl font-bold transition-colors ${activeStep === i ? 'text-[var(--accent)]' : 'text-white/30 group-hover:text-[var(--accent)]'}`}>{step.num}</span>
              </motion.div>
              <motion.div 
                className="text-center origin-top"
                animate={{ scale: activeStep === i ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${activeStep === i ? 'text-[var(--accent)]' : 'text-white'}`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${activeStep === i ? 'text-white font-medium' : 'text-white/50'}`}>{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "브랜드 마케팅",
      desc: "브랜드 아이덴티티 정립부터 스토리텔링까지, 고객의 뇌리에 박히는 브랜드를 만듭니다.",
      tags: ["BI/CI", "슬로건", "브랜드 스토리"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "바이럴 & SEO",
      desc: "검색 결과 상위 노출과 자연스러운 입소문으로 진성 고객을 유입시킵니다.",
      tags: ["블로그", "카페", "언론홍보"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "디자인",
      desc: "고객의 시선을 사로잡는 홈페이지형 블로그와 전환율 높은 랜딩페이지를 제작합니다.",
      tags: ["홈페이지형 블로그", "랜딩페이지", "상세페이지"]
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-white relative">
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-[var(--accent)] font-bold tracking-widest text-xs mb-4 block">OUR SERVICES</span>
            <h2 className="text-h2 text-black">통합 마케팅 솔루션</h2>
          </div>
          <p className="text-zinc-600 max-w-md pb-2 font-medium">
            단편적인 실행이 아닌, 브랜드의 단계와 목표에 맞는<br/>최적의 마케팅 믹스를 제안합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(255, 0, 92, 0.25)" }}
              className="bg-[var(--accent)] p-10 rounded-3xl shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none group-hover:scale-150 transition-transform duration-700">
                {s.icon}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 text-[var(--accent)] shadow-lg">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{s.title}</h3>
              <p className="text-white/80 mb-8 leading-relaxed h-20">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t, j) => (
                  <span key={j} className="text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">
                    #{t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      name: "박순용 원장",
      company: "M 수학교습소",
      content: "학원 홍보는 신뢰가 생명인데, 원장인 저의 교육 철학을 진정성 있게 담아주셨습니다. 덕분에 상담 문의가 3배 이상 늘었고, 대기 학생까지 생겼습니다.",
      rating: 5
    },
    {
      name: "정우진 대표",
      company: "E 인테리어 디자인",
      content: "포트폴리오는 좋았지만 마케팅이 막막했습니다. 이노업의 전략 덕분에 고가 시공 계약이 꾸준히 들어오고 있습니다. 단순 문의가 아닌 '진성 고객'이 찾아옵니다.",
      rating: 5
    },
    {
      name: "강민수 소장",
      company: "F 공인중개사사무소",
      content: "지역 내 경쟁이 치열해 고민이었는데, 블로그와 플레이스 상위 노출로 지역 1등 부동산으로 자리 잡았습니다. 젊은 신혼부부 손님이 눈에 띄게 늘었습니다.",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-32 px-6 bg-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-[var(--accent)] font-bold tracking-widest text-xs mb-4 block">SUCCESS STORIES</span>
          <h2 className="text-h2 text-black">증명된 성과</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-8 rounded-3xl border border-pink-200 shadow-xl relative group hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-[var(--accent)]/10 group-hover:text-[var(--accent)]/20 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-[var(--accent)] text-[var(--accent)]" />
                ))}
              </div>
              <p className="text-zinc-700 mb-8 leading-relaxed min-h-[100px] font-medium">
                "{review.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[var(--accent)] font-bold text-lg border border-pink-100">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-black">{review.name}</h4>
                  <p className="text-xs text-zinc-500">{review.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      q: "현재 가장 큰 고민은 무엇인가요?",
      opts: ["신규 고객 유입 부족", "낮은 구매 전환율", "브랜드 인지도 미비"]
    },
    {
      q: "주로 활용 중인 채널은?",
      opts: ["검색광고 (네이버/구글)", "SNS (인스타/유튜브)", "없음 / 오프라인 위주"]
    },
    {
      q: "월 마케팅 예산 규모는?",
      opts: ["100만원 미만", "100~500만원", "500만원 이상"]
    }
  ];

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const type = newAnswers[0] === 0 ? "트래픽 부스터형" : newAnswers[0] === 1 ? "전환 최적화형" : "브랜딩 빌드업형";
      setResult({
        type,
        desc: "귀사의 상황에 딱 맞는 맞춤형 전략 보고서를 준비했습니다."
      });
    }
  };

  return (
    <section id="quiz" className="py-32 px-6 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-diagonal-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[var(--accent)] font-bold tracking-widest text-xs mb-4 block">DIAGNOSIS</span>
          <h2 className="text-h2 text-white">내 브랜드 진단하기</h2>
          <p className="text-white/60 mt-4">3가지 질문으로 우리 브랜드에 필요한 전략을 확인해보세요.</p>
        </div>

        <div className="bg-zinc-900 p-8 md:p-12 rounded-3xl min-h-[400px] flex items-center justify-center relative border border-zinc-800 shadow-2xl">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-8 text-sm text-zinc-400 font-mono">
                  <span>STEP {step + 1} / {questions.length}</span>
                  <div className="flex gap-2">
                    {questions.map((_, i) => (
                      <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? 'bg-[var(--accent)]' : 'bg-zinc-700'}`} />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug text-white">{questions[step].q}</h3>
                <p className="text-[var(--accent)] text-sm font-bold mb-8 animate-pulse">
                  👇 아래 옵션을 선택하여 진단을 진행해주세요
                </p>
                
                <div className="grid gap-4">
                  {questions[step].opts.map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left p-6 rounded-xl bg-white text-black hover:bg-[var(--accent)] hover:text-white transition-all group flex justify-between items-center shadow-md hover:shadow-xl hover:-translate-y-1 duration-300"
                    >
                      <span className="font-bold text-lg">{opt}</span>
                      <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--accent)] to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[var(--accent)]/30">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-sm text-[var(--accent)] font-bold tracking-widest mb-4">DIAGNOSIS COMPLETE</h3>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">당신의 브랜드 유형은<br/>"<span className="text-[var(--accent)]">{result.type}</span>" 입니다</h2>
                <p className="text-zinc-400 mb-10 max-w-md mx-auto">{result.desc}</p>
                
                {/* Visual Chart Representation */}
                <div className="flex justify-center items-end gap-4 h-32 mb-10 opacity-80">
                  <div className="w-8 bg-zinc-700 rounded-t-lg h-[40%]" />
                  <div className="w-8 bg-zinc-700 rounded-t-lg h-[60%]" />
                  <div className="w-8 bg-[var(--accent)] rounded-t-lg h-[100%] shadow-[0_0_20px_var(--accent)]" />
                  <div className="w-8 bg-zinc-700 rounded-t-lg h-[70%]" />
                  <div className="w-8 bg-zinc-700 rounded-t-lg h-[50%]" />
                </div>

                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-[var(--accent)] hover:text-white transition-all shadow-lg hover:shadow-[var(--accent)]/50">
                  상세 리포트 무료로 받기
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      createdAt: serverTimestamp(),
      status: 'new'
    };

    try {
      await addDoc(collection(db, 'contacts'), data);
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
      setErrorMessage('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        <div>
          <span className="text-[var(--accent)] font-bold tracking-widest text-xs mb-4 block">CONTACT US</span>
          <h2 className="text-h2 mb-6 text-black">혁신을 시작하세요</h2>
          <p className="text-body mb-12 text-zinc-600 font-medium">
            아래 양식을 작성해주시면, 24시간 이내에 브랜드 분석 결과와 함께 연락드립니다.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start p-6 rounded-2xl bg-[var(--accent)] shadow-lg text-white">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--accent)] font-bold text-xl shrink-0 shadow-md">1</div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-white">24시간 응답 보장</h4>
                <p className="text-white/80 text-sm">기다림은 비즈니스의 적입니다. 영업일 기준 24시간 내에 반드시 회신합니다.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start p-6 rounded-2xl bg-[var(--accent)] shadow-lg text-white">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--accent)] font-bold text-xl shrink-0 shadow-md">2</div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-white">맞춤형 전략 제안</h4>
                <p className="text-white/80 text-sm">템플릿 복사/붙여넣기가 아닌, 귀사만을 위한 구체적인 실행 전략을 제안합니다.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl border border-zinc-100 shadow-2xl">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-200">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-black">신청이 완료되었습니다</h3>
              <p className="text-zinc-500">담당자가 검토 후 빠르게 연락드리겠습니다.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 px-6 py-3 bg-zinc-100 text-zinc-600 rounded-full hover:bg-zinc-200 transition-colors text-sm font-bold"
              >
                추가 문의하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">성함</label>
                  <input required name="name" type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 focus:border-[var(--accent)] focus:bg-white focus:outline-none transition-all text-black placeholder-zinc-400" placeholder="홍길동" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">업체명</label>
                  <input required name="company" type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 focus:border-[var(--accent)] focus:bg-white focus:outline-none transition-all text-black placeholder-zinc-400" placeholder="이노업마케팅" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">연락처</label>
                <input required name="phone" type="tel" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 focus:border-[var(--accent)] focus:bg-white focus:outline-none transition-all text-black placeholder-zinc-400" placeholder="010-0000-0000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">고민 내용</label>
                <textarea required name="message" rows={4} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 focus:border-[var(--accent)] focus:bg-white focus:outline-none transition-all resize-none text-black placeholder-zinc-400" placeholder="현재 마케팅의 가장 큰 고민은 무엇인가요?"></textarea>
              </div>
              
              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100">
                  {errorMessage}
                </div>
              )}

              <button disabled={status === 'submitting'} type="submit" className="w-full py-5 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                {status === 'submitting' ? '전송 중...' : '무료 진단 신청하기'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <a href="#" className="text-3xl font-bold tracking-tighter mb-6 block font-sans group">
            INNO<span className="text-[var(--accent)]">UP</span> <span className="text-sm font-normal text-white/60 ml-2 tracking-widest group-hover:text-white transition-colors">Marketing & Design</span>
          </a>
          <p className="text-white/40 max-w-xs text-sm leading-relaxed">
            데이터와 크리에이티브의 결합으로<br/>
            브랜드의 새로운 가치를 창조합니다.<br/>
            010-3034-3334
          </p>
        </div>
        <div className="flex gap-16">
          <div>
            <h4 className="font-bold mb-6 text-white">Socials</h4>
            <div className="flex flex-col gap-4 text-sm text-white/60">
              <a href="#" className="hover:text-[var(--accent)] transition-colors">Instagram</a>
              <a href="https://blog.naver.com/marketer_bomgyeol" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">Blog</a>
              <a href="#" className="hover:text-[var(--accent)] transition-colors">YouTube</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Legal</h4>
            <div className="flex flex-col gap-4 text-sm text-white/60">
              <a href="#" className="hover:text-[var(--accent)] transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-[var(--accent)] transition-colors">이용약관</a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-white/20 text-xs flex justify-between items-center">
        <span>© 2026 InnoUp Marketing. All rights reserved.</span>
        <Link to="/admin" className="text-zinc-600 hover:text-white transition-colors">Admin Login</Link>
      </div>
    </footer>
  );
};

function Home() {
  return (
    <div className="bg-[var(--bg-color)] text-white min-h-screen selection:bg-[var(--accent)] selection:text-white font-sans">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Marquee />
      <Philosophy />
      <Process />
      <Services />
      <Reviews />
      <Quiz />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}
