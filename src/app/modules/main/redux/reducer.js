import { sortBy, reverse, findKey } from 'lodash';

import {
    GET_SENTENCES,
    GET_SENTENCES_SUCCESS,
    GET_SENTENCES_FAILURE,
    PICK_SENTENCE,
    ADVANCE_QUESTION
} from './actions';


const initialState = {
    error: false,
    errorMessage: null,
    sentences: [],
    currentQuestion: -1,
    answer: {
        adaptative: 0,
        integrity: 0,
        collaborative: 0,
        result: 0,
        customer: 0,
        detail: 0
    },
    isLoading: false,
};

const mainReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_SENTENCES:
            return {
                ...state,
                sentences: [],
                isLoading: true,
                error: false,
                errorMessage: null
            };

        case GET_SENTENCES_SUCCESS:
            return {
                ...state,
                sentences: payload,
                isLoading: false
            };
        
        case GET_SENTENCES_FAILURE:
            return {
                ...state,
                sentences: [],
                isLoading: false,
                error: true,
                errorMessage: "Coudn't fetch the sentences. Please reload your browser to try again."
            };

        case PICK_SENTENCE:
            const { dimension } = payload;
            return {
                ...state,
                answer: {
                    ...state.answer,
                    [dimension]: state.answer[dimension] + 1
                }
            };

        case ADVANCE_QUESTION:
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1
            };

        default:
            return state;
    }
}

export default mainReducer;