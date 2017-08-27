export class DiarioVO {

        constructor(public diarioId?: number,
                    public criancaId?: number,
                    public criancaNome?: number,
                    public criancaSexo?:string,
                    public tipo?:string,
                    public nota?:string,
                    public dtLancamento?:Date 
             ){}
}