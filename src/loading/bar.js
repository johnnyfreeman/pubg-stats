import React, { Component } from 'react';
import { Span } from 'glamorous';

export default class LoadingBar extends Component {

    render() {
        return (
            <Span
                background="#F6993F"
                position="absolute"
                zIndex={1}
                top={0}
                left={0}
                width="100%"
                height={3}
                transition="all 200ms ease"
                style={{
                    transform: `translate3d(${this.props.percent - 100}%, 0px, 0px)`
                }}
            />
        );
    }

};
