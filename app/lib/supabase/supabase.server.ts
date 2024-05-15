import { AppLoadContext } from "@remix-run/cloudflare";
import { createServerClient, parse, serialize } from "@supabase/ssr";

export const createSupabaseServerClient = (
  context: AppLoadContext,
  request: Request
) => {
  const env = {
    SUPABASE_URL: context.cloudflare.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: context.cloudflare.env.SUPABASE_ANON_KEY,
  };

  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  const supabase = createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append("Set-Cookie", serialize(key, value, options));
      },
      remove(key, options) {
        headers.append("Set-Cookie", serialize(key, "", options));
      },
    },
  });

  return supabase;
};
