# Vercel Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (free at vercel.com)
- MySQL database (PlanetScale recommended for free tier)

## Step 1: Set Up MySQL Database

### Option A: PlanetScale (Recommended - Free)
1. Go to https://planetscale.com
2. Create a free account
3. Create a new database
4. Generate a password and copy the connection string
5. Connection format: `mysql://user:password@aws.connect.psdb.cloud/database_name?sslaccept=strict`

### Option B: Other MySQL Services
- AWS RDS
- DigitalOcean Managed Databases
- Google Cloud SQL
- Railway.app (free tier available)

## Step 2: Prepare for Git

Make sure your project is git-ready:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio CRUD app"
```

## Step 3: Push to GitHub

```bash
# Create a new repository on GitHub (don't initialize with README)

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio-app.git

# Rename branch to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Deploy to Vercel

### Using Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Paste your GitHub repository URL
5. Click "Import"
6. Click "Environment Variables"
7. Add the following variables:
   - **Name**: `DATABASE_URL`
   - **Value**: Your MySQL connection string from Step 1

8. Click "Deploy"
9. Wait for deployment to complete (usually 1-3 minutes)

### Using Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables when prompted
```

## Step 5: Run Prisma Migrations on Production

After deployment, you need to create the database schema:

```bash
# Set DATABASE_URL to production
export DATABASE_URL="your-production-mysql-url"

# Run migrations
npx prisma db push
```

Or use Vercel's environment variables and run:

```bash
npx prisma db push --skip-generate
```

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Click "+ New Portfolio" to create a test entry
3. Verify CRUD operations work

## Troubleshooting

### Build Fails with "DATABASE_URL not set"
- Make sure DATABASE_URL is added to Vercel environment variables
- Redeploy after adding the variable

### Database Connection Error
- Verify your MySQL connection string is correct
- Check IP whitelisting (if applicable)
- Ensure database credentials are accurate
- PlanetScale: Make sure SSL mode is set correctly

### 502 Bad Gateway Errors
- Wait 2-3 minutes for deployment to fully initialize
- Check Vercel deployment logs for Prisma errors
- Verify DATABASE_URL is properly formatted

### Prisma Client Not Found
```bash
npx prisma generate
```

## Updating Your App

After deploying, make changes locally and push to GitHub:

```bash
# Make changes
git add .
git commit -m "Description of changes"
git push

# Vercel automatically deploys on push
```

## Environment Variables Reference

### Local Development (.env.local)
```env
DATABASE_URL="mysql://root:password@localhost:3306/portfolio_db"
```

### Production (Vercel Dashboard)
```env
DATABASE_URL="mysql://user:password@host.connect.psdb.cloud/database?sslaccept=strict"
```

## Useful Commands

```bash
# View database locally
npx prisma studio

# Check schema
npx prisma validate

# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name add_feature

# Reset database (warning: deletes all data)
npx prisma migrate reset
```

## Performance Tips

1. **Add Database Indexes**: Already configured in schema.prisma
2. **Use Caching**: Add Next.js ISR (Incremental Static Regeneration)
3. **Monitor Database**: PlanetScale provides insights dashboard
4. **Connection Pooling**: Enable in PlanetScale settings

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use environment variables for secrets
3. ✅ Enable SSL/TLS for database connections
4. ✅ Use strong passwords for database
5. ✅ Regularly update dependencies: `npm update`
6. ✅ Review GitHub security alerts

## Scaling Your App

When ready to scale:

1. Add authentication (NextAuth.js)
2. Implement image uploads (Cloudinary/AWS S3)
3. Add caching layer (Redis)
4. Optimize database queries
5. Use CDN for static assets (Vercel provides this)

## Cost Estimates

- **Vercel**: Free tier includes generous limits
- **PlanetScale**: Free tier (1 GB storage, 5 reqs/sec)
- **Total for hobby project**: $0/month

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- PlanetScale Docs: https://planetscale.com/docs
