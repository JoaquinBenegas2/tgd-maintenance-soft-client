import { signIn } from "@/config/auth";
import { Button } from "@/components/ui/button";

export function SignInButton({ className }: { className?: string }) {
  return (
    <form
      className="flex flex-col gap-4"
      action={async () => {
        "use server";
        await signIn("auth0", { redirectTo: "/" });
      }}
    >
      <Button type="submit" size={"lg"} className={className}>
        LOGIN
      </Button>
    </form>
  );
}
