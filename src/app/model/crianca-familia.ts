import { Usuario } from './usuario';
import { Familia } from './familia';
import { Crianca } from './crianca';
export class CriancaFamilia {


  constructor(public id?: number,
              public crianca?:Crianca,
              public familia?:Familia,
              public usuario?:Usuario,
              public parentesco?:string,
              public dtVinculo?:Date  
             ){}

}
