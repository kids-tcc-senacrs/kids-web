export class EventoVO {
      constructor(public eventoId?: number,
                    public eventoNome?:string,
                    public descricao?:string,
                    public crecheNome?: string,
                    public crecheLogradouro?: string,
                    public crecheLocalizacao?: string,
                    public criancaId?: number,
                    public criancaNome?: string,
                    public dtRealizacao?:Date,
                    public pessoaUserResposta?:string,
                    public eventoStatus?:string  
             ){}
}