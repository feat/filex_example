import React from 'react';
import CommentList from './CommentList';
import NewButton from './NewButton'

function EventComment(props) {
    const {
        match: { params: { id } }
     } = props;
    return (
        <div className='App'>
            <div className="App__header">
                <div className="PageHeader">
                    <div className="PageHeader__left pl_12">
                        <button 
                            className='button button_merge'
                            type='button'
                            onClick={() => {
                                props.history.goBack();
                            }}
                        >
                            后退
                        </button>
                    </div>
                    <div className="PageHeader__center">
                        <h3 className="PageTitle">评论列表</h3>
                    </div>
                    <div className="PageHeader__right pr_12">
                    </div>
                </div>
            </div>
            <div className="App__content">
                <CommentList 
                    eventId={id}
                />
                <NewButton 
                    onClick={() => {
                        props.history.push(`/event/${id}/comment/new`);
                    }}
                />
            </div>
        </div>
    )
}

export default EventComment;