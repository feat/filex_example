import { stringify } from 'qs'
const API_ENDPOINT = process.env.REACT_APP_FEAT_API_ENDPOINT;

const resHelper = (res) => {
    if (res.ok) {
        if (res.status === 204) {
            return res;
        }
        return res.json();
    }
    const contentType = res.headers.get('Content-Type');
    if (contentType === 'application/json' && res.json) {
        return res.json().then((data) => {
            const error = new Error(data.message);
            error.code = data.code;
            error.data = data.data;
            throw error;
        })
    } else if (res.text) {
        return res.text().then((info) => {
            const error = new Error(res.statusText)
            error.info = info;
            throw error;
        })
    } else {
        throw new Error(res.statusText);
    }
}

export const fetchPublicFeed = async (params) => {
    const query = params ? stringify(params) : '';
    const baseURL = `${API_ENDPOINT}/api/feed/xfile-items/`;
    const url = query ? `${baseURL}?${query}` : baseURL;
    const res = await fetch(url).then(resHelper);
    return res;
}

export const fetchUserEvents = async (uid, params) => {
    const baseURL = `${API_ENDPOINT}/api/xfile/event/${uid}/view-list/`;
    const query = params ? stringify(params) : '';
    const url = query ? `${baseURL}?${query}` : baseURL;
    const headers = {
        Accept: 'application/json'
    }
    return await fetch(url, {
        headers
    }).then(resHelper);
}

export const fetchUserBasicInfo = async (token) => {
    const url = `${API_ENDPOINT}/api/user/basic-info/`;
    return await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `${token.token_type} ${token.access_token}`
        }
    }).then(resHelper);
}

export const fetchEventList = async (params, token) => {
    const query = params ? stringify(params) : '';
    const baseURL = `${API_ENDPOINT}/api/xfile/event/`;
    const url = query ? `${baseURL}?${query}` : baseURL;
    const headers = {
        Accept: 'application/json',
        Authorization: `${token.token_type} ${token.access_token}`
    }
    
    return await fetch(url, {
        headers
    }).then(resHelper);
}