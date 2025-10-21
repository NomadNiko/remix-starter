import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireAuth } from "../lib/auth.server";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuth(request);
  return json({ user });
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <div className="flex gap-4 items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.email}
              </span>
              <Button asChild variant="outline">
                <Link to="/logout">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user.name}!</CardTitle>
              <CardDescription>
                You are successfully logged in to your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">User ID:</span> {user._id}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Account created:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protected Route</CardTitle>
              <CardDescription>
                This page is only accessible to authenticated users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The dashboard route uses the <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">requireAuth</code> helper
                to ensure that only authenticated users can access this page.
                If a non-authenticated user tries to access this page, they will
                be automatically redirected to the login page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Start building your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Add more routes to your application</li>
                <li>Create additional UI components</li>
                <li>Extend the user model with more fields</li>
                <li>Add more features to the dashboard</li>
                <li>Customize the styling to match your brand</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
