export class AvisoDTO {
          constructor(public crecheId?: number,
                    public descricao?: string,
                    public dtExpiracao?: Date,
                    public tipo?:string
             ){}
}
