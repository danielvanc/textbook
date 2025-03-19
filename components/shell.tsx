import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInput,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getBookmarksForUser } from "@/utils/db";
import { type User } from "@prisma/client";

interface ShellProps {
  user: Pick<User, "id" | "name" | "email" | "image">;
  children: React.ReactNode;
}

export default async function Shell({ user, children }: ShellProps) {
  const bookmarks = await getBookmarksForUser(user.id);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user} bookmarks={bookmarks} />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap gap-2 border-b bg-background p-4 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <SidebarInput placeholder="Type to search for posts..." />
        </header>
        <div className="flex flex-wrap flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
