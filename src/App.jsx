import { useState, useEffect } from 'react';

import { projectList, educationList, contactLinks } from './data/data';
import { HomeIcon, User, Briefcase, Code2, GraduationCap, Mail } from './components/icons/Icons';

import SectionDivider from './components/SectionDivider';
import ProjectDetailsPage from './components/ProjectDetailsPage';

import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';

const navItems = [
  { id: 'home',      label: 'Home',      icon: <HomeIcon size={18} /> },
  { id: 'about',     label: 'About',     icon: <User size={18} /> },
  { id: 'projects',  label: 'Projects',  icon: <Briefcase size={18} /> },
  { id: 'skills',    label: 'Skills',    icon: <Code2 size={18} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
  { id: 'contact',   label: 'Contact',   icon: <Mail size={18} /> },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [selectedProject]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Show project detail page
  if (selectedProject) {
    return (
      <ProjectDetailsPage
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-1 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-zinc-800 text-white shadow-lg'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <main className="w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20 pt-32 pb-24">
        <section id="home"      className="scroll-mt-32"><Home      scrollToSection={scrollToSection} /></section>
        <SectionDivider />
        <section id="about"     className="scroll-mt-32"><About     projectList={projectList} educationList={educationList} /></section>
        <SectionDivider />
        <section id="projects"  className="scroll-mt-32"><Projects  projectList={projectList} setSelectedProject={setSelectedProject} /></section>
        <SectionDivider />
        <section id="skills"    className="scroll-mt-32"><Skills /></section>
        <SectionDivider />
        <section id="education" className="scroll-mt-32"><Education educationList={educationList} /></section>
        <SectionDivider />
        <section id="contact"   className="scroll-mt-32"><Contact   contactLinks={contactLinks} /></section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20 pb-12 border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-600 text-sm">© 2026 nadeeShan_n.</div>
        <div className="flex items-center gap-6 text-zinc-500 text-sm">
          <a href="#" className="hover:text-white transition-colors">Resume</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>

      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;