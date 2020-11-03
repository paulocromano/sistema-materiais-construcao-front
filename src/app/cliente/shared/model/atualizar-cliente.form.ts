export class AtualizarClienteFORM {
    telefone: string;
    senha: string;

    public constructor (telefone?: string) {
        this.telefone = (telefone) ? telefone : '---';
        this.senha = null;
    }
}