export class ComunicacaoVO {

    constructor(public comunicacaoId?: number,
        public crecheId?: number,
        public usuarioId?: number,//familiar
        public usuarioNome?: string,
        public descricaoFamiliar?: string,
        public descricaoCreche?: string,
        public crecheRespondeu?: boolean,
        public dtEnvioFamiliar?:Date,
        public dtRespostaCreche?:Date,
        public tipo?:string,
        public crecheNome?:string
){}
}