import React, { Component } from 'react';
import './style.css';

export class ListaAgenda extends Component {
    static displayName = ListaAgenda.name;
   

    constructor(props) {
       
        super(props);
        this.state = { listaagenda: [], loading: true, loadingcliente: false, clienteData:  [], dataSelecionada: new Date(), DayWeek:'Domingo' };


        this.loadAgendaList = this.loadAgendaList.bind(this);
        let data = new Date();
        data.setHours(0, 0, 0, 0);
        this.setState({ dataSelecionada: data });
        this.getDayofWeek(this.state.dataSelecionada.getDay());
        this.getDayofWeek = this.getDayofWeek.bind(this);
        this.loadAgendaList(this.state.dataSelecionada);
        this.addNewDate = this.addNewDate.bind(this);
      
    }
    getDayofWeek(dayNumber) {

        const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        let dayName = days[dayNumber];
        this.setState({ DayWeek : dayName });
    }
    loadAgendaList(date) {
        
        fetch('api/vwAgenda/GetAgenda/'+date, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listaagenda: data, loading: false });
            });
    }
    addNewDate(e,type) {
        e.preventDefault();
        let date = new Date(this.state.dataSelecionada);
        //date.setHours(0, 0, 0, 0);
        if (type == "Add") {
            date.setDate(date.getDate() + 1);
            this.setState({ dataSelecionada: date });
        }
        if (type == "Remove") {
            date.setDate(date.getDate() - 1);
            this.setState({ dataSelecionada: date });

        }
        this.getDayofWeek(this.state.dataSelecionada.getDay());
    }

    render() {
       // this.getDayofWeek(this.state.dataSelecionada.getDay());
        return (
            <div className="col-md-4">
                <div className="card card-hero">
                    <div className="card-header">
                        <div className="card-icon">
                            <i className="far fa-calendar"></i>
                        </div>
                      
                        <div className="row">
                            <div className="col-sm-14" onClick={e=>this.addNewDate(e,'Remove')}>
                          
                                    <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
                           
                            </div>
                            <div className="col-sm-10 text-center">
                            <h3>
                                {this.state.dataSelecionada.toLocaleDateString()}
                                </h3>
                                <p>({this.state.DayWeek})</p>
                            </div>
                            <div className="col-sm-1 mt-14" onClick={e => this.addNewDate(e, 'Add')}>
                                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                            </div>
                         </div>
                        <div className="card-description text-center">Clientes agendados</div>
                    </div>
                    <div className="card-body p-0">
                        <div className="tickets-list">
                            <a href="#" className="ticket-item">
                                <div className="ticket-title">
                                    <h4>Manhã </h4>
                                </div>
                                <div className="ticket-info">
                                    <div>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">07h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">08h</span>
                                        <span className="btn btn-danger mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reunião com o cliente 001">09h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">10h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">11h</span>
                                        <span className="btn btn-danger mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reunião com o cliente 002">12h</span>
                                    </div>

                                </div>
                            </a>
                            <a href="#" className="ticket-item">
                                <div className="ticket-title">
                                    <h4>Tarde </h4>
                                </div>
                                <div className="ticket-info">
                                    <div>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">13h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">14h</span>
                                        <span className="btn btn-danger mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reunião com o cliente 003">15h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">16h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">17h</span>
                                        <span className="btn btn-danger mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reunião com o cliente 004">18h</span>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="ticket-item">
                                <div className="ticket-title">
                                    <h4>Noite</h4>
                                </div>
                                <div className="ticket-info">
                                    <div>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">19h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">20h</span>
                                        <span className="btn btn-danger mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reunião com o cliente 004">21h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">22h</span>
                                        <span className="btn btn-primary mt-1" data-toggle="tooltip" data-placement="top" title="" data-original-title="Horário Livre">23h</span>
                                    </div>
                                </div>
                            </a>
                            <p className="text-center pt-3">
                                <a href="#" className="btn btn-dark">
                                    Veja Mais <i className="fas fa-chevron-right"></i>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

