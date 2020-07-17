import React from 'react'
import { Link } from 'react-router-dom'
import './EventItem.css'

function EventItem (props) {
  const { data } = props

  return (
    <div className='EventItem'>
      <div className='EventItem__header'>
        <div className='EventItem__time'>{data.event_time}</div>
        <Link
          className='EventItem__user'
          to={{
              pathname: `/user/${data.user.uid}`,
              state: {
                  user: data.user,
              }
          }}
        >
          <img
            className='EventItem__avatar'
            src={data.user.avatar}
            alt={data.user.username}
          />
          <span className='EventItem__username'>{data.user.username}</span>
        </Link>
      </div>
      <h1 className='EventItem__title'>{data.title}</h1>
      <div className='EventItem__content'>{data.content}</div>
      <div className='EventItem__footer'>
        <Link
          className='button button_sm button_merge'
          to={{
            pathname: `/event/${data.id}/comment`,
            state: {
              event: data,
            }
          }}
        >
          {data.comment_count !== undefined ? `评论(${data.comment_count})` : '评论'}
        </Link>
      </div>
    </div>
  )
}

EventItem.defaultProps = {
  showUserInfo: true
}

export default EventItem
