import axios from 'axios';

import {
    api
} from '../../../../../config/app';

const {
    base : baseURL,
    dimensions: dimensionsPath,
} = api.REST.paths;

const request = axios.create({
    baseURL,
    timeout: api.REST.timeout,
});

export const fetchDimensions = () => request.get(dimensionsPath).then((r) => r.data);
