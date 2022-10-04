import Text from "../Text";

export default function FormShow(client) {
    const style = {
        my: { marginTop: '1.89vh', marginBottom: '1.89vh'},
        mb: { marginBottom: '1.89vh'}
    }
    return (
        <div>
            <div className={'row justify-start'} style={style.mb}>
                <Text label={'Nome completo'} width={'46.667vw'} value={client?.nome} emit={(value) => client.nome(value)}/>
                <Text label={'CPF'} width={'29.931vw'} mask={'999.999.999-99'} value={client?.CPF} emit={(value) => client.CPF(value)}/>
            </div>
            <div className={'row justify-start'} style={style.my}>
                <Text label={'Endereço'} width={'46.667vw'} value={client?.endereco} emit={(value) => client.endereco(value)}/>
                <Text label={'Número'} width={'13.75vw'} mask={'99999'} value={client?.numero} emit={(value) => client.numero(value)}/>
                <Text label={'Complemento'} width={'13.75vw'} value={client?.complemento} emit={(value) => client.complemento(value)}/>
            </div>
            <div className={'row justify-start'} style={style.my}>
                <Text label={'Bairro'} width={'34.444vw'} value={client?.distrito} emit={(value) => client.distrito(value)}/>
                <Text label={'Cidade/Estado'} width={'25.972vw'} value={client?.cidade_estado} emit={(value) => client.cidade_estado(value)}/>
                <Text label={'CEP'} width={'13.75vw'} mask={'99.999-999'} value={client?.CEP} emit={(value) => client.CEP(value)}/>
            </div>
            <div className={'row justify-start'} style={style.my}>
                <Text label={'Ponto de referência'} width={'34.444vw'} value={client?.referencia} emit={(value) => client.referencia(value)}/>
                <Text label={'Telefone de contato'} width={'25.972vw'} mask={'(99) 99999-9999'} value={client?.fone1} emit={(value) => client.fone1(value)}/>
            </div>
            <div className={'row justify-start'} style={style.my}>
                <Text label={'Responsável'} width={'34.444vw'} value={client?.responsavel} emit={(value) => client.responsavel(value)}/>
                <Text label={'Telefone do responsável'} width={'25.972vw'} mask={'(99) 99999-9999'} value={client?.fone2} emit={(value) => client.fone2(value)}/>
            </div>
        </div>
    )
}