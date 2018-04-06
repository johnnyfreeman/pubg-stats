import { Component, Fragment } from 'react';
import api from '../src/api';
import Link from 'next/link';
import Layout from '../src/layout';
import { Table, Td, A } from 'glamorous';

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
                <Link href="/"><A color="white" cursor="pointer" textDecoration="underline">Find Another Player</A></Link>

                <h1>{this.props.response.data.attributes.name}</h1>

                <Table width="100%">
                    <tbody>
                        {this.props.response.data.relationships.matches.data.map(({id, type}, i) => {
                            const backgroundColor = i % 2 == 0 ? '#343E47' : '#46525C';
                            return <tr key={id}>
                                <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18">
                                    <Link href={`/match?id=${id}`}><A color="#F7A448" cursor="pointer" textDecoration="underline">{id}</A></Link>
                                </Td>
                            </tr>;
                        })}
                    </tbody>
                </Table>
            </Layout>
        )
    }
};
