import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Check, 
  ChevronDown, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Smartphone,
  BookOpen,
  Wine,
  Lock,
  RotateCcw,
  Quote,
  CheckCircle2,
  Star,
  UserCheck,
  UserX,
  HelpCircle
} from 'lucide-react';

// Cookie helper for Meta match quality
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

// Mockup image path from generation
const MOCKUP_IMAGE = 'https://i.imgur.com/CWGtxcY.jpeg';

import imgTestimonial1 from './assets/images/testimonial_1_WinzAss.png';
import imgTestimonial2 from './assets/images/testimonial_2_qBpveq8.png';
import imgTestimonial3 from './assets/images/testimonial_3_86bHS0j.png';
import imgTestimonial4 from './assets/images/testimonial_4_1p9y53X.png';
import imgTestimonial5 from './assets/images/testimonial_5_vaNffvg.png';
import imgBookCover from './assets/images/gin_facil_cover_book_1786123079394.jpg';

const TESTIMONIALS = [
  { img: imgTestimonial1, name: 'Depoimento 1', type: 'WhatsApp', alt: 'Depoimento sobre o Método Gin Fácil' },
  { img: imgTestimonial2, name: 'Depoimento 2', type: 'WhatsApp', alt: 'Depoimento sobre o Método Gin Fácil' },
  { img: imgTestimonial3, name: 'Depoimento 3', type: 'WhatsApp', alt: 'Depoimento sobre o Método Gin Fácil' },
  { img: imgTestimonial4, name: 'Depoimento 4', type: 'WhatsApp', alt: 'Depoimento sobre o Método Gin Fácil' },
  { img: imgTestimonial5, name: 'Depoimento 5', type: 'WhatsApp', alt: 'Depoimento sobre o Método Gin Fácil' },
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [isThanksPage, setIsThanksPage] = useState(false);
  const [viewContentFired, setViewContentFired] = useState(false);
  const offerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // ViewContent Observer
    if (!isThanksPage && !viewContentFired && offerRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !viewContentFired) {
          const eventId = uuidv4();
          console.log('ViewContent disparado');
          
          // Client-Side Pixel
          // @ts-ignore
          if (window.fbq) {
            // @ts-ignore
            window.fbq('track', 'ViewContent', {
              content_name: 'Gin Fácil - Efeito Bartender',
              content_category: 'Infoproduto',
              value: 27.90,
              currency: 'BRL'
            }, { eventID: eventId });
          }

          // Server-Side CAPI
          fetch('/api/meta-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event_name: 'ViewContent',
              event_id: eventId,
              event_source_url: window.location.href,
              user_data: { fbp: getCookie('_fbp'), fbc: getCookie('_fbc') },
              custom_data: {
                content_name: 'Gin Fácil - Efeito Bartender',
                content_category: 'Infoproduto',
                value: 27.90,
                currency: 'BRL'
              }
            })
          }).catch(console.error);

          setViewContentFired(true);
          observer.disconnect();
        }
      }, { threshold: 0.1 });

      observer.observe(offerRef.current);
      return () => observer.disconnect();
    }
  }, [isThanksPage, viewContentFired]);

  useEffect(() => {
    // Check for purchase redirect
    if (window.location.pathname === '/obrigado') {
      setIsThanksPage(true);
      const eventId = uuidv4();
      
      // Pixel Purchase
      // @ts-ignore
      if (window.fbq) {
        // @ts-ignore
        window.fbq('track', 'Purchase', { value: 27.90, currency: 'BRL' }, { eventID: eventId });
      }

      // CAPI Purchase
      fetch('/api/meta-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'Purchase',
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: { fbp: getCookie('_fbp'), fbc: getCookie('_fbc') },
          custom_data: { value: 27.90, currency: 'BRL' }
        })
      }).catch(console.error);
    }
    const handleScroll = () => {
      const heroHeight = 600;
      setShowSticky(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCheckout = (plan: 'essencial' | 'completo') => {
    const value = plan === 'essencial' ? 14.90 : 27.90;
    const eventId = uuidv4();
    const link = plan === 'essencial' 
      ? 'https://ggcheckout.app/checkout/v4/akNASSdlT23O50Jx6P0p' 
      : 'https://ggcheckout.app/checkout/v4/w8WpOvBkzPNAtTxTOXuE';

    // Client-Side Pixel Event (InitiateCheckout)
    // @ts-ignore
    if (window.fbq) {
      // @ts-ignore
      window.fbq('track', 'InitiateCheckout', { 
        value, 
        currency: 'BRL',
        content_name: plan === 'essencial' ? 'Plano Essencial' : 'Plano Completo'
      }, { eventID: eventId });
    }

    // Server-Side CAPI Event
    fetch('/api/meta-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'InitiateCheckout',
        event_id: eventId,
        event_source_url: window.location.href,
        user_data: {
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
        },
        custom_data: {
          value,
          currency: 'BRL',
          content_name: plan === 'essencial' ? 'Plano Essencial' : 'Plano Completo'
        }
      })
    }).catch(console.error);
    
    setTimeout(() => {
      window.location.href = link;
    }, 350);
  };

  const scrollToOffer = () => {
    const el = document.getElementById('oferta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isThanksPage) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-surface p-12 rounded-[40px] border border-gold/20 shadow-2xl"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-gold" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4 italic">Obrigado pela confiança!</h1>
          <p className="text-white/60 mb-8">
            O seu acesso ao Gin Fácil — O Efeito Bartender foi enviado para o seu e-mail agora mesmo.
          </p>
          <a 
            href="/"
            className="inline-block bg-gold text-void px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all"
          >
            Voltar para a página
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void selection:bg-gold selection:text-void">
      {/* Hero Section - Artistic */}
      <section className="relative bg-gold text-void pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden artistic-hero border-b-8 border-white/10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="absolute top-0 left-6 text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">
            Gin Fácil — O Método
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/2 text-center lg:text-left pt-8"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.85] tracking-tight mb-6">
                Não é o gin caro que faz o drink. É o jeito de preparar no fim de semana.
              </h1>
              <p className="text-lg md:text-xl font-medium opacity-80 mb-10 max-w-xl mx-auto lg:mx-0">
                O método prático de 3 passos para mandar bem quando a galera cola na sua casa no sábado — sem precisar gastar uma fortuna no mercado.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button 
                  onClick={scrollToOffer}
                  className="bg-void text-white px-10 py-5 rounded-full text-sm font-bold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  QUERO MANDAR BEM NO FIM DE SEMANA
                </button>
                <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToOffer}>
                  <div className="w-10 h-10 rounded-full border border-void/30 flex items-center justify-center group-hover:bg-void group-hover:text-white transition-colors">
                    <ChevronDown size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Ver como funciona</span>
                </div>
              </div>
              
              {/* Above the fold trust indicators */}
              <div className="mt-8 flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest opacity-60">
                <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-void" /> Compra Segura</div>
                <div className="w-1 h-1 bg-void/30 rounded-full"></div>
                <div className="flex items-center gap-1"><Check size={14} className="text-void" /> Acesso Imediato</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/2 relative flex justify-center lg:justify-end w-full"
            >
              <div className="relative z-10 w-full max-w-[320px] xs:max-w-[380px] aspect-[380/480] bg-surface rounded-[32px] md:rounded-[40px] border border-white/20 shadow-2xl overflow-hidden flex flex-col items-center justify-center md:rotate-3 hover:rotate-0 transition-transform duration-700">
                <img 
                  src={MOCKUP_IMAGE} 
                  alt="Gin Fácil - O Efeito Bartender" 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  fetchPriority="high"
                />
              </div>

              {/* Trust Badge Floating */}
              <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-gold text-void p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 z-20 md:rotate-[-5deg]">
                <ShieldCheck size={20} className="md:w-6 md:h-6" />
                <div className="leading-tight">
                  <div className="text-[8px] md:text-[10px] font-bold uppercase">Acesso Imediato</div>
                  <div className="text-xs md:text-sm font-black">Guia Digital</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
            <div className="flex items-center gap-2"><Lock size={16}/> <span className="text-[10px] uppercase font-bold tracking-widest">Pagamento Seguro</span></div>
            <div className="flex items-center gap-2"><RotateCcw size={16}/> <span className="text-[10px] uppercase font-bold tracking-widest">7 Dias de Garantia</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16}/> <span className="text-[10px] uppercase font-bold tracking-widest">Acesso Vitalício</span></div>
          </div>
        </div>
      </section>

      {/* Dor / Identificação */}
      <section className="py-16 bg-void">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-2xl md:text-4xl mb-4 leading-tight">
              Fazer de qualquer jeito na frente da galera dá aquela sensação de amadorismo.
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Depois de dar o sangue a semana toda no trampo, chega o sábado, você reúne o pessoal em casa e serve aquele drink morno, cheio de gelo derretido e sem graça. O problema não é o gin que você comprou — é que ninguém te ensinou o jeito certo de servir sem passar vergonha.
            </p>
          </motion.div>
        </div>
      </section>

      {/* A Virada */}
      <section className="py-16 bg-surface liquid-wave rotate-180">
        <div className="container mx-auto px-6 rotate-180">
          <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
            <div className="md:w-1/2">
              <div className="inline-block px-3 py-1 bg-gold text-void rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                O Segredo do Rolê
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-4 leading-tight">
                Você não precisa gastar metade do salário em gin importado.
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-6">
                Qualquer gin do supermercado fica foda se você souber o timing do gelo, a ordem certa dos ingredientes e como montar o copo rápido sem parecer perdido. É isso que muda o nível do churrasco ou do pré-balada.
              </p>
              <div className="text-gold font-display text-xl md:text-2xl italic">
                Apresentamos: O Método Gin Fácil.
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src={imgBookCover} 
                  alt="Capa do E-book Gin Fácil - Efeito Bartender Essencial" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-void overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl mb-3">Os 3 Passos Pra Mandar Bem</h2>
            <p className="text-gray-400 text-xs md:text-sm max-w-lg mx-auto">
              Sem firula e sem precisar de utensílios caros pra fazer bonito na sexta depois do trampo ou no sábado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "A Escolha Rápida",
                desc: "Saiba exatamente qual drink mandar na hora, sem enrolação e sem parecer em dúvida na frente de todo mundo."
              },
              {
                step: "02",
                title: "O Preparo Sem Erro",
                desc: "A sequência certa de gelo, gin e tônica que não deixa o drink fraco e nem aguado."
              },
              {
                step: "03",
                title: "O Toque Final",
                desc: "O detalhe simples no copo que faz a galera olhar e mandar: 'caramba, tu manja mesmo'."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex gap-4 items-start bg-white/[0.02] border border-white/5 rounded-2xl p-5"
              >
                <div className="text-gold text-4xl font-display italic font-bold leading-none opacity-60">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-1.5 text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* O que tem dentro */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <h2 className="font-display text-3xl md:text-4xl mb-8">O que você vai aprender pra aplicar já no próximo rolê:</h2>
              <div className="space-y-4">
                {[
                  { icon: BookOpen, text: "Receitas práticas pra fazer com o gin que você já tem em casa" },
                  { icon: Wine, text: "Tabela rápida de combinações (gin + tônica + frutas do mercado)" },
                  { icon: Clock, text: "Qual drink servir no churrasco, no esquenta ou num encontro" },
                  { icon: Smartphone, text: "Como montar seu cantinho de drinks gastando quase nada" },
                  { icon: Sparkles, text: "Detalhes de apresentação pra servir rápido e sem sujeira" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-gold" />
                    </div>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative w-full">
               <div className="glass p-6 md:p-8 rounded-3xl relative z-10">
                  <div className="text-gold text-xs uppercase tracking-widest font-bold mb-3">Sem Gastar Mais</div>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed italic">
                    "Você não precisa comprar garrafa cara nem kit profissional. Com o que você já tem na cozinha e o gin do mercado, o resultado fica foda."
                  </p>
               </div>
               <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/15 blur-2xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos / O Que Estão Dizendo (Prints diretos e limpos) */}
      <section id="depoimentos" className="py-14 md:py-18 bg-void border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-2">
              Resultados Reais
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-2">
              O Que Estão Dizendo
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-xs md:text-sm">
              Mensagens de quem já colocou o Método Gin Fácil em prática.
            </p>
          </div>

          {/* Imagens diretas dos prints (sem mockup ou firulas) */}
          <div className="flex flex-wrap justify-center items-start gap-3 md:gap-4 max-w-4xl mx-auto">
            {TESTIMONIALS.map((item, idx) => (
              <div 
                key={idx}
                className="w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] md:w-[160px] lg:w-[170px] flex-shrink-0"
              >
                <img 
                  src={item.img} 
                  alt={item.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto rounded-lg border border-white/10 shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para Quem É / Para Quem Não É */}
      <section className="py-14 md:py-18 bg-surface border-b border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-2">
              Direto ao Ponto
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold">
              Para quem é (e para quem NÃO é)
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Para Quem É */}
            <div className="bg-void/80 border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full"></div>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">PARA QUEM É</h3>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                    <span>Quem recebe a galera em casa no fim de semana e quer mandar bem na hora de servir.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                    <span>Quem quer aprender um método prático em 15 minutos sem ter que fazer curso chato.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                    <span>Quem quer aproveitar o gin comum do mercado e transformar em drink foda.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                    <span>Quem faz o churrasco de sábado ou o esquenta em casa e não quer passar vergonha.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Para Quem NÃO É */}
            <div className="bg-void/80 border border-rose-500/20 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full"></div>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                    <UserX className="w-4 h-4 text-rose-400" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">PARA QUEM NÃO É</h3>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-400">
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</span>
                    <span>Quem quer virar bartender profissional e trabalhar em bar chique.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</span>
                    <span>Quem quer gastar rios de dinheiro com bebidas e xaropes importados.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</span>
                    <span>Quem prefere continuar servindo drink morno e aguado pra galera.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta */}
      <section id="oferta" ref={offerRef} className="py-20 bg-void">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl mb-3">Escolha seu plano pro próximo fim de semana</h2>
            <p className="text-gray-500 text-xs md:text-sm">Acesso imediato no seu e-mail assim que confirmar. Baixou no celular, tá pronto.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-4xl mx-auto">
            {/* Essencial */}
            <div className="w-full md:w-[280px] p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mb-2 font-bold">ESSENCIAL</div>
                <div className="text-3xl font-bold font-display mb-6">R$ 14,90</div>
                <ul className="text-xs space-y-3 opacity-80 mb-8">
                  <li className="flex items-center gap-2">• 5 Receitas Práticas</li>
                  <li className="flex items-center gap-2">• Tabela de Combinações Rápida</li>
                  <li className="flex items-center gap-2">• Guia de Preparo Sem Erro</li>
                </ul>
              </div>
              <a 
                href="https://ggcheckout.app/checkout/v4/akNASSdlT23O50Jx6P0p"
                id="checkout-btn-basico"
                onClick={(e) => { e.preventDefault(); handleCheckout('essencial'); }}
                className="w-full py-3 border border-white/30 rounded-full text-[10px] font-bold text-center uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center"
              >
                QUERO O ESSENCIAL
              </a>
            </div>

            {/* Completo */}
            <div className="w-full md:w-[320px] p-6 md:p-8 rounded-3xl bg-white/10 border-2 border-gold backdrop-blur-xl flex flex-col justify-between min-h-[400px] shadow-[0_0_40px_rgba(245,197,66,0.1)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-void text-[9px] font-bold px-4 py-1 rounded-full uppercase tracking-tighter z-20">
                MAIS ESCOLHIDO
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gold mb-2 font-bold">COMPLETO</div>
                <div className="text-4xl font-bold font-display mb-6">R$ 27,90</div>
                <ul className="text-xs space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-gold">• 15+ Receitas pro Rolê</li>
                  <li className="flex items-center gap-2 text-white/90">• Playlist de Ambientação pro Esquenta</li>
                  <li className="flex items-center gap-2 text-white/90">• Guia de Bar em Casa Gastando Pouco</li>
                  <li className="flex items-center gap-2 text-white/90 text-gold font-bold">• Bônus: Roteiro de Preparo Rápido</li>
                </ul>
              </div>
              <a 
                href="https://ggcheckout.app/checkout/v4/w8WpOvBkzPNAtTxTOXuE"
                id="checkout-btn-completo"
                onClick={(e) => { e.preventDefault(); handleCheckout('completo'); }}
                className="w-full py-4 bg-gold text-void rounded-full text-[10px] font-bold text-center uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center justify-center"
              >
                QUERO MANDAR BEM NO SÁBADO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quebra de Objeções & Garantia Reforçada */}
      <section className="py-14 md:py-18 bg-surface border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-2">
              Segurança Total
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">
              Ficou com alguma dúvida?
            </h2>
            <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto">
              Veja as respostas rápidas pras perguntas mais comuns:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                title: "Preciso comprar gin caro?",
                desc: "Não! O método funciona com o gin que você já compra no supermercado. É o preparo que faz o drink ficar bom."
              },
              {
                title: "Preciso de utensílios caros?",
                desc: "Zero. Você usa o que já tem na cozinha e consegue um resultado foda no copo."
              },
              {
                title: "E se eu não gostar?",
                desc: "Você tem 7 dias de garantia incondicional. Devolvemos 100% do seu dinheiro sem frescura."
              }
            ].map((obj, i) => (
              <div key={i} className="p-5 bg-void/60 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold mb-3">
                    <HelpCircle size={16} />
                  </div>
                  <h4 className="font-bold text-xs md:text-sm text-white mb-1.5">{obj.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Garantia 7 Dias */}
          <div className="p-5 md:p-6 bg-gold/10 border border-gold/30 rounded-2xl flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 border border-gold/40">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-display text-lg md:text-xl font-bold text-gold mb-1">
                Garantia Incondicional de 7 Dias
              </h4>
              <p className="text-xs text-gray-300">
                Seu risco é zero. Garanta o guia hoje, use no churrasco ou no rolê deste fim de semana. Se achar que não valeu cada centavo, te devolvemos 100% do valor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-16">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Funciona pra quem nunca fez drink na vida?",
                a: "Com certeza. O guia é direto ao ponto, feito pra você ler em 15 minutos e aplicar no mesmo dia."
              },
              {
                q: "Preciso gastar mais dinheiro no mercado?",
                a: "Não. O objetivo é justamente você mandar bem com o gin e as tônicas acessíveis que você já compra."
              },
              {
                q: "Como recebo o guia?",
                a: "É 100% digital. Confirmou o pagamento, chega na hora no seu e-mail pra você abrir no celular."
              },
              {
                q: "Qual a diferença entre os dois planos?",
                a: "O Essencial traz as receitas base. O Completo é pra quem quer o combo inteiro: mais receitas, playlist pro esquenta e o guia de bar em casa gastando pouco."
              },
              {
                q: "Quais as formas de pagamento?",
                a: "Aceitamos Pix (liberação imediata), Cartão de Crédito (liberação imediata) e Boleto."
              }
            ].map((item, idx) => (
              <div key={idx} className="glass rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold">{item.q}</span>
                  <ChevronDown size={20} className={`text-gold transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-400 text-sm border-t border-white/5">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gold text-void text-center liquid-wave rotate-180">
        <div className="container mx-auto px-6 rotate-180">
          <h2 className="font-display text-4xl md:text-7xl mb-8 leading-tight">Pronto pra mandar bem no próximo rolê?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
               onClick={scrollToOffer}
               className="bg-void text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
             >
               QUERO O PLANO COMPLETO • R$ 27,90
             </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-void text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-gold font-display text-2xl mb-4">Gin Fácil</div>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">© 2026 Efeito Bartender. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-6 right-6 z-50 md:hidden"
          >
            <button 
              onClick={scrollToOffer}
              className="w-full bg-gold text-void py-4 rounded-full font-bold shadow-2xl animate-pulse-gold flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
            >
              QUERO MANDAR BEM • R$ 27,90
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
