    import { take, takeEvery, put, call, all } from 'redux-saga/effects'

import {
    EXAMPLE
} from './actions';


export function* exampleSaga({ payload }) {
    
}

export function* exampleWatcher() {
    yield takeEvery(EXAMPLE, exampleSaga);
}

export default function* mainSagas() {
    yield all([
        exampleWatcher()
    ]);
}