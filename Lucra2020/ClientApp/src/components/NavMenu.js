import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import "reactstrap";
import "../Content/modules/ionicons/css/ionicons.min.css";
import "../Content/modules/fontawesome/css/all.min.css";
import "../Content/css/style.css";
import "../Content/css/components.css";
import './NavMenu.css';

import img1 from '../Content/img/lucra-mais.png';
import img2 from "../Content/img/lucra-mais-small.png";
import img3 from '../Content/img/avatar/avatar-2.png';
import img4 from "../Content/img/avatar/avatar-1.png";
import { logout } from '../Services/auth';


export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: false,
            userName: "Erick Souza"
        };
    }

    toggleNavbar(e) {
        e.preventDefault();
        this.setState({
            collapsed: !this.state.collapsed
        });
        let body = document.getElementsByTagName('body')[0];
        if (this.state.collapsed) {

            try {
                body.classList.add('sidebar-mini');
            } catch (e) {

            }
        } else {
            body.classList.remove('sidebar-mini');
        }
    }

    render() {
        let menuOpen = this.state.collapsed ? 'sidebar-mini' : '';
        return (
            <header>

                <div className="main-wrapper main-wrapper-1">
                    <div className="navbar-bg"></div>
                    <nav className="navbar navbar-expand-lg main-navbar navbar-top">
                        <form className="form-inline mr-auto">
                            <ul className="navbar-nav mr-3 list-unstyled">
                                <li>
                                    <a href="#" onClick={e => this.toggleNavbar(e)} data-toggle="sidebar" className="nav-link nav-link-lg">
                                        <i className="ion-android-menu"></i>
                                    </a>
                                </li>
                            </ul>
                        </form>
                        <ul className="navbar-nav navbar-right list-unstyled">
                            <li className="dropdown dropdown-list-toggle">
                                <a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg beep">
                                    <i className="far fa-bell"></i><span className="btn-circle-header">2</span>
                                </a>
                                <div className="dropdown-menu dropdown-list dropdown-menu-right">
                                    <div className="dropdown-header">Notificações
              </div>
                                    <div className="dropdown-list-content dropdown-list-icons">
                                        <a href="#" className="dropdown-item dropdown-item-unread">
                                            <div className="dropdown-item-icon bg-primary text-white">
                                                <i className="fas fa-code"></i>
                                            </div>
                                            <div className="dropdown-item-desc">
                                                Notificação 1
                    <div className="time text-primary">Há 2 minutos</div>
                                            </div>
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            <div className="dropdown-item-icon bg-info text-white">
                                                <i className="far fa-user"></i>
                                            </div>
                                            <div className="dropdown-item-desc">
                                                <b>Notifi</b>cação 2
                    <div className="time">Há 10 minutos</div>
                                            </div>
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            <div className="dropdown-item-icon bg-success text-white">
                                                <i className="fas fa-check"></i>
                                            </div>
                                            <div className="dropdown-item-desc">
                                                <b>Notifi</b>cação 3
                    <div className="time">Há 1 hora</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown"><a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                                <img alt="image" src={img3} className="rounded-circle mr-1" />
                                <div className="d-sm-none d-lg-inline-block">Ola, {this.state.userName}</div></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-title">Login 06/02/2019 às 22h15</div>
                                    <a href="features-profile.html" className="dropdown-item has-icon">
                                        <i className="far fa-user"></i> Profile
              </a>
                                    <a href="features-activities.html" className="dropdown-item has-icon">
                                        <i className="fas fa-bolt"></i> Logs
              </a>
                                    <a href="features-settings.html" className="dropdown-item has-icon">
                                        <i className="fas fa-cog"></i> Configurar
              </a>
                                    <div className="dropdown-divider"></div>
                                    <a href="#" className="dropdown-item has-icon text-danger" onClick={logout}>
                                        <i className="fas fa-sign-out-alt"></i> Sair do Sistema
              </a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div className="main-sidebar sidebar-style-2">
                        <aside id="sidebar-wrapper">
                            <div className="sidebar-brand">
                                <a href="/" onClick={e => this.toggleNavbar(e)}><img src={img1} alt="logo" width="140" height="50" /></a>
                            </div>
                            <div className="sidebar-brand sidebar-brand-sm">
                                <a href="/" onClick={e => this.toggleNavbar(e)}><img src={img2} alt="logo" width="50" height="50" /></a>
                            </div>
                            <ul className="sidebar-menu">
                                <li className="menu-header">Menu Principal</li>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link" to="/"><i className="ion-speedometer"></i>  <span>Dashboard</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link" to="/vendas"><i className="fa fa-shopping-cart"></i> <span>Vendas</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link"  to="/clientes"><i className="fa fa-user-friends"></i> <span>Clientes</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link" to="/servicos"><i className="fa fa-briefcase"></i> <span>Serviços</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link" to="/produtos"><i className="fa fa-clipboard-list"></i> <span>Produtos</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link" to="/produtosestab"><i className="fa fa-clipboard-list"></i> <span>Produtos Estab</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link" to="/agenda"><i className="fa fa-calendar"></i> <span>Agenda</span></NavLink>
                                </NavItem>
                               
                            </ul>
                        </aside>
                    </div>
                </div>
            </header>
        );
    }
}
