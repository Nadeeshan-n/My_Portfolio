import FadeInSection from './FadeInSection';

const SectionDivider = () => (
  <FadeInSection type="slide-up">
    <div className="w-full py-20 md:py-32 flex items-center justify-center opacity-40">
      <div className="h-px w-1/3 max-w-[200px] bg-gradient-to-r from-transparent to-zinc-500"></div>
      <div className="w-2 h-2 mx-4 rotate-45 border border-zinc-500"></div>
      <div className="h-px w-1/3 max-w-[200px] bg-gradient-to-l from-transparent to-zinc-500"></div>
    </div>
  </FadeInSection>
);

export default SectionDivider;
