import { Component, Fragment } from 'react';
import api from '../src/api';
import Link from 'next/link';
import Participants from '../src/participants';
import Layout from '../src/layout';
import moment from 'moment';
import { Div, Ul, Li, A, Table, Tr, Th, Td } from 'glamorous';

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

    sortRoster(a, b) {
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
    }

    render() {
        const match = this.props.response.data;
        return (
            <Layout>
                <Link href="/"><A color="white" cursor="pointer" textDecoration="underline">Search For Player</A></Link>

                <h1>Match Report</h1>
                <Ul listStyleType="none" paddingLeft="0" width="100%">
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" width="192">
                        <h2>{moment(match.attributes.createdAt).fromNow()}</h2>
                        <p style={{color: '#6B7A86', textTransform: 'uppercase', fontSize: 14}}>Created At</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" width="192">
                        <h2>{moment.duration(match.attributes.duration, 'seconds').humanize()}</h2>
                        <p style={{color: '#6B7A86', textTransform: 'uppercase', fontSize: 14}}>Duration</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" width="192">
                        <h2>{match.attributes.gameMode}</h2>
                        <p style={{color: '#6B7A86', textTransform: 'uppercase', fontSize: 14}}>Game Mode</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" width="192">
                        <h2>{match.attributes.shardId}</h2>
                        <p style={{color: '#6B7A86', textTransform: 'uppercase', fontSize: 14}}>Platform / Region</p>
                    </Li>
                </Ul>

                <Table width="100%">
                    <thead>
                        <Tr>
                            <Th color="#6B7A86" padding="10" textAlign="left" textTransform="uppercase" fontSize="14" fontWeight="normal" width="20">Rank</Th>
                            <Th color="#6B7A86" padding="10" textAlign="left" textTransform="uppercase" fontSize="14" fontWeight="normal">Name</Th>
                            <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">Kills</Th>
                            <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">Assists</Th>
                            <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">DBNOs</Th>
                            <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">Damage Dealt</Th>
                            <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">Time Survived</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {this.props.response.data.relationships.rosters.data.sort(this.sortRoster.bind(this)).map(({id, type}, i) => {
                            const backgroundColor = i % 2 == 0 ? '#343E47' : '#46525C';
                            const roster = this.get({ id, type });

                            return this.getAll(roster.relationships.participants.data).map(({id, attributes}, i) => {
                                const { winPlace, playerId, name, kills, assists, DBNOs, damageDealt, timeSurvived } = attributes.stats;
                                return <Tr key={id}>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18" width="20">
                                        {roster.attributes.stats.rank}
                                    </Td>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18">
                                        <Link href={`/player?id=${playerId}`}><A color="#F7A448" cursor="pointer" textDecoration="underline">{name}</A></Link>
                                    </Td>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18" textAlign="center">
                                        {kills}
                                    </Td>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18" textAlign="center">
                                        {assists}
                                    </Td>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18" textAlign="center">
                                        {DBNOs}
                                    </Td>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18" textAlign="center">
                                        {damageDealt.toFixed(0)}
                                    </Td>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18" textAlign="center">
                                        {moment.duration(timeSurvived, 'seconds').humanize()}
                                    </Td>
                                </Tr>;
                            });
                        })}
                    </tbody>
                </Table>
            </Layout>
        )
    }
};
