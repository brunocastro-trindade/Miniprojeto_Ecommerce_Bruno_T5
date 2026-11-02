import { Pedido, ItemPedido } from "./types";
import { buscarProdutoPorId } from "./produtos";
import { buscarClientePorId } from "./clientes";
import { carrinho, limparCarrinho } from "./carrinho";

export const pedidos: Pedido[] = [];

let proximoIdPedido = 1;

export function finalizarPedido(clienteId: number): string {
    if (buscarClientePorId(clienteId) === undefined) {
        return `Erro: cliente ${clienteId} não encontrado`;
    }
    if (carrinho.length === 0) {
        return "Erro: não é possível finalizar um pedido sem itens";
    }

    const itens: ItemPedido[] = [];
    for (const item of carrinho) {
        const produto = buscarProdutoPorId(item.produtoId);
        if (produto === undefined) {
            return `Erro: o produto ${item.produtoId} não existe mais no catálogo`;
        }
        if (item.quantidade > produto.estoque) {
            return `Erro: estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}`;
        }
        itens.push({
            produtoId: produto.id,
            nomeProduto: produto.nome,
            quantidade: item.quantidade,
            precoUnitario: produto.preco,
            subtotal: produto.preco * item.quantidade,
        });
    }

    for (const itemPedido of itens) {
        const produto = buscarProdutoPorId(itemPedido.produtoId);
        if (produto !== undefined) {
            produto.estoque -= itemPedido.quantidade;
        }
    }

    const pedido: Pedido = {
        id: proximoIdPedido,
        clienteId: clienteId,
        itens: itens,
        total: itens.reduce((acumulado, i) => acumulado + i.subtotal, 0),
        data: new Date(),
    };
    proximoIdPedido++;
    pedidos.push(pedido);
    limparCarrinho();

    return `Pedido ${pedido.id} registrado. Total: R$ ${pedido.total.toFixed(2)}`;
}

export function listarPedidos(): Pedido[] {
    return pedidos;
}

export function listarPedidosDoCliente(clienteId: number): Pedido[] {
    return pedidos.filter((p) => p.clienteId === clienteId);
}