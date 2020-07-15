import React from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom';
import './BottomBar.css';

function BottomBar (props) {
  const {
    location: { pathname },
    history: { push }
  } = props

  return (
    <div className="BottomBar">
      <div 
        className={classNames("BottomBar__item", {
          'is-active': pathname === '/explore'
        })}
        onClick={() => {
          if (pathname !== '/explore') {
            push('/explore');
          }
        }}
      >
        <span className="BottomBar__icon">

        </span>
        <span className="BottomBar__label">
          发现
        </span>
      </div>
      <div 
        className={classNames("BottomBar__item", {
          'is-active': pathname === '/me'
        })}
        onClick={() => {
          if (pathname !== '/me') {
            push('/me');
          }
        }}
      >
        <span className="BottomBar__icon">
        </span>
        <span className="BottomBar__label">
          我的
        </span>
      </div>
    </div>
  )
}

export default withRouter(BottomBar)
