
# eShop – Modern eCommerce Store

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat&logo=redux)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)

A **fully functional, responsive eCommerce store** built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**.

Live Demo: [https://ecommerce-shop-ejh1qf6kg-stives-projects-0794a11c.vercel.app](https://ecommerce-shop-teal-eight.vercel.app/login)

---

## Features

| Feature | Status |
|-------|--------|
| Browse & Search Products | Complete |
| Product Details Page | Complete |
| Add to Favorites | Complete |
| Create / Edit / Delete Products | Complete |
| Login Required (All Pages) | Complete |
| Dark Mode | Complete |
| Mobile Responsive | Complete |
| Instant Login Redirect | Complete |
| Middleware Protection | Complete |
| Toast Notifications | Complete |
| Loading States & Skeletons | Complete |

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **State**: Redux Toolkit + React-Redux
- **Routing**: Next.js App Router + `next/navigation`
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Toast**: Sonner
- **Theme**: `next-themes`
- **Deployment**: Vercel

---

## Project Structure

```
src/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx              → Home
│   │   ├── create/page.tsx       → Create Product
│   │   ├── edit/[id]/page.tsx    → Edit Product
│   │   ├── favorites/page.tsx   → Favorites
│   │   ├── login/page.tsx        → Login
│   │   ├── product/[id]/page.tsx → Product Details
│   │   └── search/page.tsx       → Search Results
│   └── layout.tsx                → Root Layout + Auth Sync
├── components/
│   ├── layout/Navbar.tsx         → Responsive Nav
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   └── ProductDetails.tsx
│   └── common/
│       ├── SearchBar.tsx
│       ├── Loader.tsx
│       └── ErrorMessage.tsx
├── lib/
│   ├── api/productsApi.ts        
│   └── store/
│       ├── authSlice.ts
│       ├── favoritesSlice.ts
│       └── index.ts
├── providers/
│   └── ReduxProvider.tsx
└── middleware.ts                 
```

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/ecommerce-shop.git
cd ecommerce-shop
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Authentication (Mock)

- **Email**: Any valid email
- **Password**: `password123`

> All pages **require login** except `/login`  
> Uses `mock-auth` cookie 

---

## Deployment

Deployed with Vercel:

--

## Middleware Protection

```ts
// src/middleware.ts
// Blocks all pages except /login
// Remembers redirect path
// Works on Vercel Edge
```

---

## Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
  }
}
```

---

## Contributing

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## License

MIT © Estifanos


---

**Built with love using Next.js 16**
