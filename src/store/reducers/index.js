import { reduce as websocketReducer } from './websocket.reducer';
import { reduce as kernelsReducer } from './kernels.reducer';
import { reduce as datasetsReducer } from './datasets.reducer';
import { reduce as workersReducer } from './workers.reducer';
import { reduce as jobsReducer } from './jobs.reducer';

export default {
    websocket: websocketReducer,
    kernels: kernelsReducer,
    datasets: datasetsReducer,
    workers: workersReducer,
    jobs: jobsReducer
};