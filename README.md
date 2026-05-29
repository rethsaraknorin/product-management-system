# Product Management System

A mini product management system built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Shadcn/ui, Tailwind CSS v4
- **State Management**: TanStack React Query v5
- **Form Validation**: React Hook Form + Zod
- **HTTP Client**: Axios
- **API**: [DummyJSON](https://dummyjson.com)
- **CI**: GitHub Actions

## Features

- Product list with pagination
- Create product
- Edit product
- Delete product with confirmation dialog
- Responsive design (mobile, tablet, desktop)

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 11+

### Installation

```bash
# Clone the repository
git clone https://github.com/rethsaraknorin/product-management-system.git
cd product-management-system

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
pnpm format       # Format with Prettier
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── common/             # Layout components (Sidebar, DashboardShell)
│   ├── icons/              # Custom SVG icon components
│   └── ui/                 # Base UI components (Input, Checkbox, Skeleton)
├── features/
│   └── products/
│       ├── components/     # Product-specific components
│       ├── hooks/          # React Query hooks
│       ├── schemas/        # Zod validation schemas
│       └── types/          # TypeScript types
└── lib/                    # Axios instance, utilities
```

## CI Pipeline

GitHub Actions runs on every push and pull request to `main`:

1. Lint
2. Type check
3. Build
