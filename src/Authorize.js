import React from 'react'
import { parse } from 'qs'


function Authorize(props) {
    const {
        location: {
            search, 
            hash,
        }
    } = props;

    const token = hash.slice(1);
    const query = parse(search.slice(1));
    console.log(token, query);
    // 尝试获取数据
    fetch(`${process.env.REACT_APP_FEAT_API_ENDPOINT}/api/user/basic-info/`, {
        method: 'GET',
        headers: {
            Authorization: `${query.token_type} ${token}`,
            Accept: 'application/json',
        }
    })
    .then((res) => res.json())
    .then(({ data }) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })

    return (
        <div>
            Authorize
        </div>
    )
}

export default Authorize;