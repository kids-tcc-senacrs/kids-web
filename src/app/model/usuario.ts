import {Endereco} from './Endereco'

export class Usuario {

    constructor(public id: number,
    public nome?: string,
    public email?: string,
    public telefone?: string,
    public tipo?: string,
    public ativo?: boolean,
    public endereco?:Endereco){}

}