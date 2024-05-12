"use client";

import { createClient } from "@/utils/client";
import { Button } from "@nextui-org/react";

export default function Home() {
  const supabaseClient = createClient();

  const handleLogin = async () => {
    supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div>
      <Button onClick={handleLogin}>Login with Google</Button>
    </div>
  );
}
