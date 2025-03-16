import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products/[id]
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();
    
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return Response.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    return Response.json({ error: 'Erro ao buscar produto' }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();
    const body = await request.json();
    
    const product = await prisma.product.update({
      where: { id },
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
    
    return Response.json(product);
  } catch (error) {
    return Response.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();
    
    await prisma.product.delete({
      where: { id }
    });
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Erro ao deletar produto' }, { status: 500 });
  }
} 