import FadeInSection from '../components/FadeInSection';
import { Terminal, ChevronRight, ExternalLink } from '../components/icons/Icons';

const Projects = ({ projectList, setSelectedProject }) => (
  <div className="space-y-8">
    <FadeInSection type="slide-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">Selected Works</h2>
        <p className="text-zinc-500 max-w-sm">A collection of systems and applications I've developed recently.</p>
      </div>
    </FadeInSection>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectList.map((project, i) => (
        <FadeInSection key={i} type="slide-up" delay={i * 150}>
          <div className="group h-full bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all hover:bg-zinc-900/80 flex flex-col overflow-hidden shadow-lg shadow-black/20">
            {/* Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden bg-zinc-800 border-b border-zinc-800">
              <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-zinc-900/80 backdrop-blur-sm text-zinc-300 border border-zinc-700/50">
                <Terminal size={16} />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-grow">{project.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 mt-auto">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 group/btn transition-colors"
                >
                  More Details
                  <ChevronRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <a href={project.link} className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>
      ))}
    </div>
  </div>
);

export default Projects;
