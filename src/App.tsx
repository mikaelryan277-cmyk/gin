import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronDown, 
  ShieldCheck, 
  Clock, 
  GlassWater, 
  Sparkles, 
  HandMetal,
  Smartphone,
  BookOpen,
  Wine,
  Music,
  MessageSquare
} from 'lucide-react';

// Mockup image path from generation
const MOCKUP_IMAGE = 'https://i.imgur.com/CWGtxcY.jpeg';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 600;
      setShowSticky(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCheckout = (plan: 'essencial' | 'completo') => {
    const value = plan === 'essencial' ? 9.90 : 27.90;
    // @ts-ignore
    if (window.fbq) {
      // @ts-ignore
      window.fbq('track', 'InitiateCheckout', { value, currency: 'BRL' });
    }
    
    setTimeout(() => {
      const link = plan === 'essencial' 
        ? 'https://ggcheckout.app/checkout/v4/akNASSdlT23O50Jx6P0p' 
        : 'https://ggcheckout.app/checkout/v4/w8WpOvBkzPNAtTxTOXuE';
      window.location.href = link;
    }, 300);
  };

  const scrollToOffer = () => {
    document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
  };

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
                Não é a receita que impressiona. É o Efeito Bartender.
              </h1>
              <p className="text-lg md:text-xl font-medium opacity-80 mb-10 max-w-xl mx-auto lg:mx-0">
                O ritual de 3 passos para preparar drinks que comunicam confiança e controle absoluto na hora de servir.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button 
                  onClick={scrollToOffer}
                  className="bg-void text-white px-10 py-5 rounded-full text-sm font-bold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  QUERO APRENDER AGORA
                </button>
                <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToOffer}>
                  <div className="w-10 h-10 rounded-full border border-void/30 flex items-center justify-center group-hover:bg-void group-hover:text-white transition-colors">
                    <ChevronDown size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Ver o mecanismo</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/2 relative flex justify-center lg:justify-end"
            >
              <div className="relative z-10 w-[380px] h-[480px] bg-surface rounded-[40px] border border-white/20 shadow-2xl overflow-hidden flex flex-col items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-700">
                <img 
                  src={MOCKUP_IMAGE} 
                  alt="Gin Fácil - O Efeito Bartender" 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dor / Identificação */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-5xl mb-8 leading-tight">
              A pessoa chega, você não tem nada preparado além de cerveja.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Ou pior, você fica perdido oferecendo "o que você quiser", corre pra cozinha e volta com um drink sem graça. Você perde a chance de causar uma impressão de controle e confiança logo nos primeiros minutos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* A Virada */}
      <section className="py-24 bg-surface liquid-wave rotate-180">
        <div className="container mx-auto px-6 rotate-180">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="inline-block px-4 py-1 bg-gold text-void rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
                A Grande Verdade
              </div>
              <h2 className="font-display text-4xl md:text-6xl mb-8 leading-tight">
                90% das pessoas focam apenas na receita e erram o principal.
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                O que realmente importa não é a quantidade exata de gin, mas a forma como o drink é preparado na frente da outra pessoa. É sobre o ritual, o timing e o fechamento.
              </p>
              <div className="text-gold font-display text-3xl italic">
                Apresentamos: O Efeito Bartender.
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-void rounded-3xl border border-white/5 overflow-hidden">
                <img 
                  src="https://i.imgur.com/A0Qq7We.jpeg" 
                  alt="Ícone copo Efeito Bartender" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gold rounded-3xl mt-8 overflow-hidden">
                <img 
                  src="https://i.imgur.com/wIZjyc9.jpeg" 
                  alt="Ícone gesto Efeito Bartender" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 bg-void overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl mb-6">O Mecanismo em 3 Passos</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Não é sobre decorar receitas infinitas, é sobre dominar estes três pilares fundamentais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "A Escolha",
                desc: "Leia o momento e escolha o drink certo em segundos, sem hesitação. Simplicidade que comunica autoridade."
              },
              {
                step: "02",
                title: "O Ritual",
                desc: "A sequência de gestos que faz parecer que você nasceu atrás do balcão. Ordem dos ingredientes e movimento."
              },
              {
                step: "03",
                title: "O Fechamento",
                desc: "O detalhe final e a frase de efeito que ancoram a memória da noite. O garnish perfeito que encerra o ritual."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex gap-6 items-start group"
              >
                <div className="text-gold text-5xl font-display italic font-bold leading-none opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-2">{item.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed max-w-[200px]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* O que tem dentro */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="font-display text-4xl md:text-5xl mb-12">O que você vai dominar:</h2>
              <div className="space-y-6">
                {[
                  { icon: BookOpen, text: "Receitas de gin, do clássico ao mais elaborado" },
                  { icon: Wine, text: "Tabela de combinações (gin + tônica + frutas/especiarias)" },
                  { icon: Clock, text: "Guia de qual drink servir dependendo do clima da noite" },
                  { icon: Smartphone, text: "Como montar um mini bar em casa gastando pouco" },
                  { icon: Sparkles, text: "Dicas de apresentação e como servir pra impressionar" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-gold" />
                    </div>
                    <span className="text-lg text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="glass p-8 rounded-[40px] relative z-10">
                  <div className="text-gold text-sm uppercase tracking-widest font-bold mb-4">Nota importante</div>
                  <p className="text-xl text-gray-200 leading-relaxed italic">
                    "As receitas são o material de apoio. A estrutura das 3 etapas é o que realmente entrega o resultado que você busca."
                  </p>
               </div>
               <div className="absolute -top-10 -left-10 w-32 h-32 bg-gold/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social / Autoridade */}
      <section className="py-24 bg-void border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-8">Método Testado</p>
          <blockquote className="font-display text-3xl md:text-4xl max-w-4xl mx-auto leading-tight mb-12">
            "Um método direto ao ponto, focado na experiência e no impacto visual. Simplicidade que transforma um anfitrião comum em alguém que domina o ambiente."
          </blockquote>
          <div className="flex items-center justify-center gap-2 text-gold">
            {[...Array(5)].map((_, i) => <Sparkles key={i} size={16} fill="currentColor" />)}
          </div>
        </div>
      </section>

      {/* Oferta */}
      <section id="oferta" className="py-24 bg-void">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl mb-4">Escolha seu nível</h2>
            <p className="text-gray-500">Acesso imediato após a confirmação do pagamento.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
            {/* Essencial */}
            <div className="w-full md:w-[280px] p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mb-2 font-bold">ESSENCIAL</div>
                <div className="text-3xl font-bold font-display mb-6">R$ 9,90</div>
                <ul className="text-xs space-y-3 opacity-80 mb-8">
                  <li className="flex items-center gap-2">• 5 Receitas base</li>
                  <li className="flex items-center gap-2">• Tabela de Combinação</li>
                  <li className="flex items-center gap-2">• Guia de Preparo</li>
                </ul>
              </div>
              <button 
                onClick={() => handleCheckout('essencial')}
                className="w-full py-3 border border-white/30 rounded-full text-[10px] font-bold text-center uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Selecionar
              </button>
            </div>

            {/* Completo */}
            <div className="w-full md:w-[320px] p-8 rounded-[32px] bg-white/10 border-2 border-gold backdrop-blur-xl flex flex-col justify-between min-h-[420px] shadow-[0_0_40px_rgba(245,197,66,0.1)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-void text-[9px] font-bold px-4 py-1 rounded-full uppercase tracking-tighter z-20">
                MAIS ESCOLHIDO
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gold mb-2 font-bold">COMPLETO</div>
                <div className="text-4xl font-bold font-display mb-6">R$ 27,90</div>
                <ul className="text-xs space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-gold">• 15+ Receitas Avançadas</li>
                  <li className="flex items-center gap-2 text-white/90">• Playlist de Ambientação</li>
                  <li className="flex items-center gap-2 text-white/90">• Guia de Mini Bar em Casa</li>
                  <li className="flex items-center gap-2 text-white/90 text-gold font-bold">• Bônus: Roteiro de Diálogo</li>
                </ul>
              </div>
              <button 
                onClick={() => handleCheckout('completo')}
                className="w-full py-4 bg-gold text-void rounded-full text-[10px] font-bold text-center uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
              >
                COMEÇAR AGORA
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 opacity-40">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <div className="w-2 h-2 bg-gold rounded-full"></div> Compra Segura
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <div className="w-2 h-2 bg-gold rounded-full"></div> 7 Dias de Garantia
            </div>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-24 bg-surface liquid-wave">
        <div className="container mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} className="text-gold" />
          </div>
          <h2 className="font-display text-4xl mb-6">Sua satisfação ou seu dinheiro de volta</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Você tem 7 dias para testar o método. Se achar que não aprendeu nada ou que as dicas não fazem diferença na sua noite, basta pedir o reembolso. Sem perguntas, sem burocracia.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-16">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Funciona pra quem nunca preparou um drink?",
                a: "Com certeza. O foco do método é justamente simplificar o processo e focar nos gestos que trazem confiança, ideais para iniciantes."
              },
              {
                q: "Preciso de um gin caro para dar certo?",
                a: "Não. Ensinamos como o ritual e os acompanhamentos certos valorizam qualquer bebida, permitindo ótimos resultados com marcas acessíveis."
              },
              {
                q: "O material é físico ou digital?",
                a: "O material é 100% digital. Você recebe o acesso imediatamente no seu e-mail após a confirmação do pagamento para ler no celular ou tablet."
              },
              {
                q: "Qual a diferença entre os dois planos?",
                a: "O Essencial foca no básico para você começar hoje. O Completo entrega o domínio total, com mais receitas, guias de ambientação e bônus exclusivos."
              },
              {
                q: "Quais as formas de pagamento?",
                a: "Aceitamos Cartão de Crédito (com liberação imediata), PIX (liberação imediata) e Boleto (até 3 dias úteis)."
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
          <h2 className="font-display text-4xl md:text-7xl mb-8 leading-tight">Pronto para causar uma impressão real?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
               onClick={scrollToOffer}
               className="bg-void text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
             >
               Escolher meu plano
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
              onClick={() => handleCheckout('completo')}
              className="w-full bg-gold text-void py-4 rounded-full font-bold shadow-2xl animate-pulse-gold flex items-center justify-center gap-2"
            >
              Garantir Plano Completo • R$ 27,90
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
