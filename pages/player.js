import { Component, Fragment } from 'react';
import api from '../src/api';
import Link from 'next/link';

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
            <Fragment>
                <Link href="/"><a>Search For Player</a></Link>

                <h1>{this.props.response.data.attributes.name}</h1>

                <ul>
                    {this.props.response.data.relationships.matches.data.map(({id, type}) => {
                        return <li key={id}><Link href={`/match?id=${id}`}><a>{id}</a></Link></li>;
                    })}
                </ul>
            </Fragment>
        )
    }
};
