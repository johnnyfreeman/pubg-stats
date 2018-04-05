import { Component, Fragment } from 'react';
import api from '../src/api';
import Link from 'next/link';

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
                            <a>{resource.attributes.name}</a>
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
            <Fragment>
                <Link href="/"><a>Search For Player</a></Link>

                { this.props.error ? this.renderError() : this.renderResponseData() }
            </Fragment>
        )
    }
};
