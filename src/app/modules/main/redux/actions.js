export const GET_SENTENCES = 'app/main/get/sentences';
export const GET_SENTENCES_SUCCESS = 'app/main/get/sentences/success';
export const GET_SENTENCES_FAILURE = 'app/main/get/sentences/failure';

export const PICK_SENTENCE = 'app/main/pick/sentence';

export const ADVANCE_QUESTION = 'app/main/advance/question';

function makeAction(type) {
    return (payload) => ({
        type,
        payload,
    });
}

export const getSentencesAction = makeAction(GET_SENTENCES);
export const getSentencesSuccessAction = makeAction(GET_SENTENCES_SUCCESS);
export const getSentencesFailureAction = makeAction(GET_SENTENCES_FAILURE);

export const pickSentenceAction = makeAction(PICK_SENTENCE);

export const advanceQuestionAction = makeAction(ADVANCE_QUESTION);