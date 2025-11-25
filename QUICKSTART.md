# Quick Start Guide

## Local Development

### 1. Prerequisites
- Node.js 16+
- MySQL 5.7+ running locally

### 2. Setup

```bash
cd portfolio-app

# Install dependencies
npm install

# Update .env.local with your MySQL credentials
# DATABASE_URL="mysql://user:password@localhost:3306/portfolio_db"

# Create database and run migrations
npx prisma db push

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Visit: http://localhost:3000

### 3. Test the App

- **Create**: Click "+ Add Portfolio" to create a new portfolio item
- **Read**: View all portfolios on the home page
- **Update**: Click "Edit" on any portfolio card
- **Delete**: Click "Delete" to remove a portfolio

## Project Structure

```
app/              - Next.js pages and API routes
├── api/
│   └── portfolios/
│       ├── route.ts      - GET all, POST create
│       └── [id]/route.ts - GET, PUT, DELETE single
├── create/
│   └── page.tsx          - Create form page
├── edit/
│   └── [id]/page.tsx     - Edit form page
└── page.tsx              - Home/list page

components/       - React components
├── PortfolioForm.tsx     - Form for create/edit
├── PortfolioCard.tsx     - Portfolio item card
└── PortfolioList.tsx     - Portfolio list container

lib/              - Utilities
└── prisma.ts     - Prisma client instance

prisma/           - Database
└── schema.prisma - Data models
```

## Available Scripts

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npx prisma studio    # Open Prisma Studio GUI for database
npx prisma db push   # Apply schema changes to database
```

## API Endpoints

All endpoints are under `/api/portfolios`

### GET All
```bash
curl http://localhost:3000/api/portfolios
curl http://localhost:3000/api/portfolios?featured=true
```

### POST Create
```bash
curl -X POST http://localhost:3000/api/portfolios \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "A great project",
    "category": "Project",
    "startDate": "2024-01-01",
    "technologies": "React, Node.js",
    "featured": false
  }'
```

### GET Single
```bash
curl http://localhost:3000/api/portfolios/1
```

### PUT Update
```bash
curl -X PUT http://localhost:3000/api/portfolios/1 \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### DELETE
```bash
curl -X DELETE http://localhost:3000/api/portfolios/1
```

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

## Deployment

See `DEPLOYMENT.md` for complete deployment instructions

Quick summary:
1. Set up MySQL (PlanetScale recommended)
2. Push code to GitHub
3. Import repository in Vercel
4. Set `DATABASE_URL` environment variable
5. Deploy!

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js 16, Node.js
- **Database**: MySQL with Prisma ORM
- **Deployment**: Vercel
- **Package Manager**: npm

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Database connection error
- Verify MySQL is running
- Check DATABASE_URL in .env.local
- Ensure credentials are correct

### Prisma errors
```bash
npx prisma generate
npx prisma db push
```

### Clear everything and start fresh
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Clear node_modules
rm -r node_modules
npm install
```

## Next Steps

1. Add authentication (NextAuth.js)
2. Add image uploads (Cloudinary)
3. Implement search/filtering
4. Add pagination
5. Dark mode support
6. Analytics

## Support

- Documentation: README.md, DEPLOYMENT.md
- Issue?: Check error messages in terminal
- Vercel logs: https://vercel.com/dashboard

---

**Happy coding! 🚀**
