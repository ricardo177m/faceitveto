import React from "react";
import Skeleton from "react-loading-skeleton";

interface RowItemProps {
  className?: string;
}

const RowItemSkeleton: React.FC<RowItemProps> = ({ className }) => {
  return (
    <div
      className={`${className} flex h-14 flex-row border-l-2 border-l-gray-600 bg-dark-400 px-2 transition-colors hover:bg-dark-500`}
    >
      <div className="mx-4 my-auto w-full">
        <Skeleton />
      </div>
    </div>
  );
};

export default RowItemSkeleton;
