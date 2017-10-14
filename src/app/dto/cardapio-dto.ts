import { AlimentoDTO } from './alimento-dto';
export class CardapioDTO {

    constructor(public crecheId?: number,
                public dtCardapio?:Date,
                public alimentos?:AlimentoDTO[]
    ){}

}
