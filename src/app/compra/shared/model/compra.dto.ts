import { ClienteDTO } from '../../../cliente/shared/model/cliente.dto';
import { ProdutoDTO } from '../../../produto/shared/model/produto.dto';

export class CompraDTO {
    id: number;
    preco: string;
    quantidade: number;
    cliente: ClienteDTO;
    produto: ProdutoDTO;
}