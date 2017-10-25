export const EXAMPLE = 'app/main/example';

function makeAction(type) {
    return (payload) => ({
        type,
        payload,
    });
}

export const exampleAction = makeAction(EXAMPLE);