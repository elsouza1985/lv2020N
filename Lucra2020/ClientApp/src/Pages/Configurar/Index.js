import React from "react";
import api from '../../Services/api';
import { getEstabelecimento } from '../../Services/auth';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        //atualiza o state do componente
        this.state = {
            carregando: true,
            usuarioData: {}
        };
      
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
      

    }
    async loadUsuarioData() {
        const response = await api.get('/vwClientes/LoadList?_estab=' + getEstabelecimento());
        if (response.status === 200) {
            this.setState({ usuarioData: response.data, carregando: false });
        }
    }
    renderForm(usuario) {
        return (
            <div>
                <form>
                    <div className="row">
                        <div className="col-3-sm">Nome</div>
                        <div className="col-9-sm">
                            <input type="text" name="userName" className="form-control"/>
                        </div>

                    </div>

                </form>
            </div>

            );
    }
    render() {
        let conteudo = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderForm(this.state.usuarioData);
        return <div>
            <h3>Perfil</h3>
            <hr />
            {conteudo}
        </div>;
    }
}