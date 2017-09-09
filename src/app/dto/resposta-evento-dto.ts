export class RespostaEventoDTO {
              constructor(public eventoId?: number,
                    public criancaId?: number,
                    public usuarioId?: number,
                    public eventoRespostaStatus?:string
             ){}

}