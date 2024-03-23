export default function Loading() {
  return (
    <ul className=" z-10  mt-4 py-4 divide-y divide-border bg-background border shadow-md rounded-md">
      {new Array(3).fill(null).map((_, i) => (
        <li
          key={i}
          className="mx-auto py-4 w-full px-8 animate-pulse flex space-x-4"
        >
          <div className="rounded-lg bg-secondary h-40 w-40" />
          <div className="w-full flex-1 space-y-4 py-1">
            <div className="h-10 bg-secondary rounded w-full" />
            <div className="space-y-2">
              <div className="h-4 bg-secondary rounded w-4/5" />
              <div className="h-4 bg-secondary rounded w-4/5" />
              <div className="h-4 bg-secondary rounded w-4/5" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
