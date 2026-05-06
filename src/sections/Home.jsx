import FadeInSection from '../components/FadeInSection';
import CodeTerminal from '../components/CodeTerminal';

const Home = ({ scrollToSection }) => (
  <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
    <div className="space-y-8 relative z-10">
      <FadeInSection type="slide-up">
        <div className="space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Developer <br />
            <span className="text-zinc-500">& ICT Enthusiast.</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-400 leading-relaxed">
            I build scalable systems and craft high-performance digital experiences.
            Currently focusing on DevOps, distributed systems, and modern web architectures.
          </p>
        </div>
      </FadeInSection>
    </div>

    <FadeInSection type="from-right" delay={300}>
      <CodeTerminal />
    </FadeInSection>
  </div>
);

export default Home;