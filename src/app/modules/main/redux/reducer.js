import { sortBy, reverse, findKey } from 'lodash';

import {
    EXAMPLE
} from './actions';


const initialState = {
    example: 0
}

const mainReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case EXAMPLE:
            return {
                ...state,
                example: state.example + 1
            };

        default:
            return state;
    }
}

export default mainReducer;