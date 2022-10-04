import {IPedido} from "../interface/IPedido";

export default class Pedido implements IPedido {
    constructor() {
        this.concentracao = undefined
        this.data_conferencia = undefined
        this.data_prescricao = undefined
        this.nome_medicamento = undefined
        this.nome_prescritor = undefined
        this.numero = undefined
        this.numero_conselho = undefined
        this.posologia = undefined
        this.quantidade_prescrita = undefined
        this.data_entrega = undefined
        this.numero_documento = undefined
        this.periodo = undefined
    }
    concentracao: string;
    data_conferencia: string;
    data_prescricao: string;
    nome_medicamento: string;
    nome_prescritor: string;
    numero: number;
    numero_conselho: string;
    posologia: string;
    quantidade_prescrita: string;
    data_entrega: string;
    numero_documento: string;
    periodo: string;
}