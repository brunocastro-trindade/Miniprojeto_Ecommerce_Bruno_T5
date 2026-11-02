# Sistema de Gerenciamento de E-commerce

**Estudante:** Bruno trindade de castro
**Turma:** T5
**Curso:** Desenvolvedor Back-End Node [T5] (Mini-Projeto Avaliativo, Módulo 1)

## Objetivo
Aplicação back-end em TypeScript e Node.js que gerencia as operações de uma pequena loja virtual: catálogo de produtos, clientes, carrinho de compras, registro de pedidos com controle de estoque e relatórios de vendas. Os dados ficam em memória durante a execução.

## Funcionalidades
- **Produtos:** cadastrar, listar, buscar por id, buscar por parte do nome, filtrar por categoria, atualizar e remover.
- **Clientes:** cadastrar, listar e buscar por id.
- **Carrinho:** adicionar, remover, alterar quantidade, listar itens com subtotal e calcular o total.
- **Pedidos:** finalizar a compra de um cliente, listar todos os pedidos e listar os pedidos de um cliente.
- **Relatórios:** total vendido, ticket médio, produtos mais vendidos, vendas por cliente e produtos com estoque baixo.

## Tecnologias
- TypeScript
- Node.js
- Sem bibliotecas externas nem frameworks

## Estrutura
```
src/
├── types.ts       # Tipos: Produto, Cliente, ItemCarrinho, ItemPedido, Pedido, ProdutoVendido
├── produtos.ts    # Catálogo inicial e operações de produtos
├── clientes.ts    # Clientes iniciais e operações de clientes
├── carrinho.ts    # Operações do carrinho e cálculos de subtotal e total
├── pedidos.ts     # Finalização e consulta de pedidos
├── relatorios.ts  # Consolidação e exibição dos resultados
└── main.ts        # Demonstração de todas as funcionalidades
```

## Como executar
Pré-requisito: Node.js 18 ou superior.

```bash
npm install      # instala o TypeScript
npm run build    # compila src/ para dist/
npm start        # executa dist/main.js
```
Ou compile e execute de uma vez com `npm run dev`.

## Exemplos de uso
```ts
cadastrarProduto({ id: 8, nome: "mochila", categoria: "papelaria", preco: 120, estoque: 10 });
// "Produto "mochila" cadastrado com sucesso."

adicionarAoCarrinho(3, 2);   // 2 monitores
adicionarAoCarrinho(3, 1);   // mesmo produto: a quantidade passa a 3, sem linha duplicada
calcularTotal();             // soma dos subtotais (preço x quantidade)

finalizarPedido(1);
// "Pedido 1 registrado. Total: R$ 790.00" e o estoque é descontado

adicionarAoCarrinho(3, 0);
// "Erro: a quantidade deve ser maior que zero"
```
O arquivo `main.ts` demonstra em seções todas as operações, incluindo situações inválidas.

## Regras de negócio
**Produtos**
> O id deve ser único, o nome e a categoria não podem estar vazios, o preço deve ser maior que zero e o estoque não pode ser negativo.
> A atualização valida todos os campos antes de aplicar qualquer alteração, o que evita atualização parcial.
> O id de um produto não pode ser alterado.

**Clientes**
> O id e o e-mail devem ser únicos. A comparação do e-mail ignora maiúsculas e minúsculas.
> O nome e o e-mail são obrigatórios.

**Carrinho**
> A quantidade deve ser maior que zero, e o produto precisa existir.
> A quantidade total no carrinho não pode passar do estoque disponível.
> Adicionar de novo um produto que já está no carrinho soma a quantidade, sem criar linha duplicada.
> Subtotal = preço unitário × quantidade. Total = soma dos subtotais.

**Pedidos**
> Não é possível finalizar um pedido sem itens nem para um cliente inexistente.
> A finalização acontece em duas fases: primeiro valida todos os itens, depois desconta o estoque e registra o pedido. Se qualquer item falhar, nada é registrado e nenhum estoque é descontado.
> O pedido guarda o nome e o preço praticados no momento da compra. Mudanças posteriores no catálogo não alteram pedidos antigos.
> Os ids de pedido são gerados de forma sequencial e única.

## Limitações conhecidas
> Os dados ficam só em memória e se perdem ao encerrar a execução.
> Há um único carrinho compartilhado, sem um carrinho separado para cada cliente.
> Não há interface. A interação acontece por chamadas de função no `main.ts`.
> Não há pagamento, frete, cupons, impostos nem autenticação, porque estão fora do escopo do enunciado.
> O formato do e-mail não é validado, só se ele foi preenchido.
> Os ids de produtos e clientes são informados manualmente.
> Remover um produto do catálogo não o retira de um carrinho em andamento. A finalização do pedido detecta essa situação e bloqueia a compra.
