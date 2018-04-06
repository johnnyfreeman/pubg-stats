import { Component } from 'react';
import Link from 'next/link';
import Layout from '../src/layout';
import { Input, Button } from 'glamorous';

export default class extends Component {
    state = {
        query: ''
    }

    render() {
        return (
            <Layout>
                <form>
                    <p>Enter your PUGB username <em>exactly</em>.</p>

                    <Input
                        autoFocus
                        backgroundColor="#343E47"
                        border="1px solid #F7A448"
                        borderRadius="3"
                        color="white"
                        fontSize="14"
                        onChange={e => this.setState({query: e.target.value})}
                        padding="10"
                        type="text"
                        value={this.state.query} />

                    <Link href={`/players?names=${this.state.query}`}>
                        <Button backgroundColor="#F7A448" border="1px solid #F7A448" borderRadius="3" color="white" fontSize="14" marginLeft="10" padding="10">Find</Button>
                    </Link>
                </form>
            </Layout>
        )
    }
};
