export default function TwoColumn({
  children,
}: React.PropsWithChildren<{ user: User }>) {
  return (
    // TODO: Use nested pages for aside column
    <>
      <main className="flex flex-col gap-4 w-full xl:w-3/4">{children}</main>
      <aside className="hidden xl:flex flex-col gap-4 w-1/4">
        {Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className="w-full h-12 rounded-lg bg-muted/50" />
        ))}
      </aside>
    </>
  );
}
