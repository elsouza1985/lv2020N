import React, { Component } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Cupom from './Cupom';
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
            valorItens: '50.00',
            itens: [],
            produtos: [],
            servicos: [],
            formaPagamento: 'Dinheiro',
            valorCompra: '50.00',
            index:0,
            setIndex: 0,
            direction: null,
            setDirection: null,
            servicosData :[],
            produtosData :[],
            vendaData : {
                UidVenda: undefined,
                DataHoraVenda: new Date().toLocaleDateString(),
                UidEstabelecimento: undefined,
                UidUsuario: undefined,
                UidCliente: undefined,
                IdMeioPagamento: 1,
                NomeMeioPagamento: 'Dinheiro',
                IdFormaPagamento: 1,
                NomeFormaPagamento: 'Dinheiro',
                ValorVenda: 50,
                QuantidadeParcelas: 1,
                VendaFinalizada: 1,
              
            }
            
        };
        this.loadCupomData = this.loadCupomData.bind(this);
        this.renderProdutosServicos = this.renderProdutosServicos.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.loadCupomData();
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
    handleSave() {
        
  
        fetch('api/vwVendas/', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.vendaData),
        }).then((response) => {
            if (response.status == 200 || response.status == 201) {
                alert('Venda efetuada com sucesso!');
                document.getElementsByClassName('close')[0].click();
            } else {
                alert('Ocorreu um erro ao criar o registro\nErro:' + response.statusText);
            }
        }).catch(error => { console.log(error) });
    }

    addItem(e) {

        let tipo = $(e.target).parent().find('input[name="tipo"]').val()
        if (tipo == "produto") {
            let produto = {
                UidVendaProdutoItem: undefined,
                UidVenda: undefined,
                UidProdutoEstabelecimento: $(e.target).parent().find('input[name="uid"]').val(),
                NomeProduto: $(e.target).parent().find('input[name="nome"]').val(),
                ValorUnitario: $(e.target).parent().find('input[name="valor"]').val(),
                Quantidade: 1,
                ValorDesconto: 0,
                ValorAcrescimo: 0,
                DescricaoItemProduto: $(e.target).parent().find('input[name="nome"]').val()
            }
            let list = this.state.produtosData;
            list.push(produto);
            this.setState({ produtosData: list });
        } else {
            let servico = {
                UidVendaServicoItem: undefined,
                UidVenda: undefined,
                UidUsuario: getUserName().id,
                UidServicoEstabelecimento: $(e.target).parent().find('input[name="uid"]').val(),
                NomeServico: $(e.target).parent().find('input[name="nome"]').val(),
                ValorServico: $(e.target).parent().find('input[name="valor"]').val(),
                ValorDesconto: 0,
                ValorAcrescimo: 0,
                ValorComissao: 0,
                DescricaoItemServico: $(e.target).parent().find('input[name="uid"]').val(),
            }
            let list = this.state.servicosData;
            list.push(servico);
            this.setState({ servicosData: list });
        }
     
        //alert(this.state.produtosData[1].UidProdutoEstabelecimento);
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
                            <div>
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
    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex, direction: e.direction });
      
    }
    render() {
        const inputProps = {

            class: 'form-control'
        }
        let ServProd = this.state.loading ? <p><em>Loading...</em></p> : this.renderProdutosServicos();
      

        return (
            <div className="row">
                <div className="col-xs-12 col-md-9">
                    
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Principais Produtos e Serviços</h4>
                                </div>
                                {ServProd}
                                <div className="card-body">
                                
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-3 col-xs-12">
                    <Cupom produtoList={this.state.produtosData} servicoList={this.state.servicosData}
                        />
                </div>
            </div>
        );
    }
}
