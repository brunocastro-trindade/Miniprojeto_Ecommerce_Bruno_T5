import { Produto } from "./types";

export const produtos: Produto[] = [
    { id: 1, nome: "mouse sem fio", categoria: "informatica", preco: 80, estoque: 50 },
    { id: 2, nome: "teclado", categoria: "informatica", preco: 50, estoque: 20 },
    { id: 3, nome: "monitor", categoria: "informatica", preco: 200, estoque: 30 },
    { id: 4, nome: "caderno", categoria: "papelaria", preco: 20, estoque: 100 },
    { id: 5, nome: "agenda", categoria: "papelaria", preco: 30, estoque: 50 },
    { id: 6, nome: "projetor", categoria: "informatica", preco: 350, estoque: 15 },
    { id: 7, nome: "caneta", categoria: "papelaria", preco: 2, estoque: 100},
];

export function listarProdutos(): Produto[] {
    return produtos;
}

export function buscarProdutoPorId(id: number): Produto | undefined {
    return produtos.find((p) => p.id === id);
}

export function buscarProdutosPorNome(termo: string): Produto[] {
    const termoLimpo = termo.trim().toLowerCase();
    return produtos.filter((p) => p.nome.toLowerCase().includes(termoLimpo));
}

export function filtrarPorCategoria(categoria: string): Produto[] {
    const categoriaLimpa = categoria.trim().toLowerCase();
    return produtos.filter((p) => p.categoria.toLowerCase() === categoriaLimpa);
}