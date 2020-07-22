import React, { useContext, useCallback } from 'react';
import { fetchEventList } from './requests'
import { AuthInfo } from './AuthInfoProvider'
import AuthRequiredHint from './AuthRequiredHint'
import BottomBar from './BottomBar';
import EventList from './EventList';
import NewButton from './NewButton'

function Me(props) {
    const { state, dispatch } = useContext(AuthInfo);
    const handleListRequest = useCallback((pagination) => {
        if (!state.token) {
            return;
        }
        return fetchEventList(pagination, state.token);
    }, [state.token]);

    if (state.token) {
        return (
            <div className='App'>
            <div className="App__header">
                <div className="PageHeader">
                {state.currentUser ? (
                    <div className='AvatarStamp pl_12'>
                        <img className='AvatarStamp__avatar' src={state.currentUser.avatar} />
                        <span className='AvatarStamp__username'>{state.currentUser.username}</span>
                    </div>
                    ) : <div className='pl_12'>...</div>}
                    <div className="PageHeader__right pr_12">
                        <button 
                            className='button button_merge'
                            onClick={() => {
                                dispatch({
                                    type: 'reset'
                                })
                            }}
                        >
                            退出
                        </button>
                    </div>
                </div>
            </div>
            <div className="App__content">
                <EventList 
                    request={handleListRequest}
                    showUserInfo={false}
                />
                <NewButton 
                    onClick={() => {
                        props.history.push('/event/new');
                    }}
                />
            </div>
            <div className="App__footer">
                <BottomBar />
            </div>
        </div>
        )
    }
    return (
        <AuthRequiredHint />
    )
}

export default Me;