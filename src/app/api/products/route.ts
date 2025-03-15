import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateProductBody {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  team: string;
  size: string;
  stock: number;
}

// GET /api/products - Lista todos os produtos
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

// POST /api/products - Cria um novo produto
export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateProductBody;
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        imageUrl: body.imageUrl,
        team: body.team,
        size: body.size,
        stock: body.stock
      }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
} 