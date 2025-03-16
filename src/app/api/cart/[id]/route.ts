import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/cart/[id] - Atualiza quantidade de um item no carrinho
export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();
    const { quantity } = await request.json();
    
    const updatedItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity: Number(quantity) }
    });

    return Response.json(updatedItem);
  } catch (error) {
    return Response.json(
      { error: 'Erro ao atualizar item' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[id] - Remove um item do carrinho
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();

    await prisma.cartItem.delete({
      where: { id }
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: 'Erro ao remover item' },
      { status: 500 }
    );
  }
}