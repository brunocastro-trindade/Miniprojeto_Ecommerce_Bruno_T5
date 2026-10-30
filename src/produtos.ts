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

export function cadastrarProduto(novo: Produto): string {
    if (novo.nome.trim() === "") {
        return "Erro: o nome do produto não pode estar vazio";
    }
    if (novo.preco <= 0) {
        return "Erro: o preço do produto não pode ser 0 ou negativo";
    }
    if (novo.estoque < 0) {
        return "Erro: o estoque do produto não pode estar negativo";
    }
    if (buscarProdutoPorId(novo.id) !== undefined) {
        return `Erro: já existe um produto com o id ${novo.id}`;
    }
    produtos.push(novo);
    return `Produto "${novo.nome}" cadastrado com sucesso.`;
}

export function removerProduto(id: number): string {
    const indice = produtos.findIndex((p) => p.id === id);
    if (indice === -1) {
        return `Erro: o produto que será removido não foi encontrado`
    }
    produtos.splice(indice, 1);
    return `Produto com id ${id} removido com sucesso`;
}

export function atualizarProduto(id: number, dados: Partial<Produto>): string {
    const produto = buscarProdutoPorId(id);
    if (produto === undefined) {
        return `Erro: produto com id ${id} não encontrado`;
    }
    if (dados.preco !== undefined) {
        if (dados.preco <= 0) {
            return "Erro: o preço do produto não pode ser 0 ou negativo";
        }
        produto.preco = dados.preco;
    }
        if (dados.nome !== undefined) {
        if (dados.nome.trim() === "") {
            return "Erro: o nome do produto não pode ficar vazio";
        }
        produto.nome = dados.nome;
    }
        if (dados.categoria !== undefined) {
        if (dados.categoria.trim() === "") {
            return "Erro: o nome da categoria não pode ficar vazio";
        }
        produto.categoria = dados.categoria;
    }
        if (dados.estoque !== undefined) {
        if (dados.estoque < 0) {
            return "Erro: o valor do estoque não pode ser negativo";
        }
        produto.estoque = dados.estoque;
    }
        return `Produto "${produto.nome}" atualizado com sucesso`;
}