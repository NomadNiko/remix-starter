# Remix Starter Template

A modern, production-ready full-stack starter template built with Remix, MongoDB, JWT Authentication, Shadcn/ui, and TypeScript.

## Features

- **Remix** - Full-stack React framework with server-side rendering
- **TypeScript** - Type-safe development
- **MongoDB** - Flexible NoSQL database
- **JWT Authentication** - Secure token-based authentication
- **Shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## Project Structure

```
remix-starter/
├── app/
│   ├── components/
│   │   └── ui/          # Shadcn/ui components
│   ├── lib/
│   │   ├── auth.server.ts    # JWT authentication utilities
│   │   ├── db.server.ts      # MongoDB connection
│   │   └── utils.ts          # Utility functions
│   ├── models/
│   │   └── user.server.ts    # User model and database operations
│   ├── routes/
│   │   ├── _index.tsx        # Home page
│   │   ├── login.tsx         # Login page
│   │   ├── register.tsx      # Registration page
│   │   ├── logout.tsx        # Logout handler
│   │   └── dashboard.tsx     # Protected dashboard
│   ├── styles/
│   │   └── globals.css       # Global styles with Tailwind
│   ├── entry.client.tsx      # Client entry point
│   ├── entry.server.tsx      # Server entry point
│   └── root.tsx              # Root component
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd remix-starter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure your settings:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=remix-starter
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Start MongoDB:
```bash
# If running MongoDB locally
mongod
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Authentication

The starter includes a complete authentication system:

### Registration
- Navigate to `/register`
- Create an account with email, password, and name
- Passwords are hashed using bcrypt
- Automatically logged in after registration

### Login
- Navigate to `/login`
- Enter email and password
- JWT token stored in HTTP-only cookie

### Protected Routes
- Use `requireAuth` helper in loaders to protect routes
- Example in `app/routes/dashboard.tsx`:
```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuth(request);
  return json({ user });
}
```

### Logout
- Visit `/logout` to clear authentication

## Database

### MongoDB Connection
The MongoDB connection is configured in `app/lib/db.server.ts`:
- Singleton pattern for development (prevents connection pooling issues)
- Configurable database name and URI via environment variables

### User Model
Located in `app/models/user.server.ts`:
```typescript
interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

Available functions:
- `getUserByEmail(email)` - Find user by email
- `getUserById(id)` - Find user by ID
- `createUser(email, password, name)` - Create new user
- `verifyLogin(email, password)` - Verify credentials

## UI Components

This starter includes several Shadcn/ui components:

- `Button` - Customizable button with variants
- `Input` - Form input component
- `Label` - Form label component
- `Card` - Container component with header, content, footer

### Adding More Components

To add more Shadcn/ui components, manually create them in `app/components/ui/` following the Shadcn/ui documentation.

## Styling

The project uses Tailwind CSS with custom design tokens:
- CSS variables for theming (light/dark mode support)
- Custom color palette
- Responsive utilities

Modify `tailwind.config.js` and `app/styles/globals.css` to customize the design system.

## Deployment

### Environment Variables

Ensure these are set in production:
- `MONGODB_URI` - Your MongoDB connection string
- `MONGODB_DB` - Database name
- `JWT_SECRET` - Strong secret key for JWT signing
- `NODE_ENV=production`

### Build

```bash
npm run build
npm start
```

### Platforms

This Remix app can be deployed to:
- Vercel
- Netlify
- Fly.io
- Railway
- Any Node.js hosting platform

Refer to [Remix deployment docs](https://remix.run/docs/en/main/guides/deployment) for platform-specific instructions.

## Security Considerations

- **JWT Secret**: Use a strong, random secret in production
- **HTTPS**: Always use HTTPS in production
- **Password Requirements**: Minimum 8 characters (customize in `app/routes/register.tsx`)
- **MongoDB**: Use authentication and secure connection strings
- **Environment Variables**: Never commit `.env` to version control

## Customization

### Adding New Routes

Create files in `app/routes/`:
```typescript
// app/routes/about.tsx
export default function About() {
  return <div>About Page</div>;
}
```

### Adding API Routes

Create route files with action/loader functions:
```typescript
// app/routes/api.users.tsx
export async function loader() {
  return json({ users: [] });
}
```

### Extending User Model

Modify `app/models/user.server.ts` to add fields:
```typescript
interface User {
  // ... existing fields
  avatar?: string;
  role?: string;
}
```

## Tech Stack Details

- **Remix 2.x** - React framework
- **React 19** - UI library
- **TypeScript 5.x** - Type safety
- **MongoDB 6.x** - Database
- **Vite** - Build tool
- **Tailwind CSS 4.x** - Styling
- **Radix UI** - Accessible component primitives
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT handling

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this starter for any project.

## Resources

- [Remix Documentation](https://remix.run/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

For questions and support, please open an issue in the repository.
