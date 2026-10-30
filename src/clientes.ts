import { Cliente } from "./types";

export const clientes: Cliente[] = [
    { id: 1, nome: "Paulo", email: "paulo1212@gmail.com" },
    { id: 2, nome: "Ana", email: "ana1313@gmail.com" },
    { id: 3, nome: "Roberto", email: "robert29@yahoo.com" },
]

export function listarClientes(): Cliente[] {
    return clientes;
}

export function buscarClientePorId(id: number): Cliente | undefined {
    return clientes.find((c) => c.id === id);
}

export function cadastrarCliente(novo: Cliente): string {
    if (novo.nome.trim() === "") {
        return "Erro: o nome do cliente não pode estar vazio";
    }
    if  (novo.email.trim() === "") {
        return "Erro: o e-mail do cliente não pode estar vazio";
    }
    if (clientes.some((c) => c.email.toLowerCase() === novo.email.toLowerCase())){
        return `Erro: já existe um cliente com o email ${novo.email}`;
    }
    if (buscarClientePorId(novo.id) !== undefined) {
        return `Erro: já existe um cliente com o id ${novo.id}`;
    }
    clientes.push(novo);
    return `Cliente "${novo.nome}" cadastrado com sucesso.`;
}