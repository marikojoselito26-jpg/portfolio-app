# Portfolio Manager - CRUD Web App

A full-stack portfolio management web application built with **React**, **TypeScript**, **Next.js**, **Prisma ORM**, and **MySQL**. Deployed on **Vercel** with a serverless MySQL database.

## Features

- ✅ **Create** - Add new portfolio items with title, description, technologies, and dates
- ✅ **Read** - View all portfolios or filter featured items
- ✅ **Update** - Edit existing portfolio entries
- ✅ **Delete** - Remove portfolio items
- 🎨 **Responsive UI** - Built with Tailwind CSS for mobile-friendly design
- 🗄️ **MySQL Database** - Persistent data storage with Prisma ORM
- 🚀 **Vercel Ready** - Optimized for serverless deployment

## Tech Stack

- **Frontend**: React 18, TypeScript, Next.js 14+
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MySQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Package Manager**: npm

## Project Structure

```
portfolio-app/
├── app/
│   ├── api/
│   │   └── portfolios/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── create/
│   │   └── page.tsx
│   ├── edit/
│   │   └── [id]/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── PortfolioForm.tsx
│   ├── PortfolioCard.tsx
│   └── PortfolioList.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

## Prerequisites

- Node.js 16+ and npm
- MySQL 5.7+

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Update `.env.local`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/portfolio_db"
```

### 3. Initialize Database
```bash
npx prisma db push
npx prisma generate
```

### 4. Start Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Available Commands

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## API Reference

### GET /api/portfolios
Get all portfolios or filter featured: `?featured=true`

### POST /api/portfolios
Create new portfolio

### GET /api/portfolios/:id
Get single portfolio

### PUT /api/portfolios/:id
Update portfolio

### DELETE /api/portfolios/:id
Delete portfolio

## Database Schema

```prisma
model Portfolio {
  id           Int       @id @default(autoincrement())
  title        String    @db.VarChar(255)
  description  String    @db.Text
  link         String?   @db.VarChar(500)
  image        String?   @db.VarChar(500)
  category     String    @default("Project")
  startDate    DateTime
  endDate      DateTime?
  technologies String?   @db.VarChar(500)
  featured     Boolean   @default(false)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

## Deploy to Vercel

### 1. Prepare Code
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Push to GitHub
```bash
git remote add origin https://github.com/yourusername/portfolio-app.git
git push -u origin main
```

### 3. Deploy on Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "New Project" → Import your repository
3. Add environment variable `DATABASE_URL` with your MySQL connection string
4. Click "Deploy"

## Recommended MySQL Services for Vercel

- **PlanetScale**: Free tier, MySQL compatible (recommended)
- **AWS RDS**: Amazon's managed MySQL
- **DigitalOcean**: Managed database service
- **Google Cloud SQL**: Cloud-hosted MySQL

## Troubleshooting

**Database Connection Error**
- Check DATABASE_URL format
- Verify MySQL credentials
- Ensure database exists

**Prisma Issues**
```bash
npx prisma generate
npm install
```

**Build Errors**
```bash
npm run build
```

## License

MIT
