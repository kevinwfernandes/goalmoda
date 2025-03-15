'use client'
import { useState } from 'react'

export default function Home() {
  const [carrinhoQuantidade, setCarrinhoQuantidade] = useState(0);
  const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<Array<{ id: number; quantidade: number }>>([]);
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const produtos = [
    {
      id: 1,
      nome: "Camisa do Flamengo",
      preco: 299.90,
      imagem: "/images/flamengo.jpg",
      descricao: "Camisa Oficial do Flamengo 2024"
    },
    {
      id: 2,
      nome: "Camisa do Corinthians",
      preco: 299.90,
      imagem: "/images/corinthians.jpg",
      descricao: "Camisa Oficial do Corinthians 2024"
    },
    {
      id: 3,
      nome: "Camisa do Santos",
      preco: 279.90,
      imagem: "/images/santos.jpg",
      descricao: "Camisa Oficial do Santos 2024"
    },
    {
      id: 4,
      nome: "Camisa do Vasco",
      preco: 279.90,
      imagem: "/images/vasco.jpg",
      descricao: "Camisa Oficial do Vasco 2024"
    },
    {
      id: 5,
      nome: "Camisa do Fluminense",
      preco: 279.90,
      imagem: "/images/fluminense.jpg",
      descricao: "Camisa Oficial do Fluminense 2024"
    }
  ];

  const adicionarAoCarrinho = (produtoId: number) => {
    // Atualiza a quantidade total no carrinho
    setCarrinhoQuantidade(prev => prev + 1);

    // Atualiza a lista de produtos no carrinho
    setProdutosNoCarrinho(prev => {
      const produtoExistente = prev.find(item => item.id === produtoId);
      if (produtoExistente) {
        return prev.map(item =>
          item.id === produtoId
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { id: produtoId, quantidade: 1 }];
    });

    // Efeito visual de confirmação
    const button = document.getElementById(`btn-comprar-${produtoId}`);
    if (button) {
      button.textContent = "✓ Adicionado!";
      button.classList.add("bg-green-600");
      setTimeout(() => {
        button.textContent = "Comprar";
        button.classList.remove("bg-green-600");
      }, 1000);
    }
  };

  const limparCarrinho = () => {
    setCarrinhoQuantidade(0);
    setProdutosNoCarrinho([]);
  };

  const getProdutoInfo = (id: number) => {
    return produtos.find(p => p.id === id);
  };

  const calcularTotal = () => {
    return produtosNoCarrinho.reduce((total, item) => {
      const produto = getProdutoInfo(item.id);
      return total + (produto?.preco || 0) * item.quantidade;
    }, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-100 w-full py-1">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-end space-x-4 text-xs text-gray-600">
            <a href="#" className="hover:text-blue-600">Acessibilidade</a>
            <a href="#" className="hover:text-blue-600">Tire suas dúvidas</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b w-full">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">GOAL MODA</h1>

            {/* Search Bar - Esconde em mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="O que você procura?"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                  🔍
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Botão de busca mobile */}
              <button className="md:hidden text-gray-600 hover:text-blue-600">
                🔍
              </button>
              
              <a href="#" className="hidden md:block text-gray-600 hover:text-blue-600">
                Entrar
              </a>
              <a href="#" className="hidden md:block text-gray-600 hover:text-blue-600">
                Favoritos
              </a>
              <div className="relative group">
                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
                  Carrinho
                  {carrinhoQuantidade > 0 && (
                    <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {carrinhoQuantidade}
                    </span>
                  )}
                </a>
                
                {/* Dropdown do Carrinho */}
                {carrinhoQuantidade > 0 && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border hidden group-hover:block z-50">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Seu Carrinho</h3>
                      <div className="space-y-3 max-h-60 overflow-auto">
                        {produtosNoCarrinho.map((item) => {
                          const produto = getProdutoInfo(item.id);
                          return produto ? (
                            <div key={item.id} className="flex items-center gap-3">
                              <img 
                                src={produto.imagem} 
                                alt={produto.nome} 
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{produto.nome}</p>
                                <p className="text-xs text-gray-500">Qtd: {item.quantidade}</p>
                              </div>
                              <p className="text-sm font-semibold">
                                R$ {(produto.preco * item.quantidade).toFixed(2)}
                              </p>
                            </div>
                          ) : null;
                        })}
                      </div>
                      <div className="border-t mt-3 pt-3">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>R$ {calcularTotal().toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={limparCarrinho}
                          className="w-full mt-3 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                        >
                          Limpar Carrinho
                        </button>
                        <button 
                          className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          Finalizar Compra
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Menu Hamburguer */}
              <button 
                onClick={() => setMenuAberto(!menuAberto)}
                className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                {menuAberto ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`bg-white border-t ${menuAberto ? 'block' : 'hidden'} md:block`}>
          <div className="max-w-6xl mx-auto px-4">
            <ul className="flex flex-col md:flex-row md:space-x-8 py-3">
              <li className="py-2 md:py-0">
                <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">MASCULINO</a>
              </li>
              <li className="py-2 md:py-0">
                <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">FEMININO</a>
              </li>
              <li className="py-2 md:py-0">
                <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">TIMES</a>
              </li>
              <li className="py-2 md:py-0">
                <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">OFERTAS</a>
              </li>
              <li className="py-2 md:py-0">
                <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">LANÇAMENTOS</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Banner promocional */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold">Camisas Oficiais 2024! ⚽</h2>
            <p className="mt-2 text-lg">Garanta já a sua camisa do time do coração com até 20% de desconto!</p>
          </div>

          {/* Grid de produtos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative pt-[100%]">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{produto.nome}</h3>
                  <p className="text-sm text-gray-600 mt-1">{produto.descricao}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 line-through">R$ {(produto.preco * 1.2).toFixed(2)}</span>
                      <span className="text-xl font-bold text-blue-600">
                        R$ {produto.preco.toFixed(2)}
                      </span>
                    </div>
                    <button
                      id={`btn-comprar-${produto.id}`}
                      onClick={() => adicionarAoCarrinho(produto.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Comprar
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Em até 10x de R$ {(produto.preco / 10).toFixed(2)}</p>
                  {produtosNoCarrinho.find(item => item.id === produto.id) && (
                    <p className="text-xs text-green-600 mt-2">
                      {produtosNoCarrinho.find(item => item.id === produto.id)?.quantidade}x no carrinho
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white w-full py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Institucional</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Sobre a Goal Moda</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Trabalhe Conosco</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Ajuda</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-white">Entregas</a></li>
                <li><a href="#" className="hover:text-white">Meus Pedidos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Pagamento</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Formas de Pagamento</a></li>
                <li><a href="#" className="hover:text-white">Cartões Aceitos</a></li>
                <li><a href="#" className="hover:text-white">Pix</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Redes Sociais</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Goal Moda. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}