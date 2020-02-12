import React, { Component } from 'react';

export class footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                <div className="footer-left">
                    Copyright &copy; {new Date().getFullYear()} <div class="bullet"></div> Powered By: <a href="http://valor9.com.br" target="new">Valor 9</a>
                </div>
                <div className="footer-right">
                </div>
            </footer>
        );

    }
}