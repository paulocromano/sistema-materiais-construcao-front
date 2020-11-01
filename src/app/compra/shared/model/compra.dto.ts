import { ProdutoDTO } from '../../../produto/shared/model/produto.dto';

export class CompraDTO {
    id: number;
    preco: number;
    quantidade: number;
    produto: ProdutoDTO;
}