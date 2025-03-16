import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/cart/[id] - Atualiza quantidade de um item no carrinho
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const cartItem = await prisma.cartItem.update({
      where: { id: params.id },
      data: {
        quantity: body.quantity
      },
      include: {
        product: true
      }
    });
    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar item do carrinho' }, { status: 500 });
  }
}

// DELETE /api/cart/[id] - Remove um item do carrinho
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.cartItem.delete({
      where: { id: params.id }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover item do carrinho' }, { status: 500 });
  }
} 