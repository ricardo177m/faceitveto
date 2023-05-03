import Skeleton from "react-loading-skeleton";

export default function TeamMaps() {
  return (
    <div className="py-1">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-left px-4">
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
                  className="h-16 bg-dark-500 border-t-2 border-dark-300 rounded-md"
                >
                  <td className="inline-flex items-center w-[70rem] gap-4 h-16 px-4 overflow-hidden text-ellipsis">
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
