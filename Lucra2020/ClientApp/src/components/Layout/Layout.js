import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import footer from './footer';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <div>
                    <NavMenu />
                    <div>
                        {this.props.children}
                    </div>
                </div>
                <footer />
            </div>
        );
    }
}
