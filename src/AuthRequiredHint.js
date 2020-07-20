import React from 'react'
import { stringify } from 'qs'

const getAuthorizeLink = (next) => {
    const authorizeUrl = process.env.REACT_APP_FEAT_AUTHORIZE_URL
    const params = {
      client_id: process.env.REACT_APP_FEAT_CLIENT_ID,
      redirect_uri: window.location.origin + '/authorize'+(next ? `?${stringify({next})}` : '' ),
      response_type: 'token'
    }
    return `${authorizeUrl}?${stringify(params)}`
  }

function AuthRequiredHint(props) {
    return (
        <div className='Landing'>
        <div className='Landing__inner'>
          <div className='Landing__desc'>
            应用需要获取到您在feat.com上的授权后，才能进行下一步操作
          </div>
          <div className='Landing__action'>
            <a className='button' href={getAuthorizeLink(props.pathname)}>
              开始授权
            </a>
          </div>
        </div>
      </div>
    )
}

export default AuthRequiredHint;