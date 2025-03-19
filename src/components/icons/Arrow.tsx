interface ArrowProps {
  className?: string;
  direction?: 'left' | 'right';
}

export default function Arrow({ className = '', direction = 'right' }: ArrowProps) {
  return (
    <svg 
      className={`${className} ${direction === 'left' ? 'rotate-180' : ''}`}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 23.71 22.44"
    >
      <g>
        <polygon 
          points="23.71 10.46 13.25 0 11.84 1.41 20.64 10.22 0 10.22 0 12.22 20.64 12.22 11.84 21.02 13.25 22.44 23.71 11.98 23.71 10.46" 
          fill="currentColor"
        />
      </g>
    </svg>
  );
} 