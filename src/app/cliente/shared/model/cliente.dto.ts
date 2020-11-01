import { CompraDTO } from './../../../compra/shared/model/compra.dto';

export class ClienteDTO {
    id: number;
    nome: string;
    email: string;
    permissoes: string;
    dataNascimento: string;
    telefone: string;
    compras: CompraDTO[];
}