import Link from 'next/link';
import { A, Tr, Td } from 'glamorous';
import moment from 'moment';

export default function ({ participants, backgroundColor }) {
    return participants.map(({id, attributes}, i) => {
        const { winPlace, playerId, name, kills, assists, DBNOs, damageDealt, timeSurvived } = attributes.stats;
        return <Tr key={id}>
            <Td padding="15px 25px" backgroundColor={backgroundColor} fontSize="18">
                {winPlace}
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
    })
};
