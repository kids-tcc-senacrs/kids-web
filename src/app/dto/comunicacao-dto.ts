export class ComunicacaoDTO {

    constructor(public id?: number,
                public crecheId?: number,
                public usuarioId?: number,//familiar
                public descricaoFamiliar?: string,
                public descricaoCreche?: string,
                public tipo?:string
 ){}

}
