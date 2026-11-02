import { adicionarAoCarrinho, listarCarrinho, removerDoCarrinho, alterarQuantidade, carrinho, calcularSubtotal, calcularTotal, listarItensDetalhados, limparCarrinho} from "./carrinho";
import { finalizarPedido, listarPedidos, listarPedidosDoCliente } from "./pedidos";
import { buscarClientePorId, cadastrarCliente, listarClientes } from "./clientes";
import {
    produtos,
    listarProdutos,
    buscarProdutoPorId,
    buscarProdutosPorNome,
    filtrarPorCategoria,
    cadastrarProduto,
    removerProduto,
    atualizarProduto,
} from "./produtos";

console.log("=== Sistema de Gerenciamento de E-commerce ===");
console.log("\n--- Lista de produtos ---");
console.table(listarProdutos());

console.log("\n--- Busca por id 3 ---");
console.log(buscarProdutoPorId(3));
console.log(buscarProdutoPorId(99));

console.log("\n--- Busca por nome de produto ---");
console.log(buscarProdutosPorNome("geladeira"));

console.log("\n--- Busca por categoria ---");
console.log(filtrarPorCategoria("PAPELARIA"))

console.log("\n--- Cadastro de produto ---");
console.log(cadastrarProduto({ id: 8, nome: "mochila", categoria: "papelaria", preco: 120, estoque: 10 }));
console.log(`Total de produtos: ${listarProdutos().length}`);

console.log("\n--- Cadastro inválido: nome vazio ---");
console.log(cadastrarProduto({ id: 8, nome: "", categoria: "papelaria", preco: 120, estoque: 10 }));
console.log(`Total de produtos: ${listarProdutos().length}`);

console.log("\n--- Cadastro inválido: preço zero ou negativo ---");
console.log(cadastrarProduto({ id: 8, nome: "azul", categoria: "papelaria", preco: 0, estoque: 10 }));
console.log(cadastrarProduto({ id: 8, nome: "vermelho", categoria: "papelaria", preco: -10, estoque: 10 }));

console.log("\n--- Cadastro inválido: estoque menor que 0 ---");
console.log(cadastrarProduto({ id: 8, nome: "azul", categoria: "papelaria", preco: 1, estoque: -10 }));
console.log(cadastrarProduto({ id: 9, nome: "vermelho", categoria: "papelaria", preco: 2, estoque: 0 }));

console.log("\n--- Cadastro inválido: id já existente ---");
console.log(cadastrarProduto({ id: 8, nome: "azul", categoria: "papelaria", preco: 1, estoque: 10 }));

console.log("\n--- Remoção de produto ---");
console.log(removerProduto(2));
console.log(`Total de produtos: ${listarProdutos().length}`);

console.log(removerProduto(99));
console.log(`Total de produtos: ${listarProdutos().length}`);

console.log(removerProduto(1));
console.log(`Total de produtos: ${listarProdutos().length}`);

console.log("\n--- Atualização de produto ---");
console.log(atualizarProduto(3, { preco: 250 }));
console.log(atualizarProduto(99, { preco: 250 }));

console.log(atualizarProduto(3, { preco: 250 }));
console.log(atualizarProduto(3, { preco: -5 }));
console.log(atualizarProduto(3, { estoque: 40 }));
console.log(atualizarProduto(3, { nome: "monitor 24 polegadas", estoque: 40 }));
console.log(atualizarProduto(3, { nome: "   " }));
console.log(buscarProdutoPorId(3));

console.log("\n--- Atualização parcialmente inválida ---");
console.log(atualizarProduto(4, { preco: 999, nome: "" }));
console.log(buscarProdutoPorId(4));

console.table(listarClientes());
console.log(buscarClientePorId(3));
console.log(buscarClientePorId(99));

console.log(cadastrarCliente({ id: 4, nome: "Deivin", email: "deivin@gmail.com" }));
console.log(cadastrarCliente({ id: 5, nome: "", email: "testevazio@gmail.com" }));
console.log(cadastrarCliente({ id: 6, nome: "Dev", email: "" }));
console.log(cadastrarCliente({ id: 1, nome: "Alho", email: "alho29@gmail.com" }));
console.log(cadastrarCliente({ id: 7, nome: "Atchim", email: "ANA1313@GMAIL.COM" }));

console.log("\n=== CARRINHO DE COMPRAS ===");

console.log("\n--- Adição válida ---");
console.log(adicionarAoCarrinho(3, 2));
console.log(adicionarAoCarrinho(4, 5));
console.table(listarCarrinho());

console.log("\n--- Adicionar o mesmo produto de novo ---");
console.log(adicionarAoCarrinho(3, 1));
console.table(listarCarrinho());

console.log("\n--- Adição inválida: quantidade zero ou negativa ---");
console.log(adicionarAoCarrinho(3, 0));
console.log(adicionarAoCarrinho(3, -1));

console.log("\n--- Adição inválida: produto inexistente ---");
console.log(adicionarAoCarrinho(99, 1));

console.log("\n--- Adição inválida: quantidade acima do estoque ---");
console.log(adicionarAoCarrinho(3, 1000));

console.log("\n--- Carrinho final (os inválidos não devem aparecer) ---");
console.table(listarCarrinho());

console.log("\n--- Somando acima do estoque ---");
console.log(adicionarAoCarrinho(3, 38));
console.table(listarCarrinho());

console.log("\n--- Remover do carrinho ---");
console.log(removerDoCarrinho(4));
console.log(removerDoCarrinho(99));
console.table(listarCarrinho());

console.log("\n--- Alterar quantidade ---");
console.log(alterarQuantidade(3, 5));
console.log(alterarQuantidade(3, 0));
console.log(alterarQuantidade(99, 2));
console.log(alterarQuantidade(3, 1000));
console.table(listarCarrinho());

console.log("\n--- Subtotal ---");
console.log(calcularSubtotal(carrinho[0]));

console.log("\n--- Total do carrinho ---");
console.log(adicionarAoCarrinho(4, 2));
console.log(`Total: R$ ${calcularTotal()}`);

console.log("\n--- Itens do carrinho com subtotal ---");
console.log(adicionarAoCarrinho(4, 2));
console.table(listarItensDetalhados());
console.log(`Total do carrinho: R$ ${calcularTotal().toFixed(2)}`);

console.log("\n=== PEDIDOS ===");

console.log("\n--- Estoque antes da compra ---");
console.log(buscarProdutoPorId(3));
console.log(buscarProdutoPorId(4));

console.log("\n--- Finalização válida (cliente 1) ---");
console.log(finalizarPedido(1));
console.log("Carrinho após o pedido:", listarCarrinho());

console.log("\n--- Estoque depois da compra ---");
console.log(buscarProdutoPorId(3));
console.log(buscarProdutoPorId(4));

console.log("\n--- Inválido: carrinho vazio ---");
console.log(finalizarPedido(1));

console.log("\n--- Inválido: cliente inexistente ---");
console.log(adicionarAoCarrinho(5, 1));
console.log(finalizarPedido(99));

console.log("\n--- Inválido: estoque insuficiente (nada pode ser descontado) ---");
console.log(adicionarAoCarrinho(6, 10));
console.log(atualizarProduto(6, { estoque: 2 }));
console.log(finalizarPedido(2));
console.log("Estoque do produto 5 (não pode ter mudado):", buscarProdutoPorId(5)?.estoque);
limparCarrinho();

console.log("\n--- Preço histórico ---");
console.log(atualizarProduto(3, { preco: 999 }));
console.log("Preço no pedido 1:", listarPedidos()[0]?.itens[0]?.precoUnitario);

console.log("\n--- Todos os pedidos ---");
console.log(JSON.stringify(listarPedidos(), null, 2));

console.log("\n--- Pedidos do cliente 1 ---");
console.log(listarPedidosDoCliente(1).length);
