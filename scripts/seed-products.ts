const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Camisa do Corinthians',
      description: 'Camisa oficial do Sport Club Corinthians Paulista, temporada 2024',
      price: 299.90,
      imageUrl: '/images/corinthians.jpg',
      team: 'Corinthians',
      size: 'M',
      stock: 50
    },
    {
      name: 'Camisa do Flamengo',
      description: 'Camisa oficial do Clube de Regatas do Flamengo, temporada 2024',
      price: 299.90,
      imageUrl: '/images/flamengo.jpg',
      team: 'Flamengo',
      size: 'M',
      stock: 50
    },
    {
      name: 'Camisa do Vasco',
      description: 'Camisa oficial do Club de Regatas Vasco da Gama, temporada 2024',
      price: 279.90,
      imageUrl: '/images/vasco.jpg',
      team: 'Vasco',
      size: 'M',
      stock: 50
    },
    {
      name: 'Camisa do Fluminense',
      description: 'Camisa oficial do Fluminense Football Club, temporada 2024',
      price: 279.90,
      imageUrl: '/images/fluminense.jpg',
      team: 'Fluminense',
      size: 'M',
      stock: 50
    },
    {
      name: 'Camisa do Santos',
      description: 'Camisa oficial do Santos Futebol Clube, temporada 2024',
      price: 279.90,
      imageUrl: '/images/santos.jpg',
      team: 'Santos',
      size: 'M',
      stock: 50
    }
  ];

  for (const product of products) {
    try {
      await prisma.product.create({
        data: product
      });
      console.log(`Produto ${product.name} criado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao criar produto ${product.name}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 