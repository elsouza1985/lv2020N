import React, {Component} from 'react';
import Cupom from './Cupom';

export class Tela extends Component {
    static displayName = Tela.name;
    constructor(props) {

        super(props);
        this.state = {
            listaServicos: [],
            loading: true,
            loadingServico: false,
            ServicoData: {},
            produtoList: [],
            selectedProdutoList: [],
            value: '',
            suggestions: []
        };
    }
    render() {
        return (
            <Cupom />
        );
        }
}
