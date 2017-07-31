import { Endereco } from './endereco';
import { Contato } from './contato';
export class Crianca {

 constructor(public id?: number,
             public nome?: string,
             public dtNascimento?: Date,
             public sexo?: string,
             public matricula?: string,
             public foto?: string,
             public endereco?:Endereco,
             public contato?:Contato
             ){}
}