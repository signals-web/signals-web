import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface AboutAccordionProps {
  onToggle: (isOpen: boolean) => void;
}

const AboutAccordion: React.FC<AboutAccordionProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Start open on mount
    setIsOpen(true);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  return (
    <div className="mb-12">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between text-left mb-4 group"
      >
        <div className="flex-1">
          <h2 className="text-[48px] tracking-tight mb-4" style={{ fontWeight: 200 }}>
            <span className="underline">Signals is a communication design studio.</span>
          </h2>
          {isOpen && (
            <p className="text-[32px] leading-tight" style={{ fontWeight: 200 }}>
              We appreciate the power of graphic design and experiential and interpretive signage 
              in celebrating the built landscape. Signals amplifies this focus with an emphasis 
              on wayfinding, book development and design, and interpretive and experiential graphics.
            </p>
          )}
        </div>
        <ChevronDown 
          size={32} 
          className={`transform transition-transform duration-300 ml-4 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
    </div>
  );
};

export default AboutAccordion; 