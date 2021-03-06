import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Alergia } from './alergia';
import { Medicamento } from './medicamento';
import { Pessoa } from './pessoa';
import { Creche } from './creche';
import { Endereco } from './endereco';
import { Contato } from './contato';
export class Crianca {

 constructor(public id?: number,
             public dtNascimento?: Date,
             public sexo?: string,
             public matricula?: string,
             public foto?: any,
             public pessoa?:Pessoa,
             public contato?:Contato,
             public creche?:Creche,
             public medicamentos?:Medicamento[],
             public alergias?:Alergia[]
             ){}
}