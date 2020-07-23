import { stringify } from 'qs'
const API_ENDPOINT = process.env.REACT_APP_FEAT_API_ENDPOINT

const resHelper = res => {
  if (res.ok) {
    if (res.status === 204) {
      return res
    }
    return res.json()
  }
  const contentType = res.headers.get('Content-Type')
  if (contentType === 'application/json' && res.json) {
    return res.json().then(data => {
      const error = new Error(data.message)
      error.code = data.code
      error.data = data.data
      throw error
    })
  } else if (res.text) {
    return res.text().then(info => {
      const error = new Error(res.statusText)
      error.info = info
      throw error
    })
  } else {
    throw new Error(res.statusText)
  }
}

export const fetchPublicFeed = async params => {
  const query = params ? stringify(params) : ''
  const baseURL = `${API_ENDPOINT}/api/feed/xfile-items/`
  const url = query ? `${baseURL}?${query}` : baseURL
  const res = await fetch(url).then(resHelper)
  return res
}

export const fetchUserEvents = async (uid, params) => {
  const baseURL = `${API_ENDPOINT}/api/xfile/event/${uid}/view-list/`
  const query = params ? stringify(params) : ''
  const url = query ? `${baseURL}?${query}` : baseURL
  const headers = {
    Accept: 'application/json'
  }
  return await fetch(url, {
    headers
  }).then(resHelper)
}

export const fetchUserBasicInfo = async token => {
  const url = `${API_ENDPOINT}/api/user/basic-info/`
  return await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`
    }
  }).then(resHelper)
}

export const fetchEventList = async (params, token) => {
  const query = params ? stringify(params) : ''
  const baseURL = `${API_ENDPOINT}/api/xfile/event/`
  const url = query ? `${baseURL}?${query}` : baseURL
  const headers = {
    Accept: 'application/json',
    Authorization: `${token.token_type} ${token.access_token}`
  }

  return await fetch(url, {
    headers
  }).then(resHelper)
}

// create event
export const createEvent = async (data, token) => {
  const url = `${API_ENDPOINT}/api/xfile/event/`
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`
    }
  }).then(resHelper)
}

// update event
export const updateEvent = async (id, data, token) => {
  const url = `${API_ENDPOINT}/api/xfile/event/${id}/`
  return await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`
    },
    body: JSON.stringify(data)
  }).then(resHelper)
}

// publish event
export const publishEvent = async (id, token) => {
  return updateEvent(id, { publish: true }, token)
}

// delete event
export const deleteEvent = async (id, token) => {
  const url = `${API_ENDPOINT}/api/xfile/event/${id}/`
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
      Accept: 'application/json'
    }
  }).then(resHelper)
}

// define by featapi, ref: http://new.featapi.com/api-docs/activity-api-reference/#Comment_TargetType
const COMMENT_TARGET_TYPE_EVENT = 300; 
export const fetchEventComments = async (id, params) => {
  const baseURL = `${API_ENDPOINT}/api/activity/comment/comment-list/`;
    const query = {
        object_id: id,
        ...params,
        target_type: COMMENT_TARGET_TYPE_EVENT // 
    }
    const url = `${baseURL}?${stringify(query)}`;
    return await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    }).then(resHelper);
}

export const createComment = async (data, token) => {
  const url = `${API_ENDPOINT}/api/activity/comment/`;
  const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
  }
  return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
          object_id: data.eventId,
          target_type: COMMENT_TARGET_TYPE_EVENT,
          content: data.content
      }),
      headers
  }).then(resHelper)
}

export const updateComment = async (id, data, token) => {
  const url = `${API_ENDPOINT}/api/activity/comment/${id}/`;
  const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
  }
  return fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers
  }).then(resHelper)
}

export const deleteComment = async (id, token) => {
  const url = `${API_ENDPOINT}/api/activity/comment/${id}/`;
  const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
  }
  return fetch(url, {
      method: 'DELETE',
      headers
  }).then(resHelper)
}


export const replyComment = async (id, data, token) => {
  const url = `${API_ENDPOINT}/api/activity/comment/${id}/reply/`;
  const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
  }
  return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
          content: data.content,
          object_id: data.eventId,
          target_type: COMMENT_TARGET_TYPE_EVENT,
      }),
      headers
  }).then(resHelper)
}
