import FadeInSection from '../components/FadeInSection';
import { allSkills } from '../data/data';

const Skills = () => (
  <div className="space-y-8 overflow-hidden py-4">
    <FadeInSection type="slide-up">
      <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
    </FadeInSection>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {allSkills.map((skill, i) => (
        <FadeInSection key={i} type="scale-up" delay={i * 50}>
          <div className="group flex flex-col items-center justify-center p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-indigo-500/50 hover:bg-zinc-800/80 transition-all duration-300 aspect-square gap-3 cursor-default hover:-translate-y-1">
            <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img
                src={skill.logo}
                alt={`${skill.name} logo`}
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
              {skill.name}
            </span>
          </div>
        </FadeInSection>
      ))}
    </div>
  </div>
);

export default Skills;
