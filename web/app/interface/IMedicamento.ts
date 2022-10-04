export interface IMedicamento {
    nome_medicamento: string,
    concentracao: string,
    quantidade_prescrita: string,
    data_prescricao: string,
    nome_prescritor: string,
    numero_conselho: string,
    periodo: string,
    data_entrega: string,
    numero_documento: string,
    horarios: any,
    posologia: [any, any, any, any],
    administracao: string
}