import { useState, useEffect, useRef } from 'react';

const FadeInSection = ({ children, delay = 0, type = 'slide-up' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const getAnimationClasses = () => {
    if (isVisible) return 'opacity-100 translate-y-0 translate-x-0 scale-100';
    switch (type) {
      case 'from-left':  return 'opacity-0 -translate-x-16';
      case 'from-right': return 'opacity-0 translate-x-16';
      case 'scale-up':   return 'opacity-0 scale-50';
      case 'slide-up':
      default:           return 'opacity-0 translate-y-12';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform-gpu ${getAnimationClasses()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
