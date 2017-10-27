import { createSelector } from 'reselect';
import { map } from 'lodash';

const dimension2textMap = {
    adaptive: "Adaptability",
    integrity: "Results-orientation",
    collaborative: "Collaboration",
    result: "Attention to detail",
    customer: "Principles",
    detail: "Customer-orientation",
};

const mainStateSelector = (state) => state.main;

export const errorSelector = createSelector(mainStateSelector, ({ error, errorMessage }) => ({ error, errorMessage }));
export const isLoadingSelector = createSelector(mainStateSelector, ({ isLoading }) => isLoading);
export const sentencesSelector = createSelector(mainStateSelector, ({ sentences }) => sentences);
export const currentQuestionSelector = createSelector(mainStateSelector, ({ currentQuestion }) => currentQuestion);
export const assessmentResultSelector = createSelector(mainStateSelector, ({ answer }) => map(Object.keys(answer), (k) => ({
    dimension: dimension2textMap[k],
    value: answer[k]
})));