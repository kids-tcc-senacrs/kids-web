export class AvisoVO {

    constructor(public avisoId?: number,
            public crecheNome?:string,
            public descricao?:string,
            public tipo?: string,
            public dtExpiracao?:Date
        ){}
        
}