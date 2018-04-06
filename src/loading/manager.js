import { Component } from 'react';
import Router from 'next/router';
import Bar from './bar';

export default class LoadingManager extends Component {

    trickleId = undefined;

    constructor(props) {
        super(props);

        this.state = {
            showBar: false,
            status: 0
        };
    }

    componentDidMount() {
        Router.onRouteChangeStart = () => this.start();
        Router.onRouteChangeComplete = () => this.finish();
        Router.onRouteChangeError = () => this.finish();
    }

    componentWillUnmount() {
        Router.onRouteChangeStart = undefined;
        Router.onRouteChangeComplete = undefined;
        Router.onRouteChangeError = undefined;
    }

    nextStep() {
        const random = Math.random();

        if (this.state.status < 20) {
            return random * 10;
        } else if (this.state.status < 50) {
            return random * 5;
        } else if (this.state.status < 80) {
            return random * 2;
        } else {
            return random * .5;
        }
    }

    increment() {
        this.setState((prevState, props) => {
            return { status: prevState.status + this.nextStep() };
        });
    }

    start() {
        this.setState({ showBar: true, status: this.nextStep() });

        this.trickle();
    }

    trickle() {
        this.trickleId = setTimeout(() => {
            this.increment();
            if (this.state.status < 95) this.trickle();
        }, Math.random() * Math.floor(500));
    };

    stopTrickle() {
        clearTimeout(this.trickleId);
    }

    finish() {
        this.stopTrickle();
        this.setState({ status: 100 });

        setTimeout(() => {
            this.setState({ showBar: false, status: 0 });
        }, 500);
    }

    render() {
        return this.state.showBar ? <Bar percent={this.state.status} /> : null;
    }

};
