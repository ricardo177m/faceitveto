interface TooltipProps {
  text: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export default function Tooltip({ text, children, className }: TooltipProps) {
  if (!text) return children;
  return (
    <span className="group relative">
      {children}
      <span
        className={`${className} invisible absolute left-1/2 top-6 z-50 min-w-max -translate-x-1/2 rounded bg-gray-700 p-2 text-center text-sm font-normal text-white opacity-0 transition-opacity group-hover:visible group-hover:opacity-100`}
      >
        {text}
        <span className="absolute -top-1 bottom-full left-1/2 size-2 -translate-x-1/2 rotate-45 bg-gray-700"></span>
      </span>
    </span>
  );
}
