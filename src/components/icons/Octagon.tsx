interface OctagonProps {
  className?: string;
}

export default function Octagon({ className = '' }: OctagonProps) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 21.95 21.95"
    >
      <g>
        <polygon 
          points="15.52 0 21.95 6.43 21.95 15.52 15.52 21.95 6.43 21.95 0 15.52 0 6.43 6.43 0 15.52 0" 
          fill="currentColor"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
} 