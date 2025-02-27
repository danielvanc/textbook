export default function SkeletonLatestMeta() {
  return (
    <aside className="hidden xl:flex flex-col gap-4 w-full">
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className="w-full h-12 rounded-lg bg-muted/50" />
      ))}
    </aside>
  );
}
