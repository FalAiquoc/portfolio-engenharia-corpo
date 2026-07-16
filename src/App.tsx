import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

// Componente de Logotipo Vetorial Industrial / Brutalista (Engrenagem com alter e linhas fortes de engenharia física)
function Logo({ className = "h-10", dark = false }: { className?: string; dark?: boolean }) {
  const accentColor = '#f59e0b'; // Laranja Neon
  const textColor = dark ? '#000000' : '#FFFFFF';

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <svg className="h-full aspect-square overflow-visible" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke={accentColor} strokeWidth="12" strokeLinecap="round">
          {/* Engrenagem externa */}
          <circle cx="100" cy="100" r="75" strokeWidth="16" strokeDasharray="30 20" />
          <circle cx="100" cy="100" r="45" strokeWidth="8" />
          {/* Barra de musculação central */}
          <path d="M 50 100 L 150 100" stroke={accentColor} strokeWidth="16" />
          <rect x="35" y="70" width="15" height="60" fill={accentColor} />
          <rect x="150" y="70" width="15" height="60" fill={accentColor} />
        </g>
      </svg>
      <div className="flex flex-col leading-[0.9] text-left font-display">
        <span className="text-xl font-extrabold tracking-tighter uppercase" style={{ color: textColor }}>ENGENHARIA</span>
        <span className="text-[14px] font-black tracking-[0.25em]" style={{ color: accentColor }}>DO CORPO</span>
        <span className="text-[8px] font-bold tracking-[0.1em] text-slate-400">Templo da Performance</span>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Estado da Grade de Aulas
  const [selectedDay, setSelectedDay] = useState<string>('Segunda');

  // Dados da Grade de Aulas
  const classSchedule: Record<string, Array<{ time: string; name: string; instructor: string }>> = {
    Segunda: [
      { time: '06:00', name: 'Cross Training', instructor: 'Prof. Marcos' },
      { time: '08:00', name: 'Spinning Force', instructor: 'Profª. Ana' },
      { time: '18:30', name: 'Ritmos / Zumba', instructor: 'Prof. Diogo' },
      { time: '20:00', name: 'Power Local', instructor: 'Profª. Carol' }
    ],
    Quarta: [
      { time: '06:00', name: 'Cross Training', instructor: 'Prof. Marcos' },
      { time: '08:30', name: 'Pilates Solo', instructor: 'Profª. Amanda' },
      { time: '18:30', name: 'Fit Dance', instructor: 'Prof. Lucas' },
      { time: '19:30', name: 'Spinning Force', instructor: 'Profª. Ana' }
    ],
    Sexta: [
      { time: '07:00', name: 'Alongamento', instructor: 'Profª. Amanda' },
      { time: '08:00', name: 'Spinning Force', instructor: 'Profª. Ana' },
      { time: '18:00', name: 'Cross Training', instructor: 'Prof. Marcos' },
      { time: '19:00', name: 'Combat Force', instructor: 'Prof. Lucas' }
    ]
  };

  // Estados para a calculadora de IMC
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [imcResult, setImcResult] = useState<number | null>(null);
  const [imcCategory, setImcCategory] = useState<string>('');

  const calculateIMC = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // converter cm para metros
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    const result = w / (h * h);
    setImcResult(result);

    if (result < 18.5) setImcCategory('Abaixo do Peso');
    else if (result < 24.9) setImcCategory('Peso Ideal (Parabéns!)');
    else if (result < 29.9) setImcCategory('Levemente Acima do Peso');
    else setImcCategory('Obesidade (Recomendado acompanhamento médico)');
  };

  // Injeção de fontes e cores
  useEffect(() => {
    if (storeData.typography.importUrl) {
      const linkId = 'store-google-fonts';
      let fontLink = document.getElementById(linkId) as HTMLLinkElement;
      if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = linkId;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
      fontLink.href = storeData.typography.importUrl;
    }

    const root = document.documentElement;
    root.style.setProperty('--font-display-family', storeData.typography.displayFontFamily);
    root.style.setProperty('--font-body-family', storeData.typography.bodyFontFamily);

    // Cores da Academia
    root.style.setProperty('--p-50', '#fff7ed');
    root.style.setProperty('--p-100', '#ffedd5');
    root.style.setProperty('--p-500', storeData.colors.accentHex); // Laranja Neon
    root.style.setProperty('--p-600', '#ea580c');
    root.style.setProperty('--p-700', '#c2410c');
    root.style.setProperty('--p-800', '#9a3412');

    root.style.setProperty('--a-50', '#1c1f26');
    root.style.setProperty('--a-100', '#12141a');
    root.style.setProperty('--a-500', storeData.colors.primaryHex); // Cinza/Preto

    document.title = `${storeData.name} — O Templo da Alta Performance`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = (msg?: string) => {
    const defaultMsg = msg || storeData.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${storeData.whatsappNumber}&text=${encodeURIComponent(defaultMsg)}`;
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-slate-100 antialiased selection:bg-[#f59e0b] selection:text-slate-950">
      
      {/* LETREIRO MARQUEE DESLIZANTE DE INAUGURAÇÃO E AVISOS */}
      <div className="bg-[#f59e0b] text-slate-950 text-[10px] font-black uppercase tracking-widest py-2.5 overflow-hidden relative z-50 border-b border-[#f59e0b]/20">
        <div className="whitespace-nowrap flex space-x-12 animate-marquee">
          <span>⚡ MATRÍCULA GRÁTIS NESTE MÊS • ACESSO ILIMITADO À MUSCULAÇÃO E COLETIVAS!</span>
          <span>🔥 PLANO BLACK A PARTIR DE R$ 79,90 NO CARTÃO RECORRENTE SEM TRAVAR LIMITE!</span>
          <span>💪 MAQUINÁRIO MATRIX E HAMMER STRENGTH DE ÚLTIMA GERAÇÃO EM LAGOA NOVA!</span>
          <span>⚡ MATRÍCULA GRÁTIS NESTE MÊS • ACESSO ILIMITADO À MUSCULAÇÃO E COLETIVAS!</span>
        </div>
      </div>

      {/* TOPBAR */}
      <div className="bg-[#12141a] text-slate-400 text-xs py-2 border-b border-slate-850 relative z-50 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5"><Icon name="Phone" size={13} className="text-[#f59e0b]" /> (84) 99900-1111</span>
            <span className="flex items-center gap-1.5"><Icon name="Flame" size={13} className="text-[#f59e0b]" /> Musculação e Cross Training</span>
            <a href="#localizacao" className="hover:text-white flex items-center gap-1.5 transition-colors"><Icon name="MapPin" size={13} className="text-[#f59e0b]" /> Lagoa Nova, Natal</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#aulas" className="hover:text-white transition-colors font-bold text-slate-300">Grade de Aulas</a>
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-700">
              {storeData.instagramUrl && <a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Instagram" size={14} /></a>}
              {storeData.facebookUrl && <a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Facebook" size={14} /></a>}
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`fixed left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'top-0 bg-[#0c0e12] shadow-lg py-2 border-b border-slate-850' : 'top-0 sm:top-18 bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#hero" className="flex items-center transition-transform hover:scale-101 shrink-0">
              <Logo className="h-10 sm:h-11" />
            </a>
            
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-slate-300">
              <a href="#aulas" className="hover:text-[#f59e0b] transition-colors">Aulas Coletivas</a>
              <a href="#calculadora" className="hover:text-[#f59e0b] transition-colors">Avaliação IMC</a>
              <a href="#planos" className="hover:text-[#f59e0b] transition-colors">Nossos Planos</a>
              <a href="#diferenciais" className="hover:text-[#f59e0b] transition-colors">Infraestrutura</a>
              <a href="#localizacao" className="hover:text-[#f59e0b] transition-colors">Contato</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-950 bg-[#f59e0b] hover:bg-amber-400 transition-all shadow-md shadow-[#f59e0b]/20">
                <Icon name="Flame" className="mr-2" size={14} /> Treinar Agora
              </a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#f59e0b] hover:bg-slate-900 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#12141a] border-t border-slate-800 px-4 pt-4 pb-6 space-y-4 shadow-2xl text-slate-300 text-sm font-semibold">
            <a href="#aulas" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-850 hover:text-[#f59e0b]">⚡ Aulas Coletivas</a>
            <a href="#calculadora" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-850 hover:text-[#f59e0b]">📊 Avaliação IMC</a>
            <a href="#planos" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-850 hover:text-[#f59e0b]">💪 Nossos Planos</a>
            <a href="#diferenciais" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-850 hover:text-[#f59e0b]">🏋️ Infraestrutura</a>
            <a href="#localizacao" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-850 hover:text-[#f59e0b]">📍 Contato</a>
            
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 text-xs font-bold uppercase tracking-widest text-slate-950 bg-[#f59e0b] hover:bg-amber-400">
              <Icon name="Phone" className="mr-2" size={16} /> WhatsApp Fale Conosco
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION - Brutalist Performance Gym Layout */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-56 md:pb-36 bg-[#0c0e12] overflow-hidden border-b-4 border-[#f59e0b]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/12 w-[450px] h-[450px] rounded-full bg-[#f59e0b] filter blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/12 w-[600px] h-[600px] rounded-full bg-slate-800 filter blur-[120px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:35px_35px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 text-xs font-black tracking-widest uppercase border border-[#f59e0b]/50 bg-[#f59e0b]/10 text-[#f59e0b]">
                ⚡ O MAIOR TEMPLO DE PERFORMANCE DE NATAL
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[0.93] text-white uppercase">
                Força brutal, <br />
                <span className="text-[#f59e0b] italic font-medium">resultado absoluto.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-400 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {storeData.description} Grade completa de aulas incluída no plano e equipe profissional focada no seu resultado e saúde física.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href={getWhatsAppLink('Olá! Quero me matricular na Engenharia do Corpo e garantir a matrícula gratuita.')} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-[#f59e0b] hover:bg-amber-400 transition-all shadow-lg hover:shadow-[#f59e0b]/30">
                  <Icon name="Phone" className="mr-2" size={16} /> Falar com Atendente
                </a>
                <a href="#aulas" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-white border border-slate-700 hover:border-[#f59e0b] hover:bg-white/5 transition-all">
                  <Icon name="Flame" className="mr-2" size={16} /> Aulas Coletivas
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 border border-[#f59e0b]/40 transform translate-x-3 translate-y-3 pointer-events-none"></div>
                <div className="relative bg-[#12141a] p-3 border border-slate-850 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Treino Resistência Brutal" 
                    className="w-full h-[400px] object-cover filter brightness-[0.88]" 
                  />
                  <div className="absolute bottom-6 left-6 bg-[#0c0e12]/95 backdrop-blur-sm border-l-4 border-[#f59e0b] text-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-black">Grade Premium de Aulas</p>
                    <p className="text-xs text-slate-350 font-light mt-0.5">Spinning, Cross e Ritmos</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CARROSSEL DE MAQUINÁRIO E GRIFES PARCEIRAS */}
      <section className="py-10 bg-[#12141a] border-y border-slate-850 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[10px] tracking-widest uppercase text-slate-500 font-bold mb-6">Equipamentos de alta tecnologia</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 items-center justify-items-center opacity-85">
            {storeData.brands?.map((brand, idx) => (
              <div key={idx} className="text-center group pointer-events-none">
                <span className="font-display text-base sm:text-lg tracking-wider text-slate-300 font-semibold italic border-b border-[#f59e0b]/20 pb-1 group-hover:text-[#f59e0b] transition-colors">
                  {brand.name}
                </span>
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-1">{brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS E DIFERENCIAIS DA ACADEMIA */}
      <section id="diferenciais" className="py-8 bg-black border-b border-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-[#f59e0b]/10 text-[#f59e0b] rounded-none border border-[#f59e0b]/25">
                <Icon name="Dumbbell" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Livre Acesso</h4>
              <p className="text-[10px] text-slate-400">Treine quantas vezes quiser, sem limitação de horário.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-[#f59e0b]/10 text-[#f59e0b] rounded-none border border-[#f59e0b]/25">
                <Icon name="Activity" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Maquinário Top</h4>
              <p className="text-[10px] text-slate-400">Equipamentos biomecânicos Matrix e Life Fitness.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-[#f59e0b]/10 text-[#f59e0b] rounded-none border border-[#f59e0b]/25">
                <Icon name="Flame" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Aulas Coletivas</h4>
              <p className="text-[10px] text-slate-400">Grade completa inclusa nos planos sem taxas adicionais.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-[#f59e0b]/10 text-[#f59e0b] rounded-none border border-[#f59e0b]/25">
                <Icon name="UserCheck" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Professores de Salão</h4>
              <p className="text-[10px] text-slate-400">Acompanhamento e suporte técnico na área de musculação.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center col-span-2 md:col-span-1">
              <span className="p-3 bg-[#f59e0b]/10 text-[#f59e0b] rounded-none border border-[#f59e0b]/25">
                <Icon name="Lock" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Ambiente Seguro</h4>
              <p className="text-[10px] text-slate-400">Estacionamento climatizado e segurança armada local.</p>
            </div>

          </div>
        </div>
      </section>

      {/* GRADE DE AULAS INTERATIVA */}
      <section id="aulas" className="py-24 bg-[#0c0e12] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">Compromisso Físico</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase">
              Grade de Aulas <span className="text-[#f59e0b] italic font-medium">Coletivas</span>
            </h2>
            <div className="w-16 h-1 bg-[#f59e0b] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
              Selecione o dia da semana abaixo e confira a programação completa de Cross Training, Spinning e ritmos.
            </p>
          </div>

          <div className="bg-[#12141a] border border-slate-800 rounded-none p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Abas dos Dias */}
              <div className="flex flex-wrap justify-center gap-3">
                {Object.keys(classSchedule).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-8 py-3.5 text-xs font-black uppercase tracking-widest transition-all ${
                      selectedDay === day
                        ? 'bg-[#f59e0b] text-slate-950 shadow-lg'
                        : 'bg-[#1c1f26] text-slate-400 border border-slate-850 hover:border-[#f59e0b] hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Lista de Aulas */}
              <div className="bg-[#0c0e12] border border-slate-850 rounded-none overflow-hidden divide-y divide-slate-850">
                {classSchedule[selectedDay]?.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4 hover:bg-slate-900/40 transition-colors">
                    <div className="flex items-center space-x-6">
                      <span className="text-[#f59e0b] font-display font-black text-lg tracking-wider bg-[#f59e0b]/5 border border-[#f59e0b]/20 px-4 py-1.5">{item.time}</span>
                      <div className="text-left">
                        <h4 className="text-sm font-display font-black uppercase tracking-wider text-white">{item.name}</h4>
                        <p className="text-xs text-slate-400 font-light">{item.instructor}</p>
                      </div>
                    </div>
                    <a 
                      href={getWhatsAppLink(`Olá, gostaria de agendar uma aula experimental de ${item.name} na ${selectedDay} às ${item.time}.`)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-950 bg-[#f59e0b] hover:bg-amber-400 transition-all"
                    >
                      Agendar Aula <Icon name="ChevronRight" className="ml-1" size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SIMULADOR DE IMC INTERATIVO */}
      <section id="calculadora" className="py-24 bg-[#12141a] border-y border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">Mapeamento Físico</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase">
              Simulador de <span className="text-[#f59e0b] italic font-medium">Índice Corporal (IMC)</span>
            </h2>
            <div className="w-16 h-1 bg-[#f59e0b] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Calcule seu IMC em segundos e saiba o status ideal para iniciar seu cronograma de musculação.
            </p>
          </div>

          <div className="bg-[#0c0e12] border border-slate-850 rounded-none p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              <form onSubmit={calculateIMC} className="space-y-6">
                <h3 className="text-base font-display font-black uppercase border-b border-slate-850 pb-3 tracking-wider text-white">Seus Dados</h3>
                
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-450 uppercase">Seu Peso (kg):</label>
                  <input
                    type="number"
                    placeholder="Ex: 80"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-none border border-slate-700 bg-[#12141a] text-white focus:outline-none focus:border-[#f59e0b] text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-450 uppercase">Sua Altura (cm):</label>
                  <input
                    type="number"
                    placeholder="Ex: 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-none border border-slate-700 bg-[#12141a] text-white focus:outline-none focus:border-[#f59e0b] text-sm"
                  />
                </div>

                <button type="submit" className="w-full py-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-[#f59e0b] hover:bg-amber-400 transition-all">
                  Calcular IMC Agora
                </button>
              </form>

              <div className="bg-[#12141a] p-8 rounded-none border border-slate-850 shadow-inner flex flex-col justify-center space-y-6 min-h-[300px]">
                {imcResult !== null ? (
                  <div className="text-center space-y-4">
                    <div className="p-3 bg-[#f59e0b]/10 rounded-none inline-block text-[#f59e0b] border border-[#f59e0b]/25">
                      <Icon name="Activity" size={28} />
                    </div>
                    <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Seu Resultado de Massa</h4>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500">IMC Calculado:</p>
                      <p className="text-4xl font-extrabold text-[#f59e0b]">{imcResult.toFixed(1)}</p>
                    </div>
                    <div className="bg-[#0c0e12] p-3 rounded-none border border-slate-800 inline-block text-xs text-slate-300">
                      Classificação: <strong className="text-[#f59e0b] uppercase font-bold">{imcCategory}</strong>
                    </div>
                    <div className="pt-2">
                      <a href={getWhatsAppLink(`Olá, calculei meu IMC e deu ${imcResult.toFixed(1)} (${imcCategory}). Gostaria de marcar uma consultoria para montar meu treino ideal.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#f59e0b] hover:text-amber-400">
                        Consultar Treinador no WhatsApp <Icon name="ChevronRight" className="ml-1" size={16} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3 text-slate-500">
                    <Icon name="HeartPulse" className="mx-auto text-slate-700" size={36} />
                    <p className="text-xs font-bold uppercase tracking-wide">Avaliação Física Ativa</p>
                    <p className="text-xs text-slate-450 max-w-xs mx-auto leading-relaxed">Insira seu peso e altura para estimarmos seu índice de massa corporal e indicarmos o plano ideal.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PLANOS DE ASSINATURA */}
      <section id="planos" className="py-24 bg-[#0c0e12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">Matrícula Sem Fricção</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">
              Escolha seu <span className="text-[#f59e0b] italic font-medium">Plano</span>
            </h2>
            <div className="w-16 h-1 bg-[#f59e0b] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Musculação de alta performance e suporte técnico. Selecione o plano que melhor se adequa ao seu objetivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-[#12141a] border border-slate-800 rounded-none overflow-hidden flex flex-col group hover:shadow-2xl hover:border-[#f59e0b]/50 transition-all duration-300 relative">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#f59e0b] text-slate-950 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-none z-20 shadow-md">
                    {product.tag}
                  </span>
                )}
                
                <div className="relative h-60 overflow-hidden bg-slate-900 border-b border-slate-850">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.85]" loading="lazy" />
                  <div className="absolute inset-0 bg-[#f59e0b]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-[#f59e0b] border border-slate-950">Garantir Preço Fixo</span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-display font-extrabold text-white uppercase tracking-wide">{product.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-light">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                    <span className="text-sm font-black text-[#f59e0b] bg-[#f59e0b]/5 border border-[#f59e0b]/20 px-3 py-1">{product.price}</span>
                    <a href={getWhatsAppLink(`Olá, gostaria de reservar a promoção do ${product.name} (${product.price}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-950 bg-[#f59e0b] hover:bg-amber-400 transition-all">
                      Treinar <Icon name="ChevronRight" className="ml-1" size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: DEPOIMENTOS DE ALTA PERFORMANCE */}
      <section className="py-24 bg-[#12141a] border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">Atletas e Alunos</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">
              Quem treina com a gente, <span className="text-[#f59e0b] italic font-medium">recomenda</span>
            </h2>
            <div className="w-16 h-1 bg-[#f59e0b] mx-auto"></div>
            <p className="text-slate-450 text-sm sm:text-base font-light">
              Veja a evolução e a opinião de alunos que transformaram suas vidas treinando na Engenharia do Corpo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#0c0e12] p-8 border border-slate-800 relative">
              <div className="flex items-center space-x-1 text-[#f59e0b] mb-4">
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed italic mb-6">
                "Excelente maquinário. As polias são suaves e as anilhas de borracha ajudam a treinar pesado com segurança. Equipe técnica muito prestativa."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Douglas Silva" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Douglas Silva</h4>
                  <span className="text-[10px] text-slate-500">Membro há 2 anos</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0c0e12] p-8 border border-slate-800 relative">
              <div className="flex items-center space-x-1 text-[#f59e0b] mb-4">
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed italic mb-6">
                "Adoro as aulas de Spinning. A professora Ana tem uma energia contagiante e as playlists são ótimas. Academia climatizada e muito limpa."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Carla Mendes" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Carla Mendes</h4>
                  <span className="text-[10px] text-slate-500">Aluna de Coletivas</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0c0e12] p-8 border border-slate-800 relative">
              <div className="flex items-center space-x-1 text-[#f59e0b] mb-4">
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                <Icon name="Star" size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed italic mb-6">
                "O plano Black recorrente no cartão é super prático e não bloqueia meu limite. A área de musculação é gigante e os equipamentos são muito modernos."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Lucas Lima" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Lucas Lima</h4>
                  <span className="text-[10px] text-slate-500">Membro Musculação</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ INTERATIVO ACADEMIA */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">Dúvidas Rápidas</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-950 uppercase">
              Perguntas <span className="text-[#f59e0b] italic font-medium">Frequentes</span>
            </h2>
            <div className="w-16 h-1 bg-[#f59e0b] mx-auto"></div>
            <p className="text-slate-550 text-sm sm:text-base font-light">
              Esclareça dúvidas comuns sobre planos, regras e agendamento de aulas experimentais.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Como agendar uma Aula Experimental?",
                a: "Basta clicar em qualquer um de nossos botões do WhatsApp e solicitar ao atendente o agendamento de sua aula experimental de musculação ou de aulas coletivas de sua preferência. A primeira aula é cortesia."
              },
              {
                q: "Como funciona o Plano Black Anual Recorrente?",
                a: "No plano recorrente, o valor mensal da mensalidade (R$ 79,90) é debitado automaticamente no seu cartão de crédito todos os meses, sem comprometer ou travar o limite total anual do seu cartão."
              },
              {
                q: "As aulas coletivas estão incluídas nos planos?",
                a: "Sim. No Plano Gold e no Plano Black Anual, todas as aulas coletivas (Cross, Spinning, Zumba, Ritmos, Fit Dance) estão 100% incluídas na sua mensalidade fixa, sem cobrança de taxas adicionais por aula."
              },
              {
                q: "A academia tem taxa de matrícula ou anuidade?",
                a: "Não cobramos taxa de matrícula na promoção ativa de inauguração deste mês. Dispomos apenas de taxa de manutenção anual padrão cobrada de forma simplificada em todos os contratos de assinatura."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-slate-55 hover:bg-slate-100 transition-colors text-left text-slate-950 font-display font-black text-sm uppercase tracking-wide"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name={openFaqIndex === idx ? "Minus" : "Plus"}
                    className="text-[#f59e0b]"
                    size={16}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === idx ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-slate-600 leading-relaxed font-light bg-white">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-24 bg-[#0c0e12] border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">Nossa Sede</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">Nossa Localização</h2>
            <div className="w-16 h-1 bg-[#f59e0b] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Estamos localizados em Lagoa Nova com estacionamento privativo e recepção climatizada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 bg-[#12141a] p-8 rounded-none border border-slate-800 shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-display font-black text-white uppercase tracking-wide">Informações de Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#0c0e12] rounded-none text-slate-400">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-350 text-xs uppercase tracking-wider">Endereço da Unidade</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{storeData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#0c0e12] rounded-none text-slate-400">
                      <Icon name="Phone" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-350 text-xs uppercase tracking-wider">Telefone de Contato</h4>
                      <p className="text-xs text-slate-400 mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#0c0e12] rounded-none text-slate-400">
                      <Icon name="Clock" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-350 text-xs uppercase tracking-wider">Horários de Treino</h4>
                      <div className="text-xs text-slate-400 mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#0c0e12] bg-[#f59e0b] hover:bg-amber-400 transition-all">
                  <Icon name="Phone" className="mr-2" size={16} /> Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-300 bg-[#0c0e12] border border-slate-800 hover:bg-slate-900 transition-all">
                  <Icon name="MapPin" className="mr-2 text-slate-500" size={16} /> Como Chegar (Google Maps)
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-none overflow-hidden border border-slate-800 bg-[#12141a] p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg]" allowFullScreen={false} loading="lazy" title="Localização da Academia"></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-slate-450 py-16 border-t border-[#f59e0b]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Institucional</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Sobre a Academia</a></li>
                <li><a href="#localizacao" className="hover:text-white transition-colors">Nossa Unidade</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de saber sobre vagas para instrutores.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Trabalhe conosco</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Serviços</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#aulas" className="hover:text-white transition-colors">Grade de Aulas Coletivas</a></li>
                <li><a href="#calculadora" className="hover:text-white transition-colors">Simulador de IMC</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de informações sobre parcerias corporativas.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Parcerias Corporativas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Acompanhe-nos</h4>
              <ul className="space-y-2 text-xs">
                {storeData.instagramUrl && <li><a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Instagram" size={13} className="mr-2 text-[#f59e0b]" /> Instagram</a></li>}
                {storeData.facebookUrl && <li><a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Facebook" size={13} className="mr-2 text-[#f59e0b]" /> Facebook</a></li>}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Formas de Matrícula</h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">💳 Crédito</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">⚡ Pix</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">📄 Boleto</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">✍️ Recorrente</span>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs">
            <div className="space-y-2">
              <Logo className="h-10 mx-auto md:mx-0" />
              <p className="text-[10px] text-slate-500 font-light mt-2">
                © {new Date().getFullYear()} Engenharia do Corpo – Lagoa Nova. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-2 text-slate-500 text-[9px] uppercase font-bold tracking-wider">
              <p>Direção Geral de Esportes e Lazer de Natal/RN</p>
              <p>CREF/RN Registro Coletivo Nº 10292</p>
              <p>
                Desenvolvido por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors text-slate-400">
                  Diogo Falcão (FalAiquoc)
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
