import Logo from "@/components/Logo";
import { getAuth } from "@/lib/auth";

export default async function Home() {
  const auth = await getAuth();
  return (
    <main>
      <Logo />
      {auth?.user?.email ?? "Not logged in"}
    </main>
  );
}
