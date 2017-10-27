import {
    map,
    find,
    filter,
    flatten,
    random,
    includes,
    concat
} from 'lodash';

import { fetchDimensions } from '../data';

const combine2 = (elements) => elements.length < 2 
    ? []
    : map(elements, 
        (first, i) => map(elements.slice(i + 1), 
            (second) => [first, second]));

const pickSentence = (questions, excludes) => {
    const notUsed = filter(questions, (q) => !includes(excludes, q.id));
    return notUsed[random(0, notUsed.length - 1)];
};  

const schuffle = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getSentences = () => fetchDimensions().then((dimensions) => {
    const excludes = [];
    const partialSentences = flatten(combine2(Object.keys(dimensions)));
    return map(schuffle(concat(partialSentences,  partialSentences)), 
        ([a, b]) => {
            const first = pickSentence(dimensions[a], excludes);
            const second = pickSentence(dimensions[b], excludes);
            
            const result = [{
                    ...first,
                    dimension: a
                },
                {
                    ...second,
                    dimension: b
                }
            ];

            excludes.push(first.id);
            excludes.push(second.id);

            return result;
        });
});