import { Component, Fragment } from 'react';
import api from '../src/api';
import Layout from '../src/layout';
import Link from 'next/link';
import { A } from 'glamorous';

export default class extends Component {
    static async getInitialProps({ query }) {
        try {
            const response = await api.get(`/pc-na/players?filter[playerNames]=${query.name}`);
            return { response: response.data };
        } catch (error) {
            return { error };
        }
    }

    renderResponseData() {
        return (
            <ul>
                {this.props.response.data.map((resource) => {
                    return <li key={resource.id}>
                        <Link href={`/player?id=${resource.id}`}>
                            <A color="#F7A448" cursor="pointer" textDecoration="underline">{resource.attributes.name}</A>
                        </Link>
                    </li>;
                })}
            </ul>
        );
    }

    renderError() {
        return <p>No players found.</p>;
    }

    render() {
        return (
            <Layout>
                <Link href="/"><A color="white" cursor="pointer" textDecoration="underline">Search For Player</A></Link>

                { this.props.error ? this.renderError() : this.renderResponseData() }
            </Layout>
        )
    }
};
