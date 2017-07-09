import { Pessoa } from './pessoa';

export class Usuario {

    constructor(public id: number,
    public email?: string,
    public telefone?: string,
    public tipo?: string,
    public ativo?: boolean,
    public pessoa?:Pessoa){}

}