import React from 'react';
import BottomBar from './BottomBar';
import { fetchPublicFeed } from './requests';
import EventList from './EventList';


function Explore() {
    return (
        <div className='App'>
            <div className="App__header">
                <div className="PageHeader">
                    <h1 className="PageTitle pl_16">发现</h1>
                </div>
            </div>
            <div className="App__content">
                <EventList 
                    request={fetchPublicFeed}
                />
            </div>
            <div className="App__footer">
                <BottomBar />
            </div>
        </div>
    )
}

export default Explore;