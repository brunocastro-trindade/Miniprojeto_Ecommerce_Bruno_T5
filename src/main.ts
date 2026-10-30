import {
    produtos,
    listarProdutos,
    buscarProdutoPorId,
    buscarProdutosPorNome,
    filtrarPorCategoria,
    cadastrarProduto,
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

console.log("\n--- Cadastro inválido: preço maior que 0 ---");
console.log(cadastrarProduto({ id: 8, nome: "azul", categoria: "papelaria", preco: 0, estoque: 10 }));
console.log(cadastrarProduto({ id: 8, nome: "vermelho", categoria: "papelaria", preco: -10, estoque: 10 }));

console.log("\n--- Cadastro inválido: estoque menor que 0 ---");
console.log(cadastrarProduto({ id: 8, nome: "azul", categoria: "papelaria", preco: 1, estoque: -10 }));
console.log(cadastrarProduto({ id: 8, nome: "vermelho", categoria: "papelaria", preco: 2, estoque: 0 }));

console.log("\n--- Cadastro inválido: id já existente ---");
console.log(cadastrarProduto({ id: 8, nome: "azul", categoria: "papelaria", preco: 1, estoque: 10 }));