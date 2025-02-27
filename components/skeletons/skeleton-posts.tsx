export default function SkeletonPosts({
  blocksToShow = 4,
}: {
  blocksToShow?: number;
}) {
  const blocks = Array.from({ length: blocksToShow }, (_, i) => i);

  return (
    <main className="flex flex-col gap-4 w-full">
      {blocks.map((_, idx) => (
        <div className="py-10 px-4 xl:mr-5" key={idx}>
          <div className="relative bg-gray-100 h-8 mb-4 w-24 rounded-lg bg-opacity-10"></div>
          <div className="relative bg-gray-100 h-8 mb-4 w-2/4 rounded-lg bg-opacity-10"></div>
          <div className="flex flex-row items-start mb-4 space-x-2  animate-pulse bg-opacity-10">
            <div className="mx-auto h-40 mb-4 w-full rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg bg-gray-100">
              &nbsp;
            </div>
          </div>
          <div className="relative bg-gray-100 h-8 mb-4 w-54 rounded-lg bg-opacity-10"></div>
        </div>
      ))}
    </main>
  );
}
