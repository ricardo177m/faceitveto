interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

export default function Pagination({
  offset,
  limit,
  total,
  setOffset,
  className,
}: PaginationProps) {
  const page = Math.floor(offset / limit) + 1;

  return (
    <div
      className={`${className} inline-flex w-full items-center justify-center`}
    >
      <button
        onClick={() => setOffset(offset - limit)}
        disabled={offset === 0}
        className={`px-4 py-2 ${offset === 0 ? "opacity-50" : ""}`}
      >
        {"<"}
      </button>
      <span className="min-w-12">{page}</span>
      <button
        onClick={() => setOffset(offset + limit)}
        disabled={offset + limit >= total}
        className={`px-4 py-2 ${offset + limit >= total ? "opacity-50" : ""}`}
      >
        {">"}
      </button>
    </div>
  );
}
