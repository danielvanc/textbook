import SkeletonListPosts from "./skeleton-list-posts";

export default function SkeletonPosts({
  blocksToShow = 4,
}: {
  blocksToShow?: number;
}) {
  const blocks = Array.from({ length: blocksToShow }, (_, i) => i);

  return (
    <main className="container">
      <SkeletonListPosts blocks={blocks} />
    </main>
  );
}
