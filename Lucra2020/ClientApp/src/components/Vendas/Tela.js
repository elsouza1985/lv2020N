import React, { Component } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import api from '../../Services/api';
import { getEstabelecimento, getUserName } from '../../Services/auth';
import './index.css';
import $ from 'jquery';


export class Tela extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            clienteData: {},
            valorItens: 0,
            itens: [],
            produtos: [],
            servicos: [],
            formaPagamento: 'Dinheiro',
            valorCompra: 0,
            index:0,
            setIndex: 0,
            direction: null,
            setDirection: null,
            servicosData :[],
            produtosData :[],
            vendaData : {
                UidVenda: undefined,
                DataHoraVenda: new Date().toLocaleDateString(),
                UidEstabelecimento: getEstabelecimento(),
                UidUsuario: getUserName().Id,
                UidCliente: undefined,
                IdMeioPagamento: 4,
                NomeMeioPagamento: 'Dinheiro',
                IdFormaPagamento: 4,
                NomeFormaPagamento: 'Dinheiro',
                ValorVenda: 0,
                QuantidadeParcelas: 1,
                VendaFinalizada: 1,
              
            }
          
            
        };
        
       // this.loadCupomData = this.loadCupomData.bind(this);
        this.renderProdutosServicos = this.renderProdutosServicos.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //this.loadCupomData();
        this.loadServicesProducts();
      
    }
    async loadServicesProducts() {
        const response = await api.get('vwServicoEstabelecimento/LoadServices/?estab=' + getEstabelecimento());
        if (response.status === 200) {
            this.setState({ servicos: response.data, loading: false });
        }
        const responseprod = await api.get('vwProdutos/LoadProdList?estab=' + getEstabelecimento());

        if (responseprod.status === 200) {
            this.setState({ produtos: responseprod.data, loading: false });
        }
    }
    changeFormaPagamento() {
        let newval = $('#FormaPagamento option:selected').val();
        let newtextval = $('#FormaPagamento option:selected').text();
        this.changeValue('IdMeioPagamento', newval);
        this.changeValue('NomeMeioPagamento', newtextval);
        this.changeValue('IdFormaPagamento', newval);
        this.changeValue('NomeFormaPagamento', newtextval);
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
        fetch('api/vwClientes/1863D5CA-3915-4207-B1D6-4DB99208BC6D', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                cliente.nomeCliente = data.nomeCliente;
                cliente.contatoCliente = String(data.ddd) + ' ' + String(data.telefone);
                this.setState({
                    clienteData: cliente,
                    itens: produtos
                });
            }).catch(error => { console.log(error) });

    }
    async handleSave() {

        const dados = this.state.vendaData;
        if (dados.ValorVenda > 0) {
            dados['produtos'] = this.state.produtosData;
            dados['servicos'] = this.state.servicosData;
            const response = await api.post('/vwVendas/', JSON.stringify(dados));
            if (response.status == 200 || response.status == 201) {
                alert('Venda efetuada com sucesso!');
               
            } else {
                alert('Ocorreu um erro ao criar o registro\nErro:' + response.statusText);
            }
        } else {
            alert('O cupom não possui produtos/serviços');
        }
    }
    
    addItem(e) {

        let tipo = $(e.target).parent().find('input[name="tipo"]').val()
        if (tipo == "produto") {
            let produto = {
                UidVendaProdutoItem: undefined,
                UidVenda: undefined,
                UidProdutoEstabelecimento: $(e.target).parent().find('input[name="uid"]').val(),
                NomeProduto: $(e.target).parent().find('input[name="nome"]').val(),
                ValorUnitario: $(e.target).parent().find('input[name="preco"]').val(),
                Quantidade: 1,
                ValorDesconto: 0,
                ValorAcrescimo: 0,
                DescricaoItemProduto: $(e.target).parent().find('input[name="nome"]').val()
            }
            let list = this.state.produtosData;
                let findreg = list.findIndex(element => element.UidProdutoEstabelecimento == produto.UidProdutoEstabelecimento);
        
            if (findreg > -1) {
                list[findreg].Quantidade = list[findreg].Quantidade + 1;
            } else {
                list.push(produto);
            }
            this.setState({ produtosData: list });
            //alert(this.state.produtosData[0].Quantidade);
        } else {
            let servico = {
                UidVendaServicoItem: undefined,
                UidVenda: undefined,
                UidUsuario: getUserName().Id,
                UidServicoEstabelecimento: $(e.target).parent().find('input[name="uid"]').val(),
                NomeServico: $(e.target).parent().find('input[name="nome"]').val(),
                ValorServico: $(e.target).parent().find('input[name="preco"]').val(),
                ValorDesconto: 0,
                Quantidade: 1,
                ValorAcrescimo: 0,
                ValorComissao: 0,
                DescricaoItemServico: $(e.target).parent().find('input[name="uid"]').val(),
            }
            let list = this.state.servicosData;
            let findreg = list.findIndex(element => element.UidServicoEstabelecimento == servico.UidServicoEstabelecimento);

            if (findreg > -1) {
                list[findreg].Quantidade = list[findreg].Quantidade + 1;
            } else {
                list.push(servico);
            }
        
            this.setState({ servicosData: list });
        }
     
        this.updateCupomValue();
    }
    deleteItem(e) {
        let tipo = $(e.target).parent().find('input[name="tipo"]').val();
        if (tipo == "servico") {
            let list = this.state.servicosData;
            let uid = $(e).parent().find('input').val();
            let findreg = list.findIndex(element => element.UidServicoEstabelecimento == uid);
            list.splice(findreg);
            this.setState({ servicosData: list });
            this.updateCupomValue();

        } else {
            let list = this.state.produtosData;
            let uid = $(e).parent().find('input').val();
            let findreg = list.findIndex(element => element.UidProdutoEstabelecimento == uid);
            list.splice(findreg);
            this.setState({ produtosData: list });
            this.updateCupomValue();
        }
    }
    renderProdutosServicos() {


        const prod = this.state.produtos;
        const services = this.state.servicos;
        return (
            <div className="card-body" >
                <Carousel slidesPerPage={2} arrows infinite>
                    {
                    prod.map(produto =>
                            <div>
                                        <div>
                                            <div className="card card-dark">
                                                <div className="card-header">
                                                    <i className="fas fa-cut"></i>
                                                </div>
                                        <div className="card-body">
                                            <input type="hidden" value="produto" name="tipo"/>
                                            <input type="hidden" value={produto.uidProdutoEstabelecimento} name="uid"/>
                                            <input type="hidden" value={produto.precoProdutoVenda} name="preco"/>
                                            <input type="hidden" value={produto.nomeProduto} name="nome"/>
                                                    <h5>{produto.nomeProduto}</h5>
                                                    <h6 className="text-primary">R${produto.precoProdutoVenda},00</h6>
                                                    <br />
                                        <button className="btn btn-icon icon-left btn-primary text-center additem" onClick={(e)=>this.addItem(e)}>
                                                        <i className="ion-plus-round"></i>Adicionar</button>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                        )
                    }
                    {
                        services.map(service =>
                            <div key={service.UidServicoEstabelecimento}>
                                <div className="card card-dark">
                                    <div className="card-header">
                                        <i className="fas fa-cut"></i>
                                    </div>
                                    <div className="card-body">
                                        <input type="hidden" value="servico" name="tipo" />
                                        <input type="hidden" value={service.uidServicoEstabelecimento} name="uid" />
                                        <input type="hidden" value={service.valorServico} name="preco" />
                                        <input type="hidden" value={service.nomeServico} name="nome" />
                                        <h5>{service.nomeServico}</h5>
                                        <h6 className="text-primary">R${service.valorServico},00</h6>
                                        <br />
                                        <button className="btn btn-icon icon-left btn-primary text-center" onClick={(e) => this.addItem(e)}>
                                            <i className="ion-plus-round"></i>Adicionar</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Carousel>
            </div >
        );


    }
    updateCupomValue() {

        let actualValue = 0;
        let productsValue = 0;
        let servicesValue = 0;
        const servicos = this.state.servicosData;
        const produtos = this.state.produtosData;
        produtos.map(produto => (
            productsValue += (produto.ValorUnitario * produto.Quantidade)
        ));
        servicos.map(service => (
            servicesValue += (service.ValorServico * service.Quantidade)
        ));
        actualValue = productsValue + servicesValue;
        this.changeValue('ValorVenda', actualValue);
        this.setState({ valorItens: actualValue });
    }
    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex, direction: e.direction });
      
    }
    renderCupomItems() {

        const prod = this.state.produtosData;
        const services = this.state.servicosData;
        return (
            <div className="container">
                <table className="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Qt.</th>
                            <th>Item</th>
                            <th>R$</th>
                            <th></th>
                        </tr>
                    </thead>
                {
                    prod.map(produto =>
                        <tr>
                            <td>
                                <input type="hidden" name="idproduct" value={produto.UidProdutoEstabelecimento} tipo="produto"/>
                                {produto.Quantidade}
                            </td>
                            <td >
                                 {produto.NomeProduto}
                            </td>
                            <td >
                                {(produto.ValorUnitario * produto.Quantidade)+",00"}
                             </td>
                            <td>
                                <a id="swal-6" onClick={(e)=>this.deleteItem(e)}>
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    )
                }
                {
                    services.map(service =>
                        <tr>
                            <td >
                                <input type="hidden" name="idservice" value={service.UidServicoEstabelecimento} tipo="servico" />
                                {service.Quantidade}
                            </td>
                            <td>
                                 {service.NomeServico}
                            </td>
                            <td>
                                {(service.ValorServico * service.Quantidade) + ",00"}
                            </td>
                            <td>
                                <a id="swal-6" onClick={(e) => this.deleteItem(e)}>
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    )
                    }
                </table>
            </div>
        )
    }
    changeValue(prop, value) {

        let newdata = this.state.vendaData;
        newdata[prop] = value;
        this.setState({ vendaData: newdata });
    }
    render() {
        const inputProps = {

            class: 'form-control'
        }
        let ServProd = this.state.loading ? <p><em>Loading...</em></p> : this.renderProdutosServicos();
        let cupomitens = this.renderCupomItems();

        return (
            <div className="row">
                <div className="col-xs-12 col-md-7">
                    
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Produtos e Serviços</h4>
                                </div>
                                {ServProd}
                                <div className="card-body">
                                
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-5 col-xs-12">
                    <div className="card card-hero">
                        <div className="card-header">

                            <div className="card-description text-center"><h5>Cupom</h5></div>
                        </div>
                        <div className="card-body p-0">
                            <div className="tickets-list">
                                <span className="ticket-item">
                                    <div className="ticket-title">
                                        <h4>Cliente</h4>
                                        <div className="form-group">

                                        </div>
                                        <h6 className="txt_nome_venda"><b className="color_venda_txt">Cliente:</b>{this.state.clienteData.nomeCliente}</h6>
                                        <h6 className="txt_nome_venda"><b className="color_venda_txt">Contato:</b>{this.state.clienteData.contatoCliente} </h6>
                                        <hr />
                                        <h5 className="text-center">Itens</h5>
                                       
                                            {cupomitens}
                                    
                                        <hr />
                                        <h3 className="text-primary text-center">Total: R${this.state.valorItens},00</h3>
                                        <hr />
                                        <h6>Forma de Pagamento:</h6>
                                        <div className="form-group">
                                            <select className="custom-select" id="FormaPagamento" onChange={() => this.changeFormaPagamento()} value={this.state.vendaData.IdFormaPagamento}>
                                                <option value='4'>Dinheiro</option>
                                                <option value="1">Cartão de Débito</option>
                                                <option value="2">Cartão de Crédito</option>
                                                <option value="3">Cheque</option>
                                            </select>
                                        </div>
                                        <h6>Valor Total:</h6>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="valor-total" value={this.state.vendaData.ValorVenda} onChange={(e)=>this.changeValue("ValorVenda", e.target.value)}/>
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
