import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/cart - Busca o carrinho do usuário
export async function GET(request: Request) {
  try {
    // TODO: Implementar autenticação e pegar userId do token
    const userId = 'user_id'; // Temporário
    
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar carrinho' }, { status: 500 });
  }
}

// POST /api/cart - Adiciona item ao carrinho
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Implementar autenticação e pegar userId do token
    const userId = 'user_id'; // Temporário

    // Busca ou cria o carrinho do usuário
    let cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      });
    }

    // Adiciona o item ao carrinho
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: body.productId,
        quantity: body.quantity
      },
      include: {
        product: true
      }
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar item ao carrinho' }, { status: 500 });
  }
} 