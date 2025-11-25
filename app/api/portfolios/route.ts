import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const where: any = {};
    if (featured === 'true') {
      where.featured = true;
    }

    const portfolios = await prisma.portfolio.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(portfolios);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch portfolios', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const portfolio = await prisma.portfolio.create({
      data: {
        title: data.title,
        description: data.description,
        link: data.link || null,
        image: data.image || null,
        category: data.category || 'Project',
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        technologies: data.technologies || null,
        featured: data.featured || false,
      },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create portfolio', details: error.message },
      { status: 400 }
    );
  }
}
