import React, { useReducer, useEffect } from 'react';

const defaultState = {
    currentUser: null,
    token: undefined,
}
export const AuthInfo = React.createContext(defaultState);
const STORAGE_KEY = 'authInfo';
const reducer = (state, action) => {
    switch (action.type) {
        case 'set-token':
            return {
                ...state,
                token: action.payload,
            }
        case 'set-current-user':
            return {
                ...state,
                currentUser: action.payload,
            };
        case 'reset':
            return defaultState;
        default: 
            return state;
    }
}
let initState;
try {
    initState = JSON.parse(localStorage.getItem(STORAGE_KEY));
} catch {
    
}
initState = initState || defaultState;

function AuthInfoProvider(props) {
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    return (
        <AuthInfo.Provider 
            value={{
                state, 
                dispatch,
            }}
        >
            {props.children}
        </AuthInfo.Provider>
        
    )
}

export default AuthInfoProvider;