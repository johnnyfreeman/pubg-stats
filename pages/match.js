import { Component, Fragment } from 'react';
import api from '../src/api';
import Link from 'next/link';
import Roster from '../src/roster';
import moment from 'moment';
import { Div, Ul, Li } from 'glamorous';

function resourceReducer(state, resource) {
    const { id, type } = resource;

    if (!state.hasOwnProperty(type)) state[type] = {};
    if (!state[type].hasOwnProperty(id)) state[type][id] = resource;

    return state;
};

export default class extends Component {
    static async getInitialProps({ query }) {
        try {
            const response = await api.get(`/pc-na/matches/${query.id}`);
            const resourceMap = response.data.included.reduce(resourceReducer, {});
            return {
                response: response.data,
                resources: resourceMap,
                me: Object.values(resourceMap.participant).find((element) => {
                    return element.attributes.stats.playerId == 'account.16fce02e0bf9498d96ab307bcb8009e3';
                })
            };
        } catch (error) {
            return { error };
        }
    }

    get({ id, type }) {
        return this.props.resources[type][id];
    }

    getAll(resources) {
        return resources.map(this.get.bind(this));
    }

    render() {
        console.log(this.props);
        const match = this.props.response.data;
        return (
            <Div width="960">
                <Link href="/"><a>Search For Player</a></Link>

                <h1>Match Report</h1>
                <Ul listStyleType="none" paddingLeft="0" width="100%">
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" backgroundColor="#eeeeee" width="192">
                        <h2>{moment(match.attributes.createdAt).fromNow()}</h2>
                        <p style={{textTransform: 'uppercase', fontSize: 14}}>Created At</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" backgroundColor="#eeeeee" width="192">
                        <h2>{moment.duration(match.attributes.duration, 'seconds').humanize()}</h2>
                        <p style={{textTransform: 'uppercase', fontSize: 14}}>Duration</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" backgroundColor="#eeeeee" width="192">
                        <h2>{match.attributes.gameMode}</h2>
                        <p style={{textTransform: 'uppercase', fontSize: 14}}>Game Mode</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" backgroundColor="#eeeeee" width="192">
                        <h2>{match.attributes.shardId}</h2>
                        <p style={{textTransform: 'uppercase', fontSize: 14}}>Platform / Region</p>
                    </Li>
                </Ul>

                {this.props.response.data.relationships.rosters.data.sort((a, b) => {
                    const rosterA = this.get({ id: a.id, type: a.type });
                    const rosterB = this.get({ id: b.id, type: b.type });

                    if (this.props.me) {
                        if (rosterA.relationships.participants.data.some(resource => resource.id == this.props.me.id)) {
                            return -1;
                        }

                        if (rosterB.relationships.participants.data.some(resource => resource.id == this.props.me.id)) {
                            return 1;
                        }
                    }

                    if (rosterA.attributes.stats.rank > rosterB.attributes.stats.rank) {
                        return 1;
                    }

                    if (rosterA.attributes.stats.rank < rosterB.attributes.stats.rank) {
                        return -1;
                    }

                    return 0;
                }).map(({id, type}) => {
                    const roster = this.get({ id, type });

                    return <Roster
                        id={id}
                        type={type}
                        stats={roster.attributes.stats}
                        participants={this.getAll(roster.relationships.participants.data)} />;
                })}
            </Div>
        )
    }
};
