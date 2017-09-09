export class EventoDTO {

           constructor(public eventoId?: number,
                    public crecheId?: number,
                    public eventoNome?: string,
                    public descricao?:string,
                    public dtRealizacao?:Date,
                    public status?:string,
             ){}

}
