import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { createUser, getUserByEmail } from "../models/user.server";
import { createToken, createAuthCookie, getUserFromRequest } from "../lib/auth.server";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromRequest(request);
  if (user) {
    return redirect("/dashboard");
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string"
  ) {
    return json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }

  if (!email || !password || !name) {
    return json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { error: "Password must be at least 8 characters long" },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      { error: "A user with this email already exists" },
      { status: 400 }
    );
  }

  const user = await createUser(email, password, name);
  const token = createToken(user._id);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": createAuthCookie(token),
    },
  });
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="new-password"
                minLength={8}
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters long
              </p>
            </div>
            {actionData?.error && (
              <div className="text-sm text-destructive">
                {actionData.error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:underline">
              Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
