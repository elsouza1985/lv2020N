import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import { Home } from './components/Home';
import { ListaClientes } from './components/Clientes/ListaClientes';
import { ExibeCliente } from './components/Clientes/ExibirCliente';
import { ListaProdutos } from './components/Produtos/ListaProdutos';
import { ListaProdutosEstab } from './components/Produtos/ListaProdutosEstab';
import { ListaServicos } from './components/Servicos/ListaServicos';
import { ListaAgenda } from './components/Agenda/ListaAgenda';
import { Tela } from './components/Vendas/Tela';
import SignIn from './Pages/Login';

import { isAuthenticated } from "./Services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={() => <h1>SignUp</h1>} />
            <Layout>
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path='/clientes' component={ListaClientes} />
                <PrivateRoute path='/clientes/edit/:contid' component={ExibeCliente} />
                <PrivateRoute path="/produtos" component={ListaProdutos} />
                <PrivateRoute path="/produtosestab" component={ListaProdutosEstab} />
                <PrivateRoute path="/servicos" component={ListaServicos} />
                <PrivateRoute path="/agenda" component={ListaAgenda} />
                <PrivateRoute path="/vendas" component={Tela} />

            </Layout>
        </Switch>
    </BrowserRouter>
);

export default Routes;