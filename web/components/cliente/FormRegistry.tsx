import Input from "../Input";

export default function FormRegistry(client) {
    const style = {
        my: { marginTop: '1.89vh', marginBottom: '1.89vh'},
        mb: { marginBottom: '1.89vh'}
    }
    return (
        <div>
            <div className={'row justify-start'} style={style.mb}>
                <Input label={'Nome completo'} width={'46.667vw'} emit={(value) => client.nome(value)} error={client?.error?.includes('nome')}/>
                <Input label={'CPF'} width={'29.931vw'} mask={'999.999.999-99'} emit={(value) => client.CPF(value)} error={client?.error?.includes('CPF')}/>
            </div>
            <div className={'row justify-start'} style={style.my}>
                <Input label={'Endereço'} width={'46.667vw'} emit={(value) => client.endereco(value)} error={client?.error?.includes('endereco')}/>
                <Input label={'Número'} width={'13.75vw'} mask={'99999'} emit={(value) => client.numero(value)} error={client?.error?.includes('numero')}/>
                <Input label={'Complemento'} width={'13.75vw'} emit={(value) => client.complemento(value)} error={client?.error?.includes('complemento')}/>
            </div>
            <div className={'row justify-start'} style={style.my}>
                <Input label={'Bairro'} width={'34.444vw'} emit={(value) => client.distrito(value)} error={client?.error?.includes('distrito')}/>
                <Input label={'Cidade/Estado'} width={'25.972vw'} emit={(value) => client.cidade_estado(value)} error={client?.error?.includes('cidade_estado')}/>
                <Input label={'CEP'} width={'13.75vw'} mask={'99.999-999'} emit={(value) => client.CEP(value)} error={client?.error?.includes('CEP')}/>
            </div>
            <div className={'row justify-start'} style={style.my}>
                <Input label={'Ponto de referência'} width={'34.444vw'} emit={(value) => client.referencia(value)} error={client?.error?.includes('referencia')}/>
                <Input label={'Telefone de contato'} width={'25.972vw'} mask={'(99) 99999-9999'} emit={(value) => client.fone1(value)} error={client?.error?.includes('fone1')}/>
            </div>
            <div className={'row justify-start'} style={style.my}>
                <Input label={'Responsável'} width={'34.444vw'} emit={(value) => client.responsavel(value)} error={client?.error?.includes('responsavel')}/>
                <Input label={'Telefone do responsável'} width={'25.972vw'} mask={'(99) 99999-9999'} emit={(value) => client.fone2(value)} error={client?.error?.includes('fone2')}/>
            </div>
        </div>
    )
}