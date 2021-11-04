export const INFO_TYPES = {
    CONNECT: 'connect_the_user',
    DISCONNECT: 'disconect_the_user',
}

const INITIAL_STATE = {
    token: "",
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case INFO_TYPES.CONNECT:
            return {...state, token: action.token};
        case INFO_TYPES.DISCONNECT:
            return {...state, token: ""};
        default:
            return state;
    }
};