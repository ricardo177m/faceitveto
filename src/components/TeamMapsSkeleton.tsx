import Skeleton from "react-loading-skeleton";

export default function TeamMapsSkeleton() {
  return (
    <div className="py-1">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 text-left">
              <Skeleton className="w-full" />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // 5 times
            Array(5)
              .fill(1)
              .map((_, i) => (
                <tr
                  key={i}
                  className="h-14 rounded-md border-t-2 border-dark-300 bg-dark-500"
                >
                  <td className="inline-flex h-14 w-[70rem] items-center gap-4 overflow-hidden text-ellipsis px-4">
                    <Skeleton containerClassName="flex-1" className="w-full" />
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
