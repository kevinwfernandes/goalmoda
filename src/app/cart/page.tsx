import { getCart } from '@/lib/prisma'
import CartItems from './CartItems'

export default async function CartPage() {
  const cart = await getCart()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      {cart?.items.length > 0 ? (
        <>
          <CartItems cart={cart} />
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Finalizar Compra</h2>
            <form action="/api/checkout" method="POST">
              <div className="max-w-md space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Seu email"
                  required
                  className="w-full px-4 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Finalizar Compra
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Seu carrinho está vazio</p>
      )}
    </div>
  )
}
