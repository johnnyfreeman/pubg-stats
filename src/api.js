import axios from 'axios';
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default axios.create({
    baseURL: 'https://api.playbattlegrounds.com/shards',
    headers: {
        Authorization: 'Bearer ' + publicRuntimeConfig.apiKey,
        Accept: 'application/vnd.api+json'
    }
});
