import { useState, useEffect } from 'react';

const codeSnippets = [
  "Hello, I'm Nadeeshan Nadeera.",
  "print('Developer | ICT Enthusiast | Problem Solver')",
  "const buildSystem = () => {\n  return 'Scalable';\n};",
  "docker run -d \\\n  -p 8080:80 \\\n  microservice:latest",
  "git commit -m \\\n  'Fix availability \\n  paradox'",
  "func main() {\n  fmt.Println(\"Ready\")\n}",
];

const CodeTerminal = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const currentSnippet = codeSnippets[loopNum % codeSnippets.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentSnippet.substring(0, text.length - 1));
        setTypingSpeed(30);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentSnippet.substring(0, text.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    if (!isDeleting && text === currentSnippet) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="w-full max-w-xl mx-auto lg:ml-auto bg-[#0a0a0a] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden min-h-[280px]">
      {/* Title bar */}
      <div className="flex items-center px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/50 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <div className="ml-2 text-xs text-zinc-500 font-mono tracking-wider">bash ~ /portfolio</div>
      </div>
      {/* Code area */}
      <div className="p-6 flex-grow font-mono text-sm md:text-base text-indigo-400 whitespace-pre-wrap leading-relaxed">
        <span className="text-zinc-500 mr-2">$</span>
        {text}
        <span className="inline-block w-2 h-4 bg-indigo-400 ml-1 animate-pulse align-middle"></span>
      </div>
    </div>
  );
};

export default CodeTerminal;