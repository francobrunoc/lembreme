import {ICliente} from "../interface/ICliente";

export default class Cliente implements ICliente {
    constructor() {
        this.cidade_estado = undefined
        this.complemento = undefined
        this.distrito = undefined
        this.endereco = undefined
        this.fone1 = undefined
        this.fone2 = undefined
        this.nome = undefined
        this.numero = undefined
        this.referencia = undefined
        this.responsavel = undefined
        this.CEP = undefined
        this.CPF = undefined
    }
    cidade_estado: string;
    complemento: string;
    distrito: string;
    endereco: string;
    fone1: string;
    fone2: string;
    nome: string;
    numero: string;
    referencia: string;
    responsavel: string;
    CEP: string;
    CPF: string;
}