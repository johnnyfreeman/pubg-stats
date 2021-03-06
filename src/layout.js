import { Div } from 'glamorous';
import LoadingManager from './loading/manager';

export default function ({ children }) {
    return <Div textAlign="center" backgroundColor="#262E36" color="white" padding="40" margin="-10" fontFamily="Arial, Helvetica, sans-serif">
        <LoadingManager />
        <Div marginRight="auto" marginLeft="auto" textAlign="left" width="960">{children}</Div>
    </Div>;
};
