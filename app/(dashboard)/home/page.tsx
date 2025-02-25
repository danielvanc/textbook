//
import { getUsersPosts } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";
import type React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInput,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function Page() {
  const { session, userId } = await verifyUserSession();
  const { posts } = await getUsersPosts(userId);
  const user = session.user as User;

  console.log("posts", posts);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <SidebarInput placeholder="Type to search for posts..." />
        </header>
        <div className="flex flex-wrap flex-1 flex-col gap-4 p-4">
          <div className="flex justify-between gap-4 p-4 min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-4 w-full xl:w-3/4">
              {Array.from({ length: 24 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-12 rounded-lg bg-muted/50"
                />
              ))}
            </div>
            <div className="hidden xl:flex flex-col gap-4 w-1/4">
              {Array.from({ length: 24 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-12 rounded-lg bg-muted/50"
                />
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
