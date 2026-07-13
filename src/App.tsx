import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

    // Cores da Academia (Laranja Neon, Tons de Cinza)
    root.style.setProperty('--p-50', '#fff7ed');
    root.style.setProperty('--p-100', '#ffedd5');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Laranja Neon
    root.style.setProperty('--p-600', '#ea580c');
    root.style.setProperty('--p-700', '#c2410c');
    root.style.setProperty('--p-800', '#9a3412');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Cinza / Preto

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
    <div className="min-h-screen bg-[#12141a] text-slate-100 antialiased selection:bg-orange-500 selection:text-slate-950">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f1115]/95 backdrop-blur-md shadow-lg border-b border-orange-500/20 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#hero" className="flex items-center space-x-2">
              <span className="text-2xl font-black uppercase tracking-tighter text-white">
                ENGENHARIA<span className="text-orange-500 font-bold text-lg ml-1">DO CORPO</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#aulas" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-orange-500 transition-colors">Aulas Coletivas</a>
              <a href="#calculadora" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-orange-500 transition-colors">Avaliação IMC</a>
              <a href="#planos" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-orange-500 transition-colors">Planos</a>
              <a href="#localizacao" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-orange-500 transition-colors">Contato</a>
              <a href={getWhatsAppLink('Olá! Gostaria de agendar uma aula experimental de cortesia.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-orange-500 hover:bg-orange-400 rounded-none transition-all hover:scale-105 shadow-md shadow-orange-500/10">
                <Icon name="Flame" className="mr-2" size={14} /> Treinar Agora
              </a>
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-orange-500 hover:bg-slate-800 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-[#0f1115] overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-600 filter blur-[140px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-slate-800 filter blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20">
                ⚡ A Maior Academia da Região
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.98]" style={{ fontFamily: 'var(--font-display)' }}>
                Força brutal, <span className="text-orange-500 block">resultado absoluto!</span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 font-light max-w-xl mx-auto lg:mx-0">
                {storeData.description} Equipamentos de última geração com musculação completa, cardio de alta performance e suporte profissional qualificado.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-orange-500 hover:bg-orange-400 rounded-none shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                  Matricule-se Já
                </a>
                <a href="#aulas" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-extrabold uppercase tracking-wider text-white border border-slate-700 hover:border-orange-500 hover:bg-orange-500/10 rounded-none transition-all">
                  Grade de Aulas
                </a>
              </div>
            </div>

            {/* Imagem Brutalista */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute top-6 right-6 w-full h-full border border-orange-500 pointer-events-none"></div>
                <div className="relative bg-[#1c1f26] p-3 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" alt="Treino Intenso" className="w-full h-96 object-cover" />
                  <div className="absolute bottom-6 left-6 bg-orange-500 text-slate-950 font-black px-4 py-2 uppercase tracking-widest text-xs">
                    Sem Desculpas
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GRADE DE AULAS INTERATIVA */}
      <section id="aulas" className="py-20 bg-[#12141a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Cronograma de <span className="text-orange-500">Aulas Coletivas</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Clique no dia de sua preferência e planeje o seu treino coletivo com os nossos professores especialistas.
            </p>
          </div>

          <div className="bg-[#1c1f26] border border-slate-800 p-8 lg:p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Seleção do Dia */}
              <div className="flex flex-wrap justify-center gap-3">
                {Object.keys(classSchedule).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-8 py-3 font-extrabold uppercase tracking-widest text-xs transition-all ${
                      selectedDay === day
                        ? 'bg-orange-500 text-slate-950 shadow-md'
                        : 'bg-[#12141a] text-slate-400 border border-slate-800 hover:border-orange-500 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Tabela de Aulas Dinâmica */}
              <div className="bg-[#12141a] rounded-none border border-slate-800 overflow-hidden shadow-inner">
                <div className="divide-y divide-slate-850">
                  {classSchedule[selectedDay]?.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4 hover:bg-[#1a1c23] transition-colors">
                      <div className="flex items-center space-x-6">
                        <span className="text-orange-500 font-extrabold font-serif text-lg tracking-wider bg-orange-500/10 px-4 py-1 border border-orange-500/20">{item.time}</span>
                        <div className="text-left">
                          <h4 className="text-base font-extrabold uppercase text-white">{item.name}</h4>
                          <p className="text-xs text-slate-400">{item.instructor}</p>
                        </div>
                      </div>
                      <a href={getWhatsAppLink(`Olá, gostaria de reservar vaga na aula de ${item.name} (${selectedDay} às ${item.time}).`)} target="_blank" rel="noopener noreferrer" className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white border border-slate-700 hover:border-orange-500 hover:bg-orange-500/10 transition-all">
                        Reservar Vaga <Icon name="ChevronRight" className="inline ml-1" size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA DE IMC INTEGRADA */}
      <section id="calculadora" className="py-20 bg-[#0f1115] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Diagnóstico de <span className="text-orange-500">Massa Corporal (IMC)</span>
            </h2>
            <p className="text-slate-400 text-lg">Insira seus dados abaixo para saber instantaneamente o seu nível físico atual e direcionar seus treinos.</p>
          </div>

          <div className="bg-[#1c1f26] border border-slate-800 p-8 lg:p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Form IMC */}
              <form onSubmit={calculateIMC} className="space-y-6 text-left">
                <h3 className="text-lg font-extrabold uppercase tracking-wider text-white">Insira seus dados corporais:</h3>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Seu Peso (kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 82.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-none border border-slate-800 bg-[#12141a] text-white focus:outline-none focus:border-orange-500 transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Sua Altura (cm):</label>
                  <input
                    type="number"
                    placeholder="Ex: 178"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-none border border-slate-800 bg-[#12141a] text-white focus:outline-none focus:border-orange-500 transition-all text-sm"
                  />
                </div>

                <button type="submit" className="w-full py-4 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-orange-500 hover:bg-orange-400 shadow-md shadow-orange-500/10 transition-all">
                  Calcular Meu IMC
                </button>
              </form>

              {/* Resultado IMC */}
              <div className="bg-[#12141a] p-8 border border-slate-850 shadow-inner flex flex-col justify-center space-y-6 min-h-[300px] text-center">
                {imcResult !== null ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-orange-500/10 rounded-none inline-block text-orange-500 border border-orange-500/25">
                      <Icon name="Activity" size={32} />
                    </div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Seu Índice de Massa Corporal</h4>
                    <div>
                      <p className="text-4xl font-serif font-black text-orange-500 tracking-wider">{imcResult.toFixed(1)}</p>
                      <p className="text-xs text-slate-400 mt-2">Classificação: <strong className="text-white">{imcCategory}</strong></p>
                    </div>
                    <div className="bg-[#1c1f26] p-3 border border-slate-800 text-xs">
                      <p className="text-slate-400">
                        Apresente seu resultado na recepção e retire um <strong className="text-orange-500">passe livre de 1 dia</strong> para treinar com a gente!
                      </p>
                    </div>
                    <div className="pt-2">
                      <a href={getWhatsAppLink(`Olá, calculei meu IMC (${imcResult.toFixed(1)} - ${imcCategory}) e quero resgatar meu passe livre de 1 dia na recepção.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-orange-500 hover:text-orange-400 hover:underline">
                        Resgatar Passe Livre no WhatsApp <Icon name="ChevronRight" className="ml-1" size={14} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-slate-500">
                    <Icon name="Flame" className="mx-auto text-slate-700 animate-pulse" size={48} />
                    <p className="text-xs font-bold uppercase tracking-widest">Calculadora IMC</p>
                    <p className="text-xs max-w-xs mx-auto leading-relaxed">Insira peso e altura ao lado para obter um diagnóstico físico básico dinâmico de forma imediata.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20 bg-[#12141a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Nossos <span className="text-orange-500">Planos de Treino</span>
            </h2>
            <p className="text-slate-400 text-lg">Preços especiais pensados para os seus objetivos de curto, médio ou longo prazo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-[#1c1f26] border border-slate-800 shadow-lg flex flex-col group relative">
                {product.id === 'plan-anual' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-slate-950 font-black px-4 py-1 text-[10px] uppercase tracking-widest">
                    Melhor Custo-Benefício
                  </div>
                )}
                <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="p-2 bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        <Icon name={product.iconName} size={18} />
                      </span>
                      <h3 className="text-lg font-extrabold uppercase tracking-wider text-white">{product.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{product.description}</p>
                  </div>
                  <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-orange-500 font-serif">{product.price}</span>
                    </div>
                    <a href={getWhatsAppLink(`Olá, gostaria de saber mais e contratar o plano: ${product.name}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-950 bg-orange-500 hover:bg-orange-400">
                      Escolher Plano
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-20 bg-[#0f1115] border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white" style={{ fontFamily: 'var(--font-display)' }}>Localização & Contato</h2>
            <p className="text-slate-400 text-lg">Showroom de musculação climatizado e estacionamento próprio gratuito no centro de Lagoa Nova.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-[#1c1f26] p-8 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-orange-500">Templo Info</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#12141a] text-slate-400">
                      <Icon name="MapPin" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">Endereço</h4>
                      <p className="text-xs text-slate-450 mt-1">{storeData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#12141a] text-slate-400">
                      <Icon name="Phone" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">WhatsApp</h4>
                      <p className="text-xs text-slate-450 mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#12141a] text-slate-400">
                      <Icon name="Clock" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">Horários</h4>
                      <div className="text-xs text-slate-450 mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-orange-500 hover:bg-orange-400 shadow-md">
                  Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#12141a] hover:bg-[#1c1f26] border border-slate-800 transition-all">
                  Rotas Google Maps
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto overflow-hidden shadow-2xl border border-slate-800 bg-[#1c1f26] p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full border-0 grayscale-[40%]" allowFullScreen={false} loading="lazy" title="Localização da Academia"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b0c0f] text-slate-500 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-3">
              <span className="text-lg font-black uppercase tracking-tighter text-white" style={{ fontFamily: 'var(--font-display)' }}>
                ENGENHARIA<span className="text-orange-500 font-normal italic">DOCORPO</span>
              </span>
              <p className="text-[10px] text-slate-500 max-w-sm mx-auto md:mx-0">
                © {new Date().getFullYear()} Academia Engenharia do Corpo. Todos os direitos reservados.
              </p>
            </div>
            <div className="text-center md:text-right space-y-4">
              <p className="text-[10px] text-slate-500">
                Desenvolvido com carinho por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
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
