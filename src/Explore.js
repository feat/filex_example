import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BottomBar from './BottomBar';
import { fetchPublicFeed } from './requests';
import EventItem from './EventItem';

function Explore() {
    const [state, setState] = useState({
        loading: false,
        items: [],
        hasMore: true,
        next: null,
    });

    const loadMore = (reset = false) => {
        if (state.loading) {
            return;
        }
        setState({
            ...state,
            loading: true,
            items: reset ? [] : state.items,
        });
        const params = reset ? {
            page: 1,
            page_size: 12,
        } : (
            state.next || { page: 1, page_size: 12 }
        )
        fetchPublicFeed(params).then(({ data, pagination }) => {
            setState({
                ...state,
                loading: false,
                next: pagination.next ? {
                    page: pagination.next,
                    page_size: pagination.page_size
                } : null,
                hasMore: !!pagination.next,
                items: reset ? data : [
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
    }
    const refresh = () => loadMore(true);
    useEffect(loadMore, []);

    return (
        <div className='App'>
            <div className="App__header">
                <div className="PageHeader">
                    <h1 className="PageTitle pl_16">发现</h1>
                </div>
            </div>
            <div className="App__content">
                <div id="FeedList" style={{ height: '100%', overflow: 'auto', backgroundColor: '#f6f6f6'}}>
                    <InfiniteScroll
                        dataLength={state.items.length}
                        next={loadMore}
                        hasMore={state.hasMore}
                        loader={
                            <div className='px_16 py_12'>
                                <span>加载中</span>
                            </div>
                        }
                        endMessage={
                            <div className="px_16 py_12">
                                {!state.items.length && !state.hasMore ? (
                                    <b>无相关内容</b>
                                ) : (
                                    <b>已经到底了</b>
                                )}
                            </div>
                        }
                        scrollableTarget='FeedList'
                        refreshFunction={refresh}
                        pullDownToRefresh
                        pullDownToRefreshThreshold={80}
                        pullDownToRefreshContent={
                            <h4 style={{textAlign: 'center'}}>&#8595; 下拉刷新</h4>
                        }
                        releaseToRefreshContent={
                            <h4 style={{textAlign: 'center'}}>&#8593; 释放后刷新</h4>
                        }
                    >
                        {state.fetchError ? (
                            [<div key='error'>{state.fetchError.message}</div>]
                        ) : state.items.map((item, index) => (
                            <EventItem 
                                data={item}
                                key={item.id}
                            />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
            <div className="App__footer">
                <BottomBar />
            </div>
        </div>
    )
}

export default Explore;