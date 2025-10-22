export default function SkeletonGrid({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="w-full aspect-[3/4] rounded-lg bg-gray-100 animate-pulse"
        />
      ))}
    </div>
  );
}
