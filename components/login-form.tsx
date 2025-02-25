import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { logInUser } from "@/app/actions";
import LoginButton from "@/components/LoginButton";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your TextBook account
                </p>
              </div>

              <div className="">
                <form action={logInUser}>
                  <LoginButton />
                </form>
              </div>
              <div className="text-center text-sm">
                Other methods coming soon...
              </div>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block md:min-h-[350px]">
            {/* TODO: Swap out placeholder img with something better */}
            <Image
              src="/placeholder.svg"
              alt="Image"
              fill={true}
              priority
              className="dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
