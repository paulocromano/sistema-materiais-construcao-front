import { ProdutoDTO } from './produto.dto';

export class AtualizarProdutoFORM {
    preco: number;
    estoque: number;

    public constructor (produto: ProdutoDTO) {
        this.preco = parseFloat(produto.preco);
        this.estoque = produto.estoque;
    }
}