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