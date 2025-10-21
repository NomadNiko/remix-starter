import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserFromRequest } from "~/lib/auth.server";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Starter" },
    { name: "description", content: "Welcome to Remix Starter!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromRequest(request);
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Welcome to Remix Starter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A modern full-stack template with Remix, MongoDB, JWT Auth, and Shadcn/ui
          </p>

          <div className="flex justify-center gap-4">
            {user ? (
              <>
                <Button asChild size="lg">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/logout">Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Remix</CardTitle>
                <CardDescription>Full-stack React framework</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Built on Web Standards with server-side rendering and optimized data loading.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MongoDB</CardTitle>
                <CardDescription>NoSQL database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Flexible document database with powerful querying capabilities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>JWT Auth</CardTitle>
                <CardDescription>Secure authentication</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Token-based authentication with secure password hashing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shadcn/ui</CardTitle>
                <CardDescription>Beautiful components</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Accessible and customizable UI components built with Radix UI.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
