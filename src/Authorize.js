import React, { useEffect, useContext } from 'react'
import { parse } from 'qs'
import { Redirect } from 'react-router-dom';
import { AuthInfo } from './AuthInfoProvider';
import { fetchUserBasicInfo } from './requests'


function Authorize(props) {
    const {
        state,
        dispatch
    } = useContext(AuthInfo);
    const {
        location: {
            search, 
            hash,
        }
    } = props;

    const token = hash.slice(1);
    const query = parse(search.slice(1));

    useEffect(() => {
        if (token) {
            // 尝试获取数据
            const tokenPayload = {
                token_type: query.token_type,
                access_token: token,
                expires_in: query.expires_in,
            }
            dispatch({
                type: 'set-token',
                payload: tokenPayload
            });
            fetchUserBasicInfo(tokenPayload)
            .then(({ data }) => {
                dispatch({
                    type: 'set-current-user',
                    payload: data,
                })
            })
            .catch((err) => {
                global.alert(err.message)
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (state.token) {
        return <Redirect to={query.next || '/me'} />
    }

    if (!token) {
        return <div>Invalid request</div>
    }

    return (
        <div>
            Authorize
        </div>
    )
}

export default Authorize;