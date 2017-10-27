import { take, takeEvery, put, call, all } from 'redux-saga/effects'

import {
    getSentences
} from '../services/dimensions';

import {
    GET_SENTENCES,
    PICK_SENTENCE,
    getSentencesSuccessAction,
    getSentencesFailureAction,
    advanceQuestionAction,
} from './actions';


export function* getSentencesSaga() {
    try {
        const sentences = yield call(getSentences);
        yield put(getSentencesSuccessAction(sentences))
        yield put(advanceQuestionAction());
    } catch (e) {
        yield put(getSentencesFailureAction());
    }
}

export function* getSentencesWatcher() {
    yield takeEvery(GET_SENTENCES, getSentencesSaga);
}

export function* pickSentenceSaga({ payload }) {
    yield put(advanceQuestionAction());
    return payload;
} 

export function* pickSentenceWatcher() {
    yield takeEvery(PICK_SENTENCE, pickSentenceSaga);
}

export default function* mainSagas() {
    yield all([
        getSentencesWatcher(),
        pickSentenceWatcher(),
    ]);
}