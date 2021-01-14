import * as actionTypes from './actions';

const reducer = (state = actionTypes.initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADER_ACTIVE:
            return {
                ...state,
                loader: !state.loader
            }
        case actionTypes.TOP_CHANGE:
            return {
                ...state,
                [action.key]: action.value
            };
        default:
            return state;
    }
};

export default reducer