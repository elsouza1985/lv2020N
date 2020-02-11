import React, { Component } from 'react';
import $ from 'jquery';
import api from '../../Services/api';


export class ListaProdutos extends Component {
    static displayName = ListaProdutos.name;


    constructor(props) {

        super(props);
        this.state = {
            ListaProdutos: [], loading: true, loadingcliente: false, produtoData: {}
        };


        this.loadProdutoList = this.loadProdutoList.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.renderListaProdutosTable = this.renderListaProdutosTable.bind(this);
        this.renderprodutoData = this.renderprodutoData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.resetProdutoData = this.resetProdutoData.bind(this);
        this.formatMoeda = this.formatMoeda.bind(this);
        this.loadProdutoList();

    }

    ///Metodos CRUD
    async loadProdutoList() {
        const response = await api.get('/vwProdutos/');
        if (response.status === 200) {
                this.setState({ ListaProdutos: response.data, loading: false });
            }
    }
   
    async handleSave(e) {
        e.preventDefault();
        let uidProduto = this.state.produtoData.uidProduto;
        const dados = JSON.stringify( this.state.produtoData

        );
        console.log(dados);
        // PUT solicitação para editar contato
        if (uidProduto) {

            const response = await api.put('/vwProdutos/' + uidProduto, dados);

            if (response.status === 200) {
                this.resetProdutoData();
                document.getElementsByClassName('close')[0].click();
                // this.setState({ produtoData: undefined });
            } else {
                window.alert('Ocorreu um erro ao atualizar cadastro!');
            }
        }
        else // POST requisição para adicionar 
        {
            const response = await api.post('/vwProdutos/', dados);

            if (response.status === 200 || response.status === 201) {
                this.loadProdutoList();
                this.resetProdutoData();
                document.getElementsByClassName('close')[0].click();
            }
        }
    }

    async handleEdit(id) {
        const response = await api.get('/vwProdutos/' + id);
        if (response.status === 200) {
            this.setState({ titulo: "Editar", carregando: false, produtoData: response.data });
        }

    }
    async handleDelete(id) {

        if (window.confirm('Esta ação irá apagar o registro, confirma?')) {
            const response = await api.delete('/vwProdutos/' + id);
            if (response.status === 200) {
                this.loadClientList();
            }
        }

    }
    resetProdutoData() {
        this.setState({ produtoData: {} });
    }

    changeValue(prop, value) {
        this.setState(prevState => ({
            produtoData: {
                ...prevState.produtoData,
                ...prevState.produtoData[prop] = value
            }
        }))
        this.loadProdutoList();
    }

    renderprodutoData(produtoData) {
        return (
            <form onSubmit={this.handleSave}  >
                <input type="hidden" name="uidProduto" value={produtoData.uidProduto} />
                <div className="form-group">
                    <label>*Nome:</label>
                    <input type="text" className="form-control" name="nomeProduto" value={produtoData.nomeProduto} onChange={e => this.changeValue('nomeProduto', e.target.value)} required />
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <label>Quantidade:</label>
                        <input type="text" className="form-control" name="quantidadeProdutoEmbalagem" value={produtoData.quantidadeProdutoEmbalagem} onChange={e => this.changeValue('quantidadeProdutoEmbalagem', e.target.value)} required />
                    </div>
                    <div className="col-md-4">
                        <label>Unidade Medida:</label>
                        <select id="unidadeMedida" className="form-control" value={produtoData.unidadeMedida} onChange={e => this.changeValue('unidadeMedida', $("#unidadeMedida option:selected").val())}>
                            <option value="">Selecione...</option>
                            <option value="Un">Unidade</option>
                            <option value="Kg" >Kilo</option>
                            <option value="g">Grama</option>
                            <option value="L">Litro</option>
                            <option value="mL">Mililitro</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Codigo do Produto</label>
                    <input type="number" className="form-control" name="eanProduto" onChange={e => this.changeValue('eanProduto', e.target.value)} value={produtoData.eanProduto} />
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
            let decimal = changedot.substring(changedot.indexOf(',') + 1, changedot.length);
            if (decimal.length === 1) {
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
                        <th>Produto</th>
                        <th>Preço Compra</th>
                        <th>Preço Venda</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaProdutos.map(produto =>
                        <tr key={produto.uuidProduto}>
                            <td>{produto.eanProduto}</td>
                            <td>{produto.nomeProduto}</td>
                            <td>{this.formatMoeda(produto.precoProdutoCompra)}</td>
                            <td>{this.formatMoeda(produto.precoProdutoVenda)}</td>
                            <td>{produto.qtdEstoque}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(produto.uidProduto)} title="Atualizar produto" data-toggle="modal" data-target="#editarCliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(produto.uidProduto)} data-original-title="Deletar Clientes" alt="Deletar Clientes">
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    renderListaProdutosTable(ListaProdutos) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Codigo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaProdutos.map(produto =>
                        <tr key={produto.uidProduto}>
                            <td>{produto.nomeProduto}</td>
                            <td>{produto.eanProduto}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(produto.uidProduto)} title="Atualizar Cliente" data-toggle="modal" data-target="#editarCliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(produto.uidProduto)} data-original-title="Deletar Clientes" alt="Deletar Clientes">
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
            : this.renderListaProdutosTable(this.state.ListaProdutos);
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
                        <button data-toggle="modal" data-target="#editarCliente" onClick={() => { this.resetProdutoData }} >+Produto</button>
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
                                    <h5 className="modal-title">Novo Cliente</h5>
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

