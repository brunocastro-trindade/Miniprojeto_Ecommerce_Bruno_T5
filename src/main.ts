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

console.table(listarClientes())
console.log(buscarClientePorId(3))
console.log(buscarClientePorId(99))

console.log(cadastrarCliente({ id: 4, nome: "Deivin", email: "deivin@gmail.com" }))
console.log(cadastrarCliente({ id: 5, nome: "", email: "testevazio@gmail.com" }))
console.log(cadastrarCliente({ id: 1, nome: "Dev", email: "" }))
console.log(cadastrarCliente({ id: 1, nome: "Alho", email: "alho29@gmail.com" }))
console.log(cadastrarCliente({ id: 7, nome: "Atchim", email: "ANA1313@GMAIL.COM" }))
