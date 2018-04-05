import { Component, Fragment } from 'react';
import api from '../src/api';
import Link from 'next/link';
import Layout from '../src/layout';
import { A } from 'glamorous';

export default class extends Component {
    static async getInitialProps({ query }) {
        try {
            const response = await api.get(`/pc-na/players/${query.id}`);
            return { response: response.data };
        } catch (error) {
            return { error };
        }
    }

    render() {
        return (
            <Layout>
                <Link href="/"><A color="white" cursor="pointer" textDecoration="underline">Search For Player</A></Link>

                <h1>{this.props.response.data.attributes.name}</h1>

                <ul>
                    {this.props.response.data.relationships.matches.data.map(({id, type}) => {
                        return <li key={id}><Link href={`/match?id=${id}`}><A color="#F7A448" cursor="pointer" textDecoration="underline">{id}</A></Link></li>;
                    })}
                </ul>
            </Layout>
        )
    }
};
