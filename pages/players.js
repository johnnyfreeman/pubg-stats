import { Component, Fragment } from 'react';
import api from '../src/api';
import Layout from '../src/layout';
import { denormalize } from '../src/resources';
import Link from 'next/link';
import { Table, Td, A } from 'glamorous';

export default class extends Component {
    static async getInitialProps({ query }) {
        const response = await api.get(`/pc-na/players?filter[playerNames]=${query.names}`);

        return {
            players: response.data.data.map(function (player) {
                return denormalize.call({}, player, 0);
            })
        };
    }

    renderResponseData() {
        return (
            <Table width="100%" marginTop="30">
                <tbody>
                    {this.props.players.map((player, i) => {
                        const backgroundColor = i % 2 == 0 ? '#343E47' : '#46525C';
                        return <tr key={player.id}>
                            <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18">
                                <Link href={`/player?id=${player.id}`}>
                                    <A color="#F6993F" cursor="pointer" textDecoration="underline">{player.name}</A>
                                </Link>
                            </Td>
                        </tr>;
                    })}
                </tbody>
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
