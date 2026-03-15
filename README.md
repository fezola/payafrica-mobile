# PayAfrica Mobile App

A standalone mobile web application (PWA) for PayAfrica - Send money across Africa.

## Features

- 🔐 **Authentication** - Email/password signup and login
- 💰 **USDC Wallet** - Store funds as USDC
- 📱 **PayAfrica ID** - Send money using unique username
- 🏦 **Local Deposits** - Deposit in Naira, KES, Cedis and more
- 🔄 **Instant Transfers** - Send money instantly across Africa
- 📲 **PWA Support** - Install as native app on mobile

## Tech Stack

- React 18 + TypeScript
- Vite + Vite PWA
- Tailwind CSS
- Supabase Auth
- React Router v6

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## PWA Features

The app includes:
- Offline support
- Install as native app
- Background sync
- Push notifications (configurable)
- App shell caching

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Deploy from CLI
npm i -g vercel
vercel --prod
```

## Project Structure

```
mobile-app/
├── src/
│   ├── components/      # UI components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   ├── mobile/         # Mobile pages
│   ├── App.tsx         # Main app
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.ts      # Vite config with PWA
└── tailwind.config.js  # Tailwind config
```

## License

MIT
