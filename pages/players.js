import { Component, Fragment } from 'react';
import api from '../src/api';
import Layout from '../src/layout';
import Link from 'next/link';
import { Table, Td, A } from 'glamorous';

export default class extends Component {
    static async getInitialProps({ query }) {
        try {
            const response = await api.get(`/pc-na/players?filter[playerNames]=${query.names}`);
            return { response: response.data };
        } catch (error) {
            return { error };
        }
    }

    renderResponseData() {
        return (
            <Table width="100%" marginTop="30">
                {this.props.response.data.map((resource, i) => {
                    const backgroundColor = i % 2 == 0 ? '#343E47' : '#46525C';
                    return <tr><Td key={resource.id} padding="15px 25px" backgroundColor={backgroundColor} fontSize="18">
                        <Link href={`/player?id=${resource.id}`}>
                            <A color="#F7A448" cursor="pointer" textDecoration="underline">{resource.attributes.name}</A>
                        </Link>
                    </Td></tr>;
                })}
            </Table>
        );
    }

    renderError() {
        return <p>No players found.</p>;
    }

    render() {
        return (
            <Layout>
                <Link href="/"><A color="white" cursor="pointer" textDecoration="underline">Find Another Player</A></Link>

                { this.props.error ? this.renderError() : this.renderResponseData() }
            </Layout>
        )
    }
};
