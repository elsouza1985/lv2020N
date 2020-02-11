import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';


export class Cupom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clienteData: {},
            valorItens: '50.00',
            itens: [],
            produtos: [],
            servicos:[],
            formaPagamento: 'Dinheiro',
            valorCompra: '50.00'
        };
        this.loadCupomData = this.loadCupomData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.loadCupomData();
    }
    
    loadCupomData() {
        const cliente = {
            nomeCliente: 'Ricardo Silva',
            contatoCliente: '11 98585-4564'
        }
        const produtos = [
            { nomeItem: 'Corte Masc.', valorItem: 45 },
            { nomeItem: 'Cerv. Budw.', valorItem: 5 }
        ]
        fetch('api/vwClientes/1863D5CA-3915-4207-B1D6-4DB99208BC6D' , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                cliente.nomeCliente = data.nomeCliente;
                cliente.contatoCliente = String(data.ddd) +' '+ String(data.telefone);
                this.setState({
                    clienteData: cliente,
                    itens: produtos
                });
            }).catch(error => { console.log(error) });
        
    }
    handleSave() {
        const servicosData = [{
            UidVendaServicoItem:undefined,
            UidVenda: undefined,
            UidUsuario:'AED7A9B9-D373-45F0-8104-95C9F5637501',
            UidServicoEstabelecimento:'342A2C1B-CA36-4EE5-25FA-08D7A68DAAD4', 
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
        
        return (
            <div className="row">
            <div className="col-xs-12 col-md-9">
            
              <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Principais Produtos e Serviços</h4>
                            </div>
                            <div className="card-body">
                                <div className="owl-carousel owl-theme slider owl-loaded owl-drag" id="slider1">

                                    <div className="owl-stage-outer"><div className="owl-stage" ><div className="owl-item" ><div>
                                        <div className="card card-dark">
                                            <div className="card-header">
                                                <i className="fas fa-cut"></i>
                                            </div>
                                            <div className="card-body">
                                                <h5>Corte de Cabelo Masculino</h5>
                                                <h6 className="text-primary">R$40,00</h6>
                                                <br />
                                                <button className="btn btn-icon icon-left btn-primary text-center">
                                                    <i className="ion-plus-round"></i>
                                                    Adicionar
                                </button>
                                            </div>
                                        </div>
                                    </div></div><div className="owl-item" ><div>
                                        <div className="card card-dark">
                                            <div className="card-header">
                                                <i className="fas fa-cut"></i>
                                            </div>
                                            <div className="card-body">
                                                <h5>Corte de Cabelo Masculino</h5>
                                                <h6 className="text-primary">R$40,00</h6>
                                                <br />
                                                <button className="btn btn-icon icon-left btn-primary text-center">
                                                    <i className="ion-plus-round"></i>
                                                    Adicionar
                                </button>
                                            </div>
                                        </div>
                                    </div></div><div className="owl-item"><div>
                                        <div className="card card-dark">
                                            <div className="card-header">
                                                <i className="fas fa-cut"></i>
                                            </div>
                                            <div className="card-body">
                                                <h5>Corte de Cabelo Masculino</h5>
                                                <h6 className="text-primary">R$40,00</h6>
                                                <br />
                                                <button className="btn btn-icon icon-left btn-primary text-center">
                                                    <i className="ion-plus-round"></i>
                                                    Adicionar
                                </button>
                                            </div>
                                        </div>
                                    </div></div><div className="owl-item" ><div>
                                        <div className="card card-dark">
                                            <div className="card-header">
                                                <i className="fas fa-cut"></i>
                                            </div>
                                            <div className="card-body">
                                                <h5>Corte de Cabelo Masculino</h5>
                                                <h6 className="text-primary">R$40,00</h6>
                                                <br />
                                                <button className="btn btn-icon icon-left btn-primary text-center">
                                                    <i className="ion-plus-round"></i>
                                                    Adicionar
                                </button>
                                            </div>
                                        </div>
                                    </div></div><div className="owl-item active" ><div>
                                        <div className="card card-dark">
                                            <div className="card-header">
                                                <i className="fas fa-cut"></i>
                                            </div>
                                            <div className="card-body">
                                                <h5>Corte de Cabelo Masculino</h5>
                                                <h6 className="text-primary">R$40,00</h6>
                                                <br />
                                                <button className="btn btn-icon icon-left btn-primary text-center">
                                                    <i className="ion-plus-round"></i>
                                                    Adicionar
                                </button>
                                            </div>
                                        </div>
                                    </div></div><div className="owl-item active" ><div>
                                        <div className="card card-dark">
                                            <div className="card-header">
                                                <i className="fas fa-cut"></i>
                                            </div>
                                            <div className="card-body">
                                                <h5>Corte de Cabelo Masculino</h5>
                                                <h6 className="text-primary">R$40,00</h6>
                                                <br />
                                                <button className="btn btn-icon icon-left btn-primary text-center">
                                                    <i className="ion-plus-round"></i>
                                                    Adicionar
                                </button>
                                            </div>
                                        </div>
                                    </div></div><div className="owl-item active" ><div>
                                        <div className="card card-dark">
                                            <div className="card-header">
                                                <i className="fas fa-cut"></i>
                                            </div>
                                            <div className="card-body">
                                                <h5>Corte de Cabelo Masculino</h5>
                                                <h6 className="text-primary">R$40,00</h6>
                                                <br />
                                                <button className="btn btn-icon icon-left btn-primary text-center">
                                                    <i className="ion-plus-round"></i>
                                                    Adicionar
                                </button>
                                            </div>
                                        </div>
                                    </div></div><div className="owl-item active" ><div>
                                        <div className="card card-dark">
                                            <div className="card-header">
                                                <i className="fas fa-cut"></i>
                                            </div>
                                            <div className="card-body">
                                                <h5>Corte de Cabelo Masculino</h5>
                                                <h6 className="text-primary">R$40,00</h6>
                                                <br />
                                                <button className="btn btn-icon icon-left btn-primary text-center">
                                                    <i className="ion-plus-round"></i>
                                                    Adicionar
                                </button>
                                            </div>
                                        </div>
                                    </div></div></div></div><div className="owl-nav"><div className="owl-prev"><i className="fas fa-chevron-left"></i></div><div className="owl-next disabled"><i className="fas fa-chevron-right"></i></div></div><div className="owl-dots"><div className="owl-dot"><span></span></div><div className="owl-dot active"><span></span></div></div></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-md-3 col-xs-12">
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
            </div>
                </div>
        );
    }
}
export default Cupom;
