import { Component } from 'react';
import Link from 'next/link';
import { A, Div, Table, Tr, Th, Td } from 'glamorous';
import moment from 'moment';

export default function ({ id, type, stats, participants }) {
    return <Div key={id} marginTop="30">
        <h3>Team Rank: #{stats.rank}</h3>
        <Table width="100%">
            <thead>
                <Tr>
                    <Th color="#6B7A86" padding="10" textAlign="left" textTransform="uppercase" fontSize="14" fontWeight="normal">Name</Th>
                    <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">Kills</Th>
                    <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">Assists</Th>
                    <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">DBNOs</Th>
                    <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">Damage Dealt</Th>
                    <Th color="#6B7A86" padding="10" textAlign="center" textTransform="uppercase" fontSize="14" fontWeight="normal">Time Survived</Th>
                </Tr>
            </thead>
            <tbody>
                {participants.map(({id, attributes}) => {
                    const { playerId, name, kills, assists, DBNOs, damageDealt, timeSurvived } = attributes.stats;
                    return <Tr key={id}>
                        <Td padding="15px 25px" backgroundColor="#343E47" fontSize="18">
                            <Link href={`/player?id=${playerId}`}><A color="#F7A448" cursor="pointer" textDecoration="underline">{name}</A></Link>
                        </Td>
                        <Td padding="15px 25px" backgroundColor="#343E47" fontSize="18" textAlign="center">
                            {kills}
                        </Td>
                        <Td padding="15px 25px" backgroundColor="#343E47" fontSize="18" textAlign="center">
                            {assists}
                        </Td>
                        <Td padding="15px 25px" backgroundColor="#343E47" fontSize="18" textAlign="center">
                            {DBNOs}
                        </Td>
                        <Td padding="15px 25px" backgroundColor="#343E47" fontSize="18" textAlign="center">
                            {damageDealt.toFixed(0)}
                        </Td>
                        <Td padding="15px 25px" backgroundColor="#343E47" fontSize="18" textAlign="center">
                            {moment.duration(timeSurvived, 'seconds').humanize()}
                        </Td>
                    </Tr>;
                })}
            </tbody>
        </Table>
    </Div>;
};
