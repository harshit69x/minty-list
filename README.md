
# Minty List

Minty List is a modern Next.js application for managing notes, featuring authentication and a dashboard UI. It uses Supabase for backend services and is styled with custom components.

## Features
- User authentication (login/signup)
- Dashboard for managing notes
- Responsive UI with reusable components
- Supabase integration

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn)
- Supabase project (for environment variables)

## Getting Started

### 1. Clone the Repository
```powershell
# Using PowerShell
git clone https://github.com/your-username/minty-list.git
cd minty-list
```

### 2. Install Dependencies
```powershell
pnpm install
# or
npm install --forece --legacy-peer-deps
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following content:
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-supabase-anon-key>"
NEXT_PUBLIC_SUPABASE_URL="<your-supabase-url>"
```
Replace `<your-supabase-anon-key>` and `<your-supabase-url>` with your Supabase project's credentials.

### 4. Run the Development Server
```powershell
pnpm dev
# or
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `app/` — Next.js app routes and pages
- `components/` — UI and feature components
- `hooks/` — Custom React hooks
- `lib/` — Utility libraries (e.g., Supabase client)
- `public/` — Static assets
- `styles/` — Global styles

## Scripts
- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm start` — Start production server

## Deployment
You can deploy this app to Vercel, Netlify, or any platform supporting Next.js. Make sure to set the environment variables in your deployment settings.

## License
MIT
