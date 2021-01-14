import config from './../config';
export const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
    loader: false,
    react_only_status: false,
    alertMessage: "",
    alertVariant: "",
    field_message: "",
    field_ref: "",
    search: {
        startDate: "",
        endDate: "",
        text: ""
    },
};