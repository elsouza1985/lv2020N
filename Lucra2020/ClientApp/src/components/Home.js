import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
        <div>
        <section className="section">
            <div className="section-header">
                <h1>Dashboard</h1>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card card-statistic-2">
                        <div className="card-stats">
                            <div className="card-stats-title">Mês Campeão de Vendas -
                    <div className="dropdown d-inline">
                                    <a className="font-weight-600 dropdown-toggle" data-toggle="dropdown" href="#" id="orders-month">Agosto</a>
                                    <ul className="dropdown-menu dropdown-menu-sm">
                                        <li className="dropdown-title">Select Month</li>
                                        <li><a href="#" className="dropdown-item">Janeiro</a></li>
                                        <li><a href="#" className="dropdown-item">Fevereiro</a></li>
                                        <li><a href="#" className="dropdown-item">Março</a></li>
                                        <li><a href="#" className="dropdown-item">Abril</a></li>
                                        <li><a href="#" className="dropdown-item">Maio</a></li>
                                        <li><a href="#" className="dropdown-item">Junho</a></li>
                                        <li><a href="#" className="dropdown-item">Julho</a></li>
                                        <li><a href="#" className="dropdown-item active">Agosto</a></li>
                                        <li><a href="#" className="dropdown-item">Setembro</a></li>
                                        <li><a href="#" className="dropdown-item">Outubro</a></li>
                                        <li><a href="#" className="dropdown-item">Novembro</a></li>
                                        <li><a href="#" className="dropdown-item">Dezembro</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-stats-items">
                                <div className="card-stats-item">
                                    <div className="card-stats-item-count">R$5000</div>
                                    <div className="card-stats-item-label">Produto 1</div>
                                </div>
                                <div className="card-stats-item">
                                    <div className="card-stats-item-count">R$1500</div>
                                    <div className="card-stats-item-label">Produto 2</div>
                                </div>
                                <div className="card-stats-item">
                                    <div className="card-stats-item-count">R$800</div>
                                    <div className="card-stats-item-label">Produto 3</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-icon shadow-primary bg-primary">
                            <i className="fas fa-archive"></i>
                        </div>
                        <div className="card-wrap">
                            <div className="card-header">
                                <h4>Total Mês</h4>
                            </div>
                            <div className="card-body">
                                R$3500
                  </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card card-statistic-2">
                        <div className="card-chart"><div className="chartjs-size-monitor class1" ><div className="chartjs-size-monitor-expand class1" ><div ></div></div>
                            <div className="chartjs-size-monitor-shrink class1" ><div className="class2"></div></div></div>
                            <canvas id="balance-chart" height="94" width="400" className="chartjs-render-monitor class3" ></canvas>
                        </div>
                        <div className="card-icon shadow-primary bg-primary">
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className="card-wrap">
                            <div className="card-header">
                                <h4>Valor Total de Vendas</h4>
                            </div>
                            <div className="card-body">
                                R$15800
                  </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card card-statistic-2">
                              <div className="card-chart">
                                  <div className="chartjs-size-monitor class1" >
                                      <div className="chartjs-size-monitor-expand class1">
                                          <div >
                                          </div>
                                      </div>
                                      <div className="chartjs-size-monitor-shrink class1" >
                                          <div ></div></div></div>
                            <canvas id="sales-chart" height="94" width="400" className="chartjs-render-monitor" ></canvas>
                        </div>
                        <div className="card-icon shadow-primary bg-primary">
                            <i className="fas fa-shopping-bag"></i>
                        </div>
                        <div className="card-wrap">
                            <div className="card-header">
                                <h4>Número total de Vendas</h4>
                            </div>
                            <div className="card-body">
                                550
                  </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 col-md-12 col-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Vendas por período</h4>
                            <div className="card-header-action">
                                <div className="btn-group">
                                    <a href="#" className="btn">01/02/2019 até 28/02/2019</a>
                                </div>
                            </div>
                        </div>
                              <div className="card-body"><div className="chartjs-size-monitor" >
                                  <div className="chartjs-size-monitor-expand" >
                                      <div >
                                      </div>
                                  </div>
                                  <div className="chartjs-size-monitor-shrink" >
                                      <div></div></div></div>
                            <canvas id="myChart" height="460" width="759" className="chartjs-render-monitor" ></canvas>
                            <div className="statistic-details mt-sm-4">
                                <div className="statistic-details-item">
                                    <span className="text-muted"><span className="text-primary"><i className="fas fa-caret-up"></i></span> 7%</span>
                                    <div className="detail-value">R$243</div>
                                    <div className="detail-name">Valores Novembro de 2018</div>
                                </div>
                                <div className="statistic-details-item">
                                    <span className="text-muted"><span className="text-danger"><i className="fas fa-caret-down"></i></span> 23%</span>
                                    <div className="detail-value">R$150</div>
                                    <div className="detail-name">Valores Dezembro de 2018</div>
                                </div>
                                <div className="statistic-details-item">
                                    <span className="text-muted"><span className="text-primary"><i className="fas fa-caret-up"></i></span>9%</span>
                                    <div className="detail-value">R$12,821</div>
                                    <div className="detail-name">Valores Janeiro de 2019</div>
                                </div>
                                <div className="statistic-details-item">
                                    <span className="text-muted"><span className="text-primary"><i className="fas fa-caret-up"></i></span> 19%</span>
                                    <div className="detail-value">R$1521</div>
                                    <div className="detail-name">Valores Fevereiro de 2019</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card card-hero">
                        <div className="card-header">
                            <div className="card-icon">
                                <i className="far fa-calendar"></i>
                            </div>
                            <h4>11/02/19</h4>
                            <div className="card-description">Clientes Agendados</div>
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
            </div>
              </section>
              </div>
    );
  }
}
