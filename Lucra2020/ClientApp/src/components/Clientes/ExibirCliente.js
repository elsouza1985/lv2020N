
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
//import { ClienteData } from './ListaClientes';

export class ExibeCliente extends React.Component {
    constructor(props) {
        super(props);
        //atualiza o state do componente
        this.state = { titulo: "", carregando: true, contData:[]};

        //id do contato
        let contid = this.props.match.params["contid"];
        // define o state para a edição de um contato
        if (contid > 0) {
            fetch('api/vwClientes/ff0de7f4-9ad0-49cd-805f-d8a223e68c78' )
                .then(response => response.json())
                .then(data => {
                    this.setState({ titulo: "Editar", carregando: false, contData: data });
                    console.log(data);
                });
        }
        else // define o state para adição de contato
        {
            this.state = { titulo: "Criar", carregando: false, contData: [] };
        }
        // este binding é necessário para fazer o 'this' funcionar no callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        //this.props = this.props.bind(this);

    }
    render() {
        let conteudo = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.titulo}</h1>
            <h3>Contato</h3>
            <hr />
            {conteudo}
        </div>;
    }
    // trata o evento submit do formulario
    handleSave(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        // PUT solicitação para editar contato
        if (this.state.contData.contatoId) {
            fetch('api/vwClientes/' + this.state.contData.idCliente, {
                method: 'PUT',
                body: data,
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    this.props.history.push("/clientes");
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
            })
        }
        else // POST requisição para adicionar contato
        {
            fetch('api/vwCliente', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/clientes");
                })
        }
    }
    // trata o evento do botão cancela
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/clientes");
    }
    // Retorna o formulario HTMl para o método Render
    renderCreateForm() {
        return (

            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Editar Cliente</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={this.handleSave} >
                        <div className="form-group">
                            <label>*Nome:</label>
                            <input type="text" className="form-control" name="nomeCliente" defaultValue={this.state.contData.nomeCliente} required="" />
                        </div>
                        <div className="form-group">
                            <label>*Telefone:</label>
                            <input type="text" className="form-control" required="" />
                        </div>
                        <div className="form-group">
                            <label>E-mail:</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Aniversário:</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="modal-footer bg-whitesmoke br">
                            <button type="button" className="btn btn-primary" id="swal-2">Editar</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
          