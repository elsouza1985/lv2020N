

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../Services/api";
import logo from "../../Content/img/lucra-mais.png";
import { login, SetEstabelecimento } from "../../Services/auth";



class SignIn extends Component {
    state = {
        UserID: "",
        password: "",
        error: "",
        selectestabelecimento: false,
        estabelecimento: {},
        estabelecimentos: [],
        selectedEstab: '0'
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { UserID, password } = this.state;
        if (!UserID || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post("/login", { UserID, password });
                if (response.data.authenticated) {
                    
                    login(response.data.token);
                    if (response.data.estabelecimentos.length > 1) {
                        this.setState({ selectestabelecimento: true, estabelecimentos: response.data.estabelecimentos });
                       
                        
                    } else {
                        this.props.history.push("/home");
                    }
                } else {
                    this.setState({ error: response.data.message });
                }
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }
};
//loadEstabelecimentos = async id => {

//    let estabs = new Array();
//    const estabes = response.data.estabelecimentos;
//    for (let i = 0; i < estabes.length; i++) {
//        const ret = await api.get('/vwLogin/' +id);
//        if (ret.status === 200)
//            estabs.push(ret.data);
//}
    selectEstab = async e => {
        
        SetEstabelecimento(e);
        this.props.history.push("/home");

    }
    renderLoginPane() {
        return (<form onSubmit={this.handleSignIn} className="needs-validation" >
            <div className="form-group">
                <label >E-mail</label>
                <input id="email" type="email" className="form-control" name="email" onChange={e => this.setState({ UserID: e.target.value })} />
                <div className="invalid-feedback">
                    Coloque um e-mail válido
                    </div>
            </div>

            <div className="form-group">
                <div className="d-block">
                    <label className="control-label">Senha</label>
                    <div className="float-right">
                        <a href="auth-forgot-password.html" className="text-small">
                            Esqueceu sua senha ?
                        </a>
                    </div>
                </div>
                <input id="password" type="password" className="form-control" name="password" onChange={e => this.setState({ password: e.target.value })} />
                <div className="invalid-feedback">
                    Coloque sua senha !
                    </div>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" name="remember" className="custom-control-input" tabIndex="3" id="remember-me" />
                    <label className="custom-control-label" >Lembrar-me</label>
                </div>
            </div>
            {this.state.error && <p className="text-danger center">{this.state.error}</p>}
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                    Acessar
                    </button>
            </div>
        </form>);
    }
    renderEstabPane(estabelecimentos) {
       return (<form onSubmit={this.selectEstab} className="needs-validation" >
            <div className="form-group">
                <label >Estabelecimento</label>
                <select className="form-control" value={this.state.selectedEstab} onChange={(e) => (this.setState({ selectedEstab: e.target.value }))}>
                    <option value="0">Selecione...</option>
                    {estabelecimentos.map(estab =>
                        <option key={estab.uidEstabelecimento} value={estab.uidEstabelecimento}>{estab.nomeEstabelecimento}</option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                    Acessar
                    </button>
            </div>
        </form>)
    }
    render() {
        let content = this.state.selectestabelecimento ? this.renderEstabPane(this.state.estabelecimentos) : this.renderLoginPane();
            
            
        return (
        
                <div className="row">
                    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <div className="login-brand">
                        <img src={logo} alt="logo" width="140" />
                        </div>

                        <div className="card card-primary">
                            <div className="card-header"><h4>Login</h4></div>
                        
                        <div className="card-body">
                            {content}
                        </div>
                        </div>
                        <div className="mt-5 text-muted text-center">
                            Não possui uma conta? <a href="#">Crie aqui</a>
                        </div>
                        <div className="simple-footer">
                            Copyright © Valor9 2020
                        </div>
                    </div>
                </div>
         
        );
    }
}
export default withRouter(SignIn);