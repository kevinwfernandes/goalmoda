import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export async function getCart() {
  // TODO: Implementar lógica de autenticação
  const cart = await prisma.cart.findUnique({
    where: { userId: 'temp-user-id' }, // Temporário até implementar auth
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });
  
  return cart;
}
