import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portfolioId = parseInt(id);

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch portfolio', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portfolioId = parseInt(id);
    const data = await request.json();

    const portfolio = await prisma.portfolio.update({
      where: { id: portfolioId },
      data: {
        title: data.title,
        description: data.description,
        link: data.link || null,
        image: data.image || null,
        category: data.category,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : null,
        technologies: data.technologies || null,
        featured: data.featured,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update portfolio', details: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portfolioId = parseInt(id);

    await prisma.portfolio.delete({
      where: { id: portfolioId },
    });

    return NextResponse.json(
      { message: 'Portfolio deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete portfolio', details: error.message },
      { status: 500 }
    );
  }
}
