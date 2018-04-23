import { fork, put, select, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* startDatasetsFetch() {
    
    try {
        const response = yield services.callApi('datasets');

        if (!response.datasets) {

            return yield put(actions.datasetsError(new Error('Wrong response')));
        }

        yield put(actions.datasetsReceived(response.datasets));

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.datasetsError(response.error.map(({ error }) => new Error(error))));
        }

    } catch(err) {
        yield put(actions.datasetsError(err));
    }
}

function* startSingleDatasetFetch(req) {

    try {
        const response = yield services.callApi(`datasets/address/${req.address}`);

        if (!response) {

            return yield put(actions.datasetsError(new Error('Wrong response')));
        }

        yield put(actions.datasetSingleReceived(response));

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.datasetsError(response.error.map(({ error }) => new Error(error))));
        }

    } catch(err) {
        yield put(actions.datasetsError(err));
    }
}

function* initDatasets() {
    const datasets = yield select(selectors.getDatasets);

    if (datasets.length === 0) {

        yield put(actions.datasetsFetch());
    }
} 

function* watchRouter() {
    yield takeLatest('persist/REHYDRATE', initDatasets);// Start if REHYDRATE process done only
    yield takeLatest('DATASETS_FETCH', startDatasetsFetch);
    yield takeLatest('DATASETS_SINGLE_FETCH', startSingleDatasetFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]