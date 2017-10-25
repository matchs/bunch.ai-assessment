import axios from 'axios';

import {
    api
} from '../../../../../config/app';

const {
    base : baseURL,
} = api.REST.paths;

const request = axios.create({
    baseURL,
    timeout: api.REST.timeout,
});

