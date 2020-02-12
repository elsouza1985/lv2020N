import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';
import api from '../../Services/api';
import { getEstabelecimento } from '../../Services/auth';


export class ListaProdutosEstab extends Component {
   static displayName = ListaProdutosEstab.name;
   

    constructor(props) {
       
        super(props);
        this.state = {
            ListaProdutos: [],
            loading: true,
            loadingcliente: false,
            produtoData: {},
            value: '',
            suggestions: []  };


        this.loadProdutoList = this.loadProdutoList.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        //this.renderListaProdutosTable = this.renderListaProdutosTable.bind(this);
        this.renderprodutoData = this.renderprodutoData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.resetProdutoData = this.resetProdutoData.bind(this);
        this.formatMoeda = this.formatMoeda.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.loadProdutoList();
        
    }
    getSuggestionValue(suggestion) {
        this.changeValue('UidProduto', suggestion.value.uidProduto);
        return suggestion.value.nomeProduto + " " + suggestion.value.quantidadeProdutoEmbalagem + "-" + suggestion.value.unidadeMedida;

    }
    async onSuggestionsFetchRequested(value) {
        const inputValue = value.value.trim().toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength >= 2) {
            const response = await api.get('vwProdutos/listarProd?produtoNome=' + inputValue);
          
                    if (response.status === 200) {
                        let sug = response.data.map(function (val, index) {
                            return { key: index, value: val };
                        })
                        this.setState({
                            suggestions: sug
                        });
                    }
        }
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }
    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.value.nomeProduto}
            </div>
        )
    }
  
    changeValue(prop, value) {

        let newdata = this.state.produtoData;
        newdata[prop] = value;
        this.setState({ produtoData: newdata });
    }
    onChange(event, { newValue }) {
        this.setState({
            value: newValue
        });
    }
    async loadProdutoList() {
        const response = await api.get('vwProdutos/LoadProdList');

        if (response.status === 200) {
            this.setState({ ListaProdutos: response.data, loading: false });
        }

    }
    resetProdutoData() {
        this.setState({
            produtoData: {
                uidProdutoEstabelecimento: '00000000-0000-0000-0000-000000000000',
                UidProduto: '',
                uidEstabelecimento: getEstabelecimento(),
                EANProduto: 0,
                precoProdutoCompra: '',
                precoProdutoVenda: '',
                qtdEstoque:''
            }
            
        });
        $('.editinput').attr('disabled', false);
    }
   async  handleSave(e) {
        e.preventDefault();
        let uidProdutoEstabelecimento = this.state.produtoData.uidProdutoEstabelecimento;
       const data = JSON.stringify(this.state.produtoData);
        // PUT solicitação para editar 
       if (uidProdutoEstabelecimento != '00000000-0000-0000-0000-000000000000') {
           const response = await api.put('vwProdutos/Prodestab/' + uidProdutoEstabelecimento,data);
                if (response.status === 200 || response.status === 201) {
                    this.loadProdutoList();
                    document.getElementsByClassName('close')[0].click();
                    this.resetProdutoData()
                    //this.setState({ produtoData:  });
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
         
        }
        else // POST requisição para adicionar 
        {
           
                    const response = await api.post('vwProdutos/Prodestab/', data);
                    if (response.status == 200 || response.status == 201) {
                        this.loadProdutoList();
                        this.resetProdutoData();
                        document.getElementsByClassName('close')[0].click();
                    }
      
        }
       
    }

    async handleEdit(id) {
        const response = await api.get('vwProdutos/GetvwProdutoEstab/' + id);
        if (response.status === 200) {
            this.setState({ titulo: "Editar", carregando: false, produtoData: response.data, value: response.data.nomeProduto  });
            $('.editinput').attr('disabled', true);
            this.loadProdutoList();
        }

    }

   async handleDelete(id) {

       if (window.confirm('Esta ação irá apagar o registro, confirma?')) {
           const response = await api.get('vwProdutos/' + id);
           if (response.status === 200 || response.status === 201) {
               this.loadClientList();
           }
       
        }
      
    }
   
    renderprodutoData(produtoData) {
        const inputProps = {
            placeholder: 'Digite o nome do produto...',
            value:this.state.value,
            onChange: this.onChange,
            class: "form-control editinput",
            name: 'nomeProduto'
            
        }
        const theme = {
            input: 'form-control'
        }
        return (
            <form  onSubmit={this.handleSave}  >
                <input type="hidden" id="UidProdutoEstabelecimento" value={ produtoData.uidProdutoEstabelecimento} />
                <input type="hidden" id="UidProduto" value={produtoData.UidProduto} />
                <div className="form-group">
                    <label>*Nome:</label>
                    <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                        theme={theme}
                    />
                </div>
                <div className="form-group">
                    <label>Valor de compra</label>
                    <input type="number" step="any" className="form-control" id="precoProdutoCompra" onChange={e => this.changeValue('precoProdutoCompra', e.target.value)} value={produtoData.precoProdutoCompra} />
                </div>
                <div className="form-group">
                    <label>Valor de venda</label>
                    <input type="number" step="any" className="form-control" id="precoProdutoVenda" onChange={e => this.changeValue('precoProdutoVenda', e.target.value)} value={produtoData.precoProdutoVenda} />
                </div>
                <div className="form-group">
                    <label>Estoque</label>
                    <input type="number" step="any" className="form-control" id="qtdEstoque" onChange={e => this.changeValue('qtdEstoque', e.target.value)} value={produtoData.qtdEstoque} />
                </div>
               
                <div className="modal-footer bg-whitesmoke br">
                    <button type="submit" className="btn btn-primary" id="swal-2">Salvar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </form>
        )
    }
    formatMoeda(valor) {
        let changedot = valor.toString().replace('.', ',');

        changedot = 'R$' + changedot;
        if (changedot.indexOf(',') > -1) {
            let decimal = changedot.substring(changedot.indexOf(',')+1, changedot.length);
            if (decimal.length == 1) {
                changedot = changedot + '0';
            }
        } else {
            changedot = changedot + ',00';
        }
        return changedot;

    }
    renderListaProdutosEstabTable(ListaProdutos) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Preço Compra</th>
                        <th>Preço Venda</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaProdutos.map(produto =>
                        <tr key={produto.uidProdutoEstabelecimento}>
                            <td>{produto.eanProduto}</td>
                            <td>{produto.nomeProduto}</td>
                            <td>{this.formatMoeda(produto.precoProdutoCompra)}</td>
                            <td>{this.formatMoeda(produto.precoProdutoVenda)}</td>
                            <td>{produto.qtdEstoque}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(produto.uidProdutoEstabelecimento)} title="Atualizar produto" data-toggle="modal" data-target="#editarCliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(produto.uidProdutoEstabelecimento)} data-original-title="Deletar Clientes" alt="Deletar Clientes">
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
   
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderListaProdutosEstabTable(this.state.ListaProdutos);
        let clienteRender = this.state.loadingcliente ? <p><em>Carregando...</em></p>
            : this.renderprodutoData(this.state.produtoData);
        return (
            <div >
                <section className="section">
                    <div className="section-header">
                        <h1><i className="fa fa-clipboard-list"></i> Produtos</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item active"><a href="/dashboard">Dashboard</a></div>
                            <div className="breadcrumb-item"><a href="/produtos">Produtos</a></div>
                        </div>
                    </div>
                    <p>
                        <button data-toggle="modal" data-target="#editarCliente" onClick={() => {
                            this.loadProdutoList();
                            this.resetProdutoData();
                            }} >+Produto</button>
                    </p>
                    <div className="section-body">
                        {contents}
                    </div>
                </section>
                <div>
                    <div className="modal fade" tabIndex="-1" role="dialog" name="editarCliente" id="editarCliente">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Novo Produto</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {clienteRender}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

