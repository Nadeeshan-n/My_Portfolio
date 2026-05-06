import FadeInSection from '../components/FadeInSection';
import AnimatedCounter from '../components/AnimatedCounter';
import { Code2, Award, ArrowUpRight } from '../components/icons/Icons';

const About = ({ projectList, educationList }) => {
  const stats = [
    {
      icon: <Code2 size={24} />,
      value: projectList.length,
      label: 'Total Projects',
      sub: 'Innovative web solutions crafted',
    },
    {
      icon: <Award size={24} />,
      value: educationList.length,
      label: 'Certificates',
      sub: 'Professional skills validated',
    },
  ];

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-12 overflow-hidden items-center">
        <FadeInSection type="from-left" delay={100}>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Behind the Code</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                I am an ICT Undergraduate driven by the intersection of complex logic and elegant design.
                My journey started with a curiosity for how the internet works, which evolved into a
                passion for building the systems that power it.
              </p>
              <p>
                Currently in my second year, I balance academic excellence with hands-on projects,
                focusing on the "Availability Paradox" and how modern DevOps can bridge the gap
                between development speed and system stability.
              </p>
              <p>
                When I'm not in front of a terminal, you can find me exploring nature, practicing
                digital photography, or learning about the latest in observability and open telemetry.
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection type="from-right" delay={300}>
          <div className="relative group flex justify-center items-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/coder-3462295-2895977.png"
              alt="Profile Illustration"
              className="w-full max-w-sm h-auto object-contain drop-shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:drop-shadow-[0_0_60px_rgba(99,102,241,0.5)] group-hover:-translate-y-2 transition-all duration-700 ease-out"
            />
          </div>
        </FadeInSection>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {stats.map((stat, i) => (
          <FadeInSection key={i} type="slide-up" delay={i * 150}>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between h-[160px] group hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-zinc-800/80 rounded-full flex items-center justify-center text-zinc-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-white tracking-tighter">
                  <AnimatedCounter end={stat.value} duration={2500} />
                </div>
              </div>
              <div className="flex justify-between items-end mt-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-200 tracking-wider uppercase mb-1.5">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-zinc-500">{stat.sub}</p>
                </div>
                <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-indigo-400 transition-colors duration-300 mb-1" />
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default About;
