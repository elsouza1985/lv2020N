import React, { Component, useState } from 'react';


export class ListaClientes extends Component {
    static displayName = ListaClientes.name;
   

    constructor(props) {
       
        super(props);
        this.state = { listaclientes: [], loading: true, loadingcliente: false, clienteData: []};

       
        this.loadClientList = this.loadClientList.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.renderlistaclientesTable = this.renderlistaclientesTable.bind(this);
        this.renderClienteData = this.renderClienteData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.loadClientList();
     
    }
 
    loadClientList() {
        fetch('api/vwClientes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listaclientes: data, loading: false });
            });
    }
    ClienteData() {
        const clientData = {
            uidCliente: undefined ,
            nomeCliente: "",
            ddd: "",
            telefone: "",
            email: "",
            datadeNascimento: ""
        }
        return clientData;
    }
    handleSave(e) {
        e.preventDefault();
        let clientID = this.state.clienteData.uidCliente;
        let numberPattern = /\d+/g;
        let telefone = document.getElementsByName('telefone')[0].value.match(numberPattern);
        telefone = telefone.length > 1 ? telefone.join('') : telefone;
        const data = {
            UidCliente: this.state.clienteData.uidCliente,
            NomeCliente: document.getElementsByName('nomeCliente')[0].value,
            Telefone: telefone,
            Email: document.getElementsByName('email')[0].value,
            DDD: document.getElementsByName('ddd')[0].value,
            DataDeNascimento: document.getElementsByName('dataDeNascimento')[0].value
        }
        // PUT solicitação para editar contato
        if (clientID) {
            fetch('api/vwClientes/' + clientID, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    this.loadClientList();
                    
                    
                    document.getElementsByClassName('close')[0].click();
                   // this.setState({ clienteData: undefined });
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
            })
        }
        else // POST requisição para adicionar contato
        {
            fetch('api/vwClientes/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.status == 200 || response.status == 201) {
                    this.loadClientList();
                    this.setState({ clienteData: this.ClienteData() })
                    document.getElementsByClassName('close')[0].click();
                } else {
                    alert('Ocorreu um erro ao criar o registro\nErro:' + response.statusText);
                }
            }).catch(error => { console.log(error) });
        }
       
    }

    handleEdit(id) {

        fetch('api/vwClientes/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ titulo: "Editar", carregando: false, clienteData: data });
                console.log(data);
            }).catch(error => { console.log(error) });
    }
    changeValue(prop, value) {
        this.setState(prevState => ({
            clienteData: {
                ...prevState.clienteData,
                ...prevState.clienteData[prop] = value
            }
        }))
        this.loadClientList();
    }
    handleDelete(id) {

        if (window.confirm('Esta ação irá apagar o registro, confirma?')) {
            fetch('api/vwClientes/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.loadClientList();
                    }
                })
                .catch(error => { console.log(error) })
        }
      
    }
    renderClienteData(clienteData) {
        return (
            <form id="modalcliente" onSubmit={this.handleSave}  >
                <input type="hidden" name="uidCliente" value={clienteData.uidCliente} onChange={e => this.changeValue('uidCliente', e.target.value)} />
                <div className="form-group">
                    <label>*Nome:</label>
                    <input type="text" className="form-control" name="nomeCliente" value={clienteData.nomeCliente} onChange={e => this.changeValue('nomeCliente', e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>*Telefone:</label>
                    <div className="row">
                        <div className="col-sm-2">
                            <input type="text" className="form-control" name="ddd" onChange={e => this.changeValue('ddd', e.target.value)} value={clienteData.ddd} required maxLength={2} />
                        </div>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="telefone" onChange={e => this.changeValue('telefone', e.target.value)} value={clienteData.telefone} required />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>E-mail:</label>
                    <input type="text" className="form-control" name="email" onChange={e => this.changeValue('email', e.target.value)} value={clienteData.email} />
                </div>
                <div className="form-group">
                    <label>Aniversário:</label>
                    <input type="text" className="form-control" name="dataDeNascimento" onChange={e => this.changeValue('dataDeNascimento', e.target.value)} value={clienteData.dataDeNascimento} />
                </div>
                <div className="modal-footer bg-whitesmoke br">
                    <button type="submit" className="btn btn-primary" id="swal-2">Salvar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </form>
        )
    }
    renderlistaclientesTable(listaclientes) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Aniversario</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaclientes.map(cliente =>
                        <tr key={cliente.uidCliente}>
                            <td>{cliente.nomeCliente}</td>
                            <td>{cliente.ddd} - {cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.datadeNascimento}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-dark" data-toggle="tooltip" title="" data-original-title="Enviar SMS" alt="Enviar SMS">
                                    <i className="fa fa-comments"></i>
                                </a>
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(cliente.uidCliente)} title="Atualizar Cliente" data-toggle="modal" data-target="#modalcliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(cliente.uidCliente)} data-original-title="Deletar Clientes" alt="Deletar Clientes">
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
            : this.renderlistaclientesTable(this.state.listaclientes);
        let clienteRender = this.state.loadingcliente ? <p><em>Carregando...</em></p>
            : this.renderClienteData(this.state.clienteData);
        return (
            <div>
                <section className="section">
                    <div className="section-header">
                        <h1><i className="fa fa-user-friends"></i> Clientes</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item active"><a href="/dashboard">Dashboard</a></div>
                            <div className="breadcrumb-item"><a href="/clientes">Clientes</a></div>
                        </div>
                    </div>
                    <p>
                        <button type="button" data-toggle="modal" data-target="#modalcliente" onClick={() => { this.setState({ clienteData : this.ClienteData() }) }} >Adicionar cliente</button>
                    </p>
                    <div className="section-body">
                        {contents}
                    </div>
                </section>
                 <div>
                    <div className="modal fade" tabIndex="-1" role="dialog" id="modalcliente">
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

