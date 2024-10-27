"use client";

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  offset,
  limit,
  total,
  setOffset,
  className,
}) => {
  const page = Math.floor(offset / limit) + 1;

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setOffset(offset - limit)}
        disabled={offset === 0}
        className={`px-4 py-2 ${offset === 0 ? "opacity-50" : ""}`}
      >
        {"<"}
      </button>
      <span className="px-4">{page}</span>
      <button
        onClick={() => setOffset(offset + limit)}
        disabled={offset + limit >= total}
        className={`px-4 py-2 ${offset + limit >= total ? "opacity-50" : ""}`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
