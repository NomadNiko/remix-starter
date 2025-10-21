import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createLogoutCookie } from "~/lib/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return redirect("/", {
    headers: {
      "Set-Cookie": createLogoutCookie(),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  return redirect("/", {
    headers: {
      "Set-Cookie": createLogoutCookie(),
    },
  });
}
