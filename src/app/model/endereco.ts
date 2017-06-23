export class Endereco {

    

    constructor(public id?: number,
    public cep?: string,
    public logradouro?: string,
    public localizacao?: string){}

    public setLocalizacao(localizacao:string):void{
        this.localizacao = localizacao;
    }        

}