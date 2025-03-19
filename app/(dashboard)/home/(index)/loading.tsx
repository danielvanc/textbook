import SkeletonListPosts from "@/components/skeletons/skeleton-list-posts";

export default function LoadingHome() {
  const blocks = Array.from({ length: 8 }, (_, i) => i);
  return <SkeletonListPosts blocks={blocks} />;
}
