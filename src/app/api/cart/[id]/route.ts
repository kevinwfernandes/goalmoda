import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// PUT /api/cart/[id] - Atualiza quantidade de um item no carrinho
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { quantity } = await request.json();
    
    const updatedItem = await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity: Number(quantity) }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar item' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[id] - Remove um item do carrinho
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await prisma.cartItem.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover item' },
      { status: 500 }
    );
  }
}