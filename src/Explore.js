import React, { useEffect, useState } from 'react';
import BottomBar from './BottomBar';
import { fetchPublicFeed } from './requests';

function Explore() {
    const [state, setState] = useState({
        loading: false,
        items: [],
        hasMore: true,
        next: null,
    });
    useEffect(() => {
        if (state.loading) {
            return;
        }
        setState({
                ...state,
                loading: true,
            });
        fetchPublicFeed(state.next || {
            page: 1,
            page_size: 12,
        }).then(({ data, pagination }) => {
            setState({
                ...state,
                loading: false,
                next: pagination.next ? {
                    page: pagination.next,
                    page_size: pagination.page_size
                } : null,
                hasMore: !!pagination.next,
                items: [
                    ...state.items,
                    ...data,
                ]
            })
        }).catch((err) => {
            setState({
                ...state,
                loading: false,
                fetchError: err,
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(state);

    return (
        <div className='App'>
            <div className="App__header">
                <div className="PageHeader">
                    <h1 className="PageTitle pl_16">发现</h1>
                </div>
            </div>
            <div className="App__content">
                {state.fetchError && <div>{state.fetchError.message}</div>}
                {state.loading && <div>加载中</div>}
                {state.items && !!state.items.length && (
                    <div>
                        {state.items.map((item) => (
                            <div className='px_16 py_12' key={item.id}>
                                <h3>{item.title}</h3>
                                <div>{item.content}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="App__footer">
                <BottomBar />
            </div>
        </div>
    )
}

export default Explore;