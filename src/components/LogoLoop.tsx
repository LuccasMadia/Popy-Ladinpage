interface LogoLoopProps {
  items: string[];
}

export function LogoLoop({ items }: LogoLoopProps) {
  const track = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="animate-logo-loop flex w-max gap-6">
        {track.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="whitespace-nowrap rounded-xl border border-ink/10 bg-white px-6 py-4 font-display text-lg text-ink/70 shadow-sm"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
