import Logo from "@/components/Logo";
import { getAuth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const auth = await getAuth();
  return (
    <main>
      {auth.user ? (
        <div>
          <h1>Welcome back, {auth.user.email}</h1>
          <Link href="/chat">Go to chat</Link>
        </div>
      ) : (
        <div>
          <h1>Welcome to Rune</h1>
          <Link href="/signin">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      )}
    </main>
  );
}
