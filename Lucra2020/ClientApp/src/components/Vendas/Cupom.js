import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import api from '../../Services/api';
import { getEstabelecimento } from '../../Services/auth';


export class Cupom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            clienteData: {},
            valorItens: '50.00',
            itens: [],
            produtos: this.props.produtoList,
            servicos:this.props.servicoList,
            formaPagamento: 'Dinheiro',
            valorCompra: '50.00'
        };
      
        this.handleSave = this.handleSave.bind(this);
       
       
    }
     
    handleSave() {
        const servicosData = [{
            UidVendaServicoItem:undefined,
            UidVenda: undefined,
            UidUsuario:'AED7A9B9-D373-45F0-8104-95C9F5637501',
            UidServicoEstabelecimento: getEstabelecimento(), 
            NomeServico:'Corte',
            ValorServico:30,
            ValorDesconto:0,
            ValorAcrescimo: 0,
            ValorComissao:0,
            DescricaoItemServico:'Corte'
        }]
        const produtosData = [{
            UidVendaProdutoItem: undefined,
            UidVenda: undefined,
            UidProdutoEstabelecimento:'E41E4195-8D3C-4851-8C34-08D7A8E4FD44',
            NomeProduto:'Cerveja',
            ValorUnitario: 5,
            Quantidade: 1,
            ValorDesconto:0,
            ValorAcrescimo: 0,
            DescricaoItemProduto : 'Cerveja'
        }];
        const vendaData = {
            UidVenda: undefined, 
            DataHoraVenda: '2020-02-05',
            UidEstabelecimento:undefined,
            UidUsuario:undefined,
            UidCliente:undefined,
            IdMeioPagamento:1,
            NomeMeioPagamento: 'Dinheiro',
            IdFormaPagamento: 1,
            NomeFormaPagamento :'Dinheiro',
            ValorVenda: 50,
            QuantidadeParcelas: 1, 
            VendaFinalizada: 1,
            Produtos: produtosData,
            Servicos: servicosData
        }
        fetch('api/vwVendas/', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body:JSON.stringify(vendaData),
        }).then((response) => {
            if (response.status == 200 || response.status == 201) {
                alert('Venda efetuada com sucesso!');
                document.getElementsByClassName('close')[0].click();
            } else {
                alert('Ocorreu um erro ao criar o registro\nErro:' + response.statusText);
            }
        }).catch(error => { console.log(error) });
    }
   
    render() {
        const inputProps = {

            class: 'form-control'
        }
        let ServProd = this.state.loading ? <p><em>Loading...</em></p>:  this.renderProdutosServicos();
       
        return (
          
                <div className="card card-hero">
                    <div className="card-header">

                        <div className="card-description text-center"><h5>Cupom</h5></div>
                    </div>
                    <div className="card-body p-0">
                        <div className="tickets-list">
                            <span className="ticket-item">
                                <div className="ticket-title">
                                    <h4>Nome do Cliente</h4>
                                    <div className="form-group">
                                    
                                    </div>
                                    <h6 className="txt_nome_venda"><b className="color_venda_txt">Cliente:</b>{this.state.clienteData.nomeCliente}</h6>
                                    <h6 className="txt_nome_venda"><b className="color_venda_txt">Contato:</b>{this.state.clienteData.contatoCliente} </h6>
                                    <hr />
                                    <h3 className="text-primary">Total: R${this.state.valorItens}</h3>
                                    <ul>
                                        <li>Corte de Cabelo Feminino</li>
                                        <li>Corte de Cabelo Masculino</li>
                                    </ul>
                                    <h6>Forma de Pagamento:</h6>
                                    <div className="form-group">
                                        <select className="custom-select">
                                            <option selected value='4'>Dinheiro</option>
                                            <option value="1">Cartão de Débito</option>
                                            <option value="2">Cartão de Crédito</option>
                                            <option value="3">Cheque</option>
                                        </select>
                                    </div>
                                    <h6>Valor Total:</h6>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="valor-total" value="R$300" />
                                    </div>
                                    <button className="btn btn-icon icon-left btn-dark text-center" onClick={(e) => { this.handleSave() }} >
                                        <i className="fa fa-credit-card"></i>
                                        Salvar Compra
                                            </button>


                                </div>
                            </span>
                        </div>
                    </div>
                </div>
          
        );
    }
}
export default Cupom;
