import { ProdutoVendido } from "./types";
import { pedidos, listarPedidosDoCliente } from "./pedidos";
import { clientes } from "./clientes";
import { produtos } from "./produtos";

export function totalVendido(): number {
    return pedidos.reduce((acumulado, p) => acumulado + p.total, 0);
}

export function ticketMedio(): number {
    return pedidos.length === 0 ? 0 : totalVendido() / pedidos.length;
}

export function produtosMaisVendidos(): ProdutoVendido[] {
    const resumo: ProdutoVendido[] = [];
    const todosOsItens = pedidos.flatMap((p) => p.itens);

    for (const item of todosOsItens) {
        const existente = resumo.find((r) => r.produtoId === item.produtoId);
        if (existente !== undefined) {
            existente.quantidade += item.quantidade;
            existente.receita += item.subtotal;
        } else {
            resumo.push({
                produtoId: item.produtoId,
                nomeProduto: item.nomeProduto,
                quantidade: item.quantidade,
                receita: item.subtotal,
            });
        }
    }
    return resumo.sort((a, b) => b.quantidade - a.quantidade);
}

export function vendasPorCliente() {
    return clientes.map((c) => {
        const pedidosDoCliente = listarPedidosDoCliente(c.id);
        return {
            cliente: c.nome,
            pedidos: pedidosDoCliente.length,
            totalGasto: pedidosDoCliente.reduce((acumulado, p) => acumulado + p.total, 0),
        };
    });
}

export function produtosComEstoqueBaixo(limite: number) {
    return produtos.filter((p) => p.estoque <= limite);
}

export function exibirRelatorios(): void {
    console.log(`Pedidos registrados: ${pedidos.length}`);
    console.log(`Total vendido: R$ ${totalVendido().toFixed(2)}`);
    console.log(`Ticket médio: R$ ${ticketMedio().toFixed(2)}`);

    console.log("\nProdutos mais vendidos:");
    console.table(produtosMaisVendidos());

    console.log("Vendas por cliente:");
    console.table(vendasPorCliente());

    console.log("Produtos com estoque baixo (até 10 unidades):");
    console.table(produtosComEstoqueBaixo(10));
}
