export type Produto = {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    estoque: number;
}

export type Cliente = {
    id: number;
    nome: string;
    email: string;
}

export type ItemCarrinho = {
    produtoId: number;
    quantidade: number;
}

export type ItemPedido = {
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
    nomeProduto: string;
    subtotal: number;
}

export type Pedido = {
    id: number;
    clienteId: number;
    itens: ItemPedido[];
    total: number;
    data: Date;
}

export type ProdutoVendido = {
    produtoId: number;
    nomeProduto: string;
    quantidade: number;
    receita: number;
}