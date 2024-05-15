import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";

import { Button } from "~/components/ui/button";
import { createSupabaseServerClient } from "~/lib/supabase/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const env = {
    SUPABASE_URL: context.cloudflare.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: context.cloudflare.env.SUPABASE_ANON_KEY,
  };

  return json({
    env,
  });
}

export default function Index() {
  const { env } = useLoaderData<typeof loader>();
  const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  return (
    <div className="text-red-500">
      <Button>login</Button>
    </div>
  );
}
