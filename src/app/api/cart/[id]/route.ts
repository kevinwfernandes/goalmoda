import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/cart/[id] - Atualiza quantidade de um item no carrinho
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { quantity } = await request.json();
    const { id } = context.params;

    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity }
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar item do carrinho' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[id] - Remove um item do carrinho
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    await prisma.cartItem.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Item removido do carrinho' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover item do carrinho' },
      { status: 500 }
    );
  }
} 