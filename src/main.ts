import {
    produtos,
    listarProdutos,
    buscarProdutoPorId,
    buscarProdutosPorNome,
    filtrarPorCategoria,
} from "./produtos";

console.log("=== Sistema de Gerenciamento de E-commerce ===");
console.log("\n--- Lista de produtos ---");
console.table(listarProdutos());

console.log("\n--- Busca por id 3 ---");
console.log(buscarProdutoPorId(3));

console.log("\n--- Busca por nome de produto ---");
console.log(buscarProdutosPorNome("geladeira"));

console.log("\n--- Busca por categoria ---");
console.log(filtrarPorCategoria("PAPELARIA"))