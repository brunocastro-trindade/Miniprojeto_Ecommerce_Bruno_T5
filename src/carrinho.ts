import { ItemCarrinho } from "./types";
import { buscarProdutoPorId } from "./produtos";

export const carrinho: ItemCarrinho[] = [];

export function listarCarrinho(): ItemCarrinho[] {
    return carrinho;
}

export function adicionarAoCarrinho(produtoId: number, quantidade: number): string {
    if (quantidade <= 0){
        return "Erro: a quantidade deve ser maior que zero"
    }
    const produto = buscarProdutoPorId(produtoId);
    
    if (produto === undefined){
        return `Erro: o produto não existe`
    }
    const itemExistente = carrinho.find((item) => item.produtoId === produtoId);
    const quantidadeNoCarrinho = itemExistente !== undefined ? itemExistente.quantidade : 0;
    
    if (quantidadeNoCarrinho + quantidade > produto.estoque){
        return `Erro: estoque insuficiente. Disponível: ${produto.estoque}, já no carrinho: ${quantidadeNoCarrinho}`;
    }
    if (itemExistente !== undefined ) {
        itemExistente.quantidade += quantidade;
        return `Quantidade do produto ${produtoId} atualizada para ${itemExistente.quantidade}`;
    }
    
    carrinho.push({ produtoId: produtoId, quantidade: quantidade });
    return `Adicionado ao carrinho: ${quantidade} unidade(s) do produto ${produtoId}`;
}

export function removerDoCarrinho(produtoId: number): string {
    const indice = carrinho.findIndex((item) => item.produtoId === produtoId);
    if (indice === -1) {
        return `Erro: o produto não está no carrinho`
    }
    carrinho.splice(indice, 1);
    return `Produto com id ${produtoId} removido com sucesso`;
}

export function alterarQuantidade(produtoId: number, novaQuantidade: number): string {
    if (novaQuantidade <= 0){
        return "Erro: a quantidade deve ser maior que zero"
    }
    const item = carrinho.find((i) => i.produtoId === produtoId);
    if (item === undefined) {
        return `Erro: o produto ${produtoId} não está no carrinho`;
    }
    const produto = buscarProdutoPorId(produtoId);
    if (produto === undefined) {
        return `Erro: o produto ${produtoId} não existe no catalogo`;
    }
    if (novaQuantidade > produto.estoque) {
        return `Erro: insuficiente. Disponivel: ${produto.estoque}`;
    }
    item.quantidade = novaQuantidade;
    return `Quantidade do produto ${produtoId} alterada para ${item.quantidade}`;
}

export function calcularSubtotal(item: ItemCarrinho): number {
    const produto = buscarProdutoPorId(item.produtoId);
    if (produto === undefined) {
        return 0;
    }
    return produto.preco * item.quantidade
}

export function calcularTotal(): number {
    return carrinho.reduce((acumulado, item) => acumulado + calcularSubtotal(item), 0);
}