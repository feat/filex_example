import React from 'react';
import get from 'lodash.get'
import EventList from './EventList';
import {
    fetchUserEvents
} from './requests'
import { useHistory } from 'react-router-dom';
function UserPage(props) {
    const {
        location: {
            state,
        },
        match: { 
            params: {
                uid
            }
        }
    } = props;
    const user = get(state, 'user');
    const history = useHistory();
    return (
        <div className='App'>
            <div className="App__header">
                <div className="PageHeader">
                    <div className="PageHeader__left pl_12">
                        <button
                            className='button button_merge button_sm'
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            后退
                        </button>
                    </div>
                    <div className="PageHeader__center">
                        <h3 className="PageTitle">
                            {user ? user.username : '...'}
                        </h3>
                    </div>
                    <div className="PageHeader__right">

                    </div>
                </div>
            </div>
            <div className="App__content">
                <EventList 
                    request={(pagination) => fetchUserEvents(uid, pagination)}
                    showUserInfo={false}
                />
            </div>
        </div>
    )
}

export default UserPage;