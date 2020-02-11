import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';
import Welcome from '../Vendas/Venda';

export class ListaServicos extends Component {
    static displayName = ListaServicos.name;
    constructor(props) {

        super(props);
        this.state = {
            listaServicos: [],
            loading: true,
            loadingServico: false,
            ServicoData: this.resetServicoData(),
            produtoList: [],
            selectedProdutoList: [],
            value: '',
            suggestions: []
        };


        this.loadServicoList = this.loadServicoList.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.renderlistaServicosTable = this.renderlistaServicosTable.bind(this);
        this.renderServicoData = this.renderServicoData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.addtableProduct = this.addtableProduct.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.loadServicoList();

        //this.setState({ produtoList: produtos });
    }

    getSuggestionValue(suggestion) {
        this.addtableProduct(suggestion.value, "new");
        return "";

    }

    loadServicoList() {
        fetch('api/vwServicoEstabelecimento/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listaServicos: data, loading: false });
            });
    }
    changeev(e) {
        alert(e.target.value);
    }
    resetServicoData() {
        const ServicoData = {
            uidServicoEstabelecimento: undefined,
            nomeServico: "",
            qtdTempo: "",
            unidadeMedida: "",
            produtos: [],
            valorServico: ""

        }
        return ServicoData;
    }
    addtableProduct(produto, type) {

        let table = $('#tblProdutos');
        if (type == "new") {
            let linha = '<tr scope="row">' +
                '<td class=" col-sm-6"><input type="hidden" name="uidProdutoEstabelecimento" value=' + produto.uidProdutoEstabelecimento + ' />' +
                '<input name="nomeProduto" class="form-control" disabled value = ' + produto.nomeProduto + ' /></td > ' +
                '<td class="col-sm-2"><input name="qtdProdutoServico" class="form-control" value="1" onchange="this.changeev(e);" /></td>' +
                '<td class=" col-sm-3"><input name="ValorProdutoServico" class="form-control" value=' + produto.precoProdutoCompra + ' /></td>' +
                '<td class="col-sm-1"><button class="btn btn-danger "><i class="fa fa-trash"></i></button></td>' +
                '</tr>';
            table.append(linha);
        } else {
            let linha = '<tr scope="row">' +
                '<td class=" col-sm-6"><input type="hidden" name="uidProdutoEstabelecimento" value=' + produto.uidProdutoEstabelecimento + ' />' +
                '<input name="nomeProduto" class="form-control" disabled value = ' + produto.nomeProduto + ' /></td > ' +
                '<td class="col-sm-2"><input name="qtdProdutoServico" class="form-control" value=' + produto.qtdProdutoServico + ' /></td>' +
                '<td class=" col-sm-3"><input name="ValorProdutoServico" class="form-control" value=' + produto.valorProdutoServico + ' /></td>' +
                '<td class="col-sm-1"><button class="btn btn-danger "><i class="fa fa-trash"></i></button></td>' +
                '</tr>';
            table.append(linha);
        }


    }
    handleSave(e) {
        e.preventDefault();
        let ServicoID = this.state.ServicoData.uidServicoEstabelecimento;
        let produto = {
            uidServicoEstabelecimento: ""
            , UidProdutoEstabelecimento: ""
            , UnidadeMedida: ""
            , QtdProdutoServico: ""
            , ValorProdutoServico: ""
        }
        const produtoList = [];

        $('#tblProdutos > tbody > tr').each(function () {
            produtoList.push({
                UidProdutoEstabelecimento: $(this).find('input[name="uidProdutoEstabelecimento"]').val()
                , UnidadeMedida: 'mL'
                , QtdProdutoServico: $(this).find('input[name="qtdProdutoServico"]').val()
                , ValorProdutoServico: $(this).find('input[name="ValorProdutoServico"]').val()
            });
        })


        const data = {
            UidServicoEstabelecimento: this.state.ServicoData.uidServicoEstabelecimento,
            NomeServico: document.getElementsByName('nomeServico')[0].value,
            QtdTempo: document.getElementsByName('qtdTempo')[0].value,
            UnidadeMedida: document.getElementsByName('UnidadeMedida')[0].options[document.getElementsByName('UnidadeMedida')[0].selectedIndex].value,
            TipoUnidadeMedida: 'Tempo',
            ValorServico: document.getElementsByName('valorServico')[0].value,
            Produtos: produtoList
        }
        // PUT solicitação para editar contato
        if (ServicoID) {
            fetch('api/vwServicoEstabelecimento' + ServicoID, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status === 200 || response.status === 201) {
                    this.loadServicoList();
                    document.getElementsByClassName('close')[0].click();
                    // this.setState({ ServicoData: undefined });
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
            })
        }
        else // POST requisição para adicionar contato
        {
            fetch('api/vwServicoEstabelecimento', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status == 200 || response.status == 201) {
                    this.loadServicoList();
                    document.getElementsByClassName('close')[0].click();
                    // this.setState({ ServicoData: undefined });
                } else {
                    window.alert('Ocorreu um erro ao criar o cadastro\nErro:' + response.statusText);
                }
            });
        }

    }

    handleEdit(id) {

        fetch('api/vwServicoEstabelecimento/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ titulo: "Editar", carregando: false, ServicoData: data });
                console.log(data);
            }).catch(error => { console.log(error) });

    }
    changeValue(prop, value) {
        this.setState(prevState => ({
            ServicoData: {
                ...prevState.ServicoData,
                ...prevState.ServicoData[prop] = value
            }
        }))
        this.loadServicoList();
    }
    handleDelete(id) {

        if (window.confirm('Esta ação irá apagar o registro, confirma?')) {
            fetch('api/vwServicoEstabelecimento/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.loadServicoList();
                    }
                })
                .catch(error => { console.log(error) })
        }

    }


    onChange(event, { newValue }) {
        this.setState({
            value: newValue
        });
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested(value) {
        const inputValue = value.value.trim().toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength >= 2) {
            fetch('api/vwProdutos/produtoNome?produtoNome=' + inputValue, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    let sug = data.map(function (val, index) {
                        return { key: index, value: val };
                    })
                    this.setState({
                        suggestions: sug
                    });
                });
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
            <span>
                {suggestion.value.nomeProduto}
            </span>
        )
    }
    renderServicoData(ServicoData, produtoList) {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Digite o nome do produto...',
            value,
            onChange: this.onChange,
            class: "form-control",
            name: 'nomeProduto'
        }
        const theme = {
            input: 'form-control'
        }
        for (var i = 0; i < ServicoData.produtos.length; i++) {
            this.addtableProduct(ServicoData.produtos[i]);
        }

        return (
            <form id="modalServico" onSubmit={this.handleSave}  >
                <input type="hidden" name="uidServico" value={ServicoData.uidServico} />
                <div className="form-group">
                    <div className="row">
                        <label>*Serviço:</label>
                    </div>
                    <div className="row">
                        <input type="text" className="form-control" name="nomeServico" value={ServicoData.nomeServico} onChange={e => this.changeValue('nomeServico', e.target.value)} required />
                    </div>

                </div>
                <div className="form-group">
                    <label>*Tempo Médio:</label>
                    <div className="row">
                        <div className=" col-sm-3">
                            <input type="number" className="form-control" name="qtdTempo" onChange={e => this.changeValue('qtdTempo', e.target.value)} value={ServicoData.qtdTempo} required />
                        </div>
                        <div className="col-sm-9">
                            <select className="form-control" name="UnidadeMedida" onChange={e => this.changeValue('UnidadeMedida', e.target.value)} value={ServicoData.unidadeMedida} required>
                                <option value="Minuto">Minuto</option>
                                <option value="Hora">Hora</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label>Produtos:</label>
                    </div>
                    <div className="row">
                        <div className="col-sm-11">
                            <div className="row">
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    inputProps={inputProps}
                                    theme={theme}

                                />
                            </div>
                        </div>
                        <div className="col-sm-1 mr-3">
                            <button className="btn btn-success" ><i class="fas fa-plus-circle"></i></button>
                        </div>
                    </div>
                    <div className="space-1">
                        <table id="tblProdutos" className="table table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th>Produto</th>
                                    <th>Qtd</th>
                                    <th>Custo(R$)</th>
                                    <th>Remover</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="form-group">
                    <label>Valor:</label>
                    <input type="text" className="form-control" name="valorServico" onChange={e => this.changeValue('valorServico', e.target.value)} value={ServicoData.valorServico} />
                </div>
                <div className="modal-footer bg-whitesmoke br">
                    <button type="submit" className="btn btn-primary" id="swal-2">Salvar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </form>
        )
    }
    renderlistaServicosTable(listaServicos) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Tempo</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaServicos.map(Servico =>
                        <tr key={Servico.uidServicoEstabelecimento}>
                            <td>{Servico.nomeServico}</td>
                            <td>{Servico.qtdTempo}/{Servico.unidadeMedida}(s)</td>
                            <td>{Servico.valorServico}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(Servico.uidServicoEstabelecimento)} title="Atualizar Servico" data-toggle="modal" data-target="#editarServico">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(Servico.uidServicoEstabelecimento)} data-original-title="Deletar Servicos" alt="Deletar Servicos">
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
            : this.renderlistaServicosTable(this.state.listaServicos);
        let ServicoRender = this.state.loadingServico ? <p><em>Carregando...</em></p>
            : this.renderServicoData(this.state.ServicoData, this.state.produtoList);
        return (
            <div >
                <Welcome name="pessoal" val1={this.state.listaServicos.length} val2="5"/>
                <section className="section">
                    <div className="section-header">
                        <h1><i className="fa fa-user-friends"></i> Servicos</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item active"><a href="/dashboard">Dashboard</a></div>
                            <div className="breadcrumb-item"><a href="/Servicos">Servicos</a></div>
                        </div>
                    </div>
                    <p>
                        <a to="#" data-toggle="modal" data-target="#editarServico" onClick={() => {this.resetServicoData()  }} >Adicionar Servico</a>
                    </p>
                    <div className="section-body">
                        {contents}
                    </div>
                </section>
                <div>
                    <div className="modal fade" tabIndex="-1" role="dialog" id="editarServico">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Novo Servico</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {ServicoRender}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

