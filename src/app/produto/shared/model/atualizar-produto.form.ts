import { Produto } from './produto.model';

export class AtualizarProdutoFORM {
    preco: number;
    estoque: number;

    public constructor (produto: Produto) {
        this.preco = parseFloat(produto.preco);
        this.estoque = produto.estoque;
    }
}