import {
    listarProdutos, buscarProdutoPorId, buscarProdutosPorNome, filtrarPorCategoria,
    cadastrarProduto, atualizarProduto, removerProduto,
} from "./produtos";
import { listarClientes, buscarClientePorId, cadastrarCliente } from "./clientes";
import {
    adicionarAoCarrinho, removerDoCarrinho, alterarQuantidade,
    listarItensDetalhados, calcularTotal, limparCarrinho, listarCarrinho,
} from "./carrinho";
import { finalizarPedido, listarPedidos, listarPedidosDoCliente } from "./pedidos";
import { exibirRelatorios } from "./relatorios";

function titulo(texto: string): void {
    console.log(`\n${"=".repeat(60)}\n${texto}\n${"=".repeat(60)}`);
}

console.log("SISTEMA DE GERENCIAMENTO DE E-COMMERCE");

// ---------------------------------------------------------------
titulo("1. PRODUTOS: CONSULTA E CADASTRO");
console.table(listarProdutos());
console.log("Busca por id 3:", buscarProdutoPorId(3));
console.log("Busca por id 99:", buscarProdutoPorId(99));
console.log('Busca por nome "MOU":', buscarProdutosPorNome("MOU"));
console.log('Filtro por categoria "PAPELARIA":', filtrarPorCategoria("PAPELARIA"));

console.log(cadastrarProduto({ id: 8, nome: "mochila", categoria: "papelaria", preco: 120, estoque: 10 }));
console.log(atualizarProduto(3, { preco: 250, estoque: 40 }));
console.log(removerProduto(2));
console.table(listarProdutos());

titulo("2. PRODUTOS: SITUAÇÕES INVÁLIDAS");
console.log(cadastrarProduto({ id: 9, nome: "régua", categoria: "papelaria", preco: -5, estoque: 10 }));
console.log(cadastrarProduto({ id: 9, nome: "   ", categoria: "papelaria", preco: 5, estoque: 10 }));
console.log(cadastrarProduto({ id: 9, nome: "régua", categoria: "papelaria", preco: 5, estoque: -1 }));
console.log(cadastrarProduto({ id: 1, nome: "régua", categoria: "papelaria", preco: 5, estoque: 10 }));
console.log(removerProduto(99));
console.log(atualizarProduto(4, { preco: 999, nome: "" }));
console.log("Caderno continua intacto (sem atualização parcial):", buscarProdutoPorId(4));

// ---------------------------------------------------------------
titulo("3. CLIENTES");
console.table(listarClientes());
console.log("Busca por id 2:", buscarClientePorId(2));
console.log(cadastrarCliente({ id: 4, nome: "Deivin", email: "deivin@gmail.com" }));
console.log(cadastrarCliente({ id: 5, nome: "", email: "vazio@gmail.com" }));
console.log(cadastrarCliente({ id: 5, nome: "Marta", email: "" }));
console.log(cadastrarCliente({ id: 1, nome: "Marta", email: "marta@gmail.com" }));
console.log(cadastrarCliente({ id: 5, nome: "Marta", email: "ANA1313@GMAIL.COM" }));

// ---------------------------------------------------------------
titulo("4. CARRINHO: ADIÇÃO, ALTERAÇÃO E CÁLCULOS");
console.log(adicionarAoCarrinho(3, 2));
console.log(adicionarAoCarrinho(4, 5));
console.log(adicionarAoCarrinho(3, 1));        // mesmo produto: atualiza a linha, não duplica
console.log(alterarQuantidade(4, 2));
console.log(adicionarAoCarrinho(7, 10));
console.log(removerDoCarrinho(7));
console.table(listarItensDetalhados());
console.log(`Total do carrinho: R$ ${calcularTotal().toFixed(2)}`);   // 3 x 250 + 2 x 20 = 790

titulo("5. CARRINHO: SITUAÇÕES INVÁLIDAS");
console.log(adicionarAoCarrinho(3, 0));
console.log(adicionarAoCarrinho(99, 1));
console.log(adicionarAoCarrinho(3, 100));
console.log(alterarQuantidade(99, 1));
console.log(removerDoCarrinho(99));

// ---------------------------------------------------------------
titulo("6. FINALIZAÇÃO DE PEDIDO E ATUALIZAÇÃO DE ESTOQUE");
console.log("Estoque antes  -> monitor:", buscarProdutoPorId(3)?.estoque, "| caderno:", buscarProdutoPorId(4)?.estoque);
console.log(finalizarPedido(1));
console.log("Estoque depois -> monitor:", buscarProdutoPorId(3)?.estoque, "| caderno:", buscarProdutoPorId(4)?.estoque);
console.log("Carrinho após o pedido:", listarCarrinho());

titulo("7. PEDIDOS: SITUAÇÕES INVÁLIDAS");
console.log(finalizarPedido(1));               // carrinho vazio

console.log(adicionarAoCarrinho(6, 10));
console.log(adicionarAoCarrinho(5, 1));
console.log(atualizarProduto(6, { estoque: 2 }));   // o estoque cai depois de o item entrar no carrinho
console.log(finalizarPedido(2));
console.log("Agenda não foi descontada (sem registro parcial):", buscarProdutoPorId(5)?.estoque);
limparCarrinho();

console.log(adicionarAoCarrinho(1, 3));
console.log(finalizarPedido(99));              // cliente inexistente

// ---------------------------------------------------------------
titulo("8. SEGUNDO PEDIDO E PREÇO HISTÓRICO");
console.log(adicionarAoCarrinho(7, 10));
console.log(finalizarPedido(2));
console.log(atualizarProduto(3, { preco: 999 }));
console.log("Preço do monitor no pedido 1 (continua 250):", listarPedidos()[0]?.itens[0]?.precoUnitario);

titulo("9. CONSULTA DE PEDIDOS");
console.log(JSON.stringify(listarPedidos(), null, 2));
console.log("Pedidos do cliente 1:", listarPedidosDoCliente(1).length);
console.log("Pedidos do cliente 3:", listarPedidosDoCliente(3).length);

// ---------------------------------------------------------------
titulo("10. RELATÓRIOS");
exibirRelatorios();
