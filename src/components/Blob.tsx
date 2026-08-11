interface BlobProps {
  color: string;
  className?: string;
}

export function Blob({ color, className }: BlobProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        fill={color}
        d="M45.3,-58.4C58.5,-49.6,68.5,-34.6,71.9,-18.1C75.3,-1.6,72.1,16.4,63.4,31.2C54.7,46,40.5,57.6,24.4,63.7C8.3,69.8,-9.7,70.4,-25.9,64.8C-42.1,59.2,-56.5,47.4,-64.8,32.1C-73.1,16.8,-75.3,-2,-70.3,-18.3C-65.3,-34.6,-53.1,-48.4,-38.7,-56.8C-24.3,-65.2,-12.1,-68.2,2.4,-71.2C16.9,-74.2,33.8,-77.2,45.3,-58.4Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
