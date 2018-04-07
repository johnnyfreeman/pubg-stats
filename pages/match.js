import { Component, Fragment } from 'react';
import api from '../src/api';
import Link from 'next/link';
import { byMeThenRank } from '../src/roster-sorting';
import { reducer, denormalize } from '../src/resources';
import Layout from '../src/layout';
import moment from 'moment';
import { Div, Ul, Li, A, Table, Tr, Th, Td } from 'glamorous';

export default class extends Component {
    static async getInitialProps({ query }) {
        const response = await api.get(`/pc-na/matches/${query.id}`);

        return {
            match: denormalize.call(
                response.data.included.reduce(reducer, {}),
                response.data.data,
                3
            )
        };
    }

    render() {
        const match = this.props.match;

        return (
            <Layout>
                <Link href="/"><A color="white" cursor="pointer" textDecoration="underline">Find Another Player</A></Link>

                <h1>Match Report</h1>

                <Ul listStyleType="none" paddingLeft="0" width="100%">
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" width="192">
                        <h2>{moment(match.createdAt).fromNow()}</h2>
                        <p style={{color: '#6B7A86', textTransform: 'uppercase', fontSize: 14}}>Created At</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" width="192">
                        <h2>{moment.duration(match.duration, 'seconds').humanize()}</h2>
                        <p style={{color: '#6B7A86', textTransform: 'uppercase', fontSize: 14}}>Duration</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" marginRight="10" width="192">
                        <h2>{match.gameMode}</h2>
                        <p style={{color: '#6B7A86', textTransform: 'uppercase', fontSize: 14}}>Game Mode</p>
                    </Li>
                    <Li display="inline-block" textAlign="center" padding="20" width="192">
                        <h2>{match.shardId}</h2>
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
                        {match.rosters.sort(byMeThenRank).map((roster, i) => {
                            const backgroundColor = i == 0 ? '#F6993F' : i % 2 == 0 ? '#343E47' : '#46525C';

                            return roster.participants.map((participant, i) => {
                                const { winPlace, playerId, name, kills, assists, DBNOs, damageDealt, timeSurvived } = participant.stats;
                                return <Tr key={participant.id}>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18" width="20">
                                        {roster.stats.rank}
                                    </Td>
                                    <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18">
                                        <Link href={`/player?id=${playerId}`}><A color="white" cursor="pointer" textDecoration="underline">{name}</A></Link>
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
