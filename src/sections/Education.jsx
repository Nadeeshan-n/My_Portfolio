import { useState } from 'react';
import FadeInSection from '../components/FadeInSection';
import { ZoomIn, XIcon } from '../components/icons/Icons';

const Education = ({ educationList }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="space-y-8">
      <FadeInSection type="slide-up">
        <h2 className="text-3xl font-bold text-white">Academic Journey</h2>
      </FadeInSection>

      <div className="space-y-6">
        {educationList.map((item, i) => (
          <FadeInSection key={i} type="from-left" delay={i * 150}>
            <div className="group p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 hover:bg-zinc-900/80 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-grow w-full">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {item.degree}
                    </h3>
                    <div className="text-indigo-400/80 font-medium mt-1">{item.institution}</div>
                  </div>
                  <div className="px-4 py-1.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-full w-fit border border-zinc-700/50 flex-shrink-0 xl:self-start">
                    {item.period}
                  </div>
                </div>
                <p className="text-zinc-400 leading-relaxed text-sm">{item.description}</p>
              </div>

              {/* Clickable image */}
              <div
                onClick={() => setSelectedImage(item.image)}
                className="w-full md:w-56 aspect-[4/3] flex-shrink-0 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700/50 group-hover:border-indigo-500/50 transition-colors cursor-pointer relative group/img shadow-md"
              >
                <img
                  src={item.image}
                  alt={`${item.institution} Reference`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out opacity-80 group-hover/img:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <ZoomIn className="text-white mb-2" size={24} />
                  <span className="text-white text-[10px] font-bold tracking-wider uppercase">View Reference</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-zinc-950/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 rounded-full p-2"
            >
              <XIcon size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Reference Fullscreen"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-zinc-800"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
