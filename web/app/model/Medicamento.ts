import {IMedicamento} from "../interface/IMedicamento";

export default class Medicamento implements IMedicamento {
    constructor() {
        this.concentracao = undefined
        this.data_prescricao = undefined
        this.nome_medicamento = undefined
        this.nome_prescritor = undefined
        this.numero_conselho = undefined
        this.numero_conselho = undefined
        this.quantidade_prescrita = undefined
        this.data_entrega = undefined
        this.numero_documento = undefined
        this.periodo = undefined
        this.horarios = []
        this.posologia = [null, null, null, null]
        this.administracao = undefined
    }
    concentracao: string;
    data_prescricao: string;
    nome_medicamento: string;
    nome_prescritor: string;
    numero_conselho: string;
    quantidade_prescrita: string;
    validade: string;
    data_entrega: string;
    numero_documento: string;
    periodo: string;
    horarios: any;
    posologia: [any, any, any, any];
    administracao: string;
}