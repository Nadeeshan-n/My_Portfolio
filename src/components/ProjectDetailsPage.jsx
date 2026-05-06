import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, Code2, Star } from '../components/icons/Icons';

const ProjectDetailsPage = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-24">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20 pt-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-all"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-zinc-700 mx-4">/</span>
          <span className="text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors" onClick={onBack}>
            Projects
          </span>
          <span className="text-zinc-700 mx-4">{'>'}</span>
          <span className="text-white truncate">{project.title}</span>
        </nav>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
              <p className="text-zinc-400 text-lg leading-relaxed">{project.fullDescription}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              {project.link && project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 px-6 py-3 rounded-xl font-bold transition-all"
              >
                <Github size={20} />
                Github
              </a>
            </div>

            {/* Technologies */}
            <div className="pt-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code2 size={20} className="text-indigo-400" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[#1a1a1a] border border-[#333333] rounded-lg text-xs font-bold tracking-widest text-zinc-300 uppercase shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Project Image */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-zinc-900 aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Key Features */}
            <div className="bg-[#0a0a0c] border border-zinc-800/80 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Star size={24} className="text-yellow-500" />
                Features
              </h3>
              <ul className="space-y-4">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                    <span className="text-zinc-300 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;