import { CompraDTO } from './../../../compra/shared/model/compra.dto';

export class ClienteDTO {
    id: number;
    nome: string;
    email: string;
    perfis: string;
    dataNascimento: string;
    telefone: string;
    compras: CompraDTO[];
}