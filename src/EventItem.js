import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import EventPlates from './EventPlates'
import { AuthInfo } from './AuthInfoProvider';
import './EventItem.css'
import { deleteEvent } from './requests';

function EventItem (props) {
  const { data, showUserInfo } = props
  const { state: { token, currentUser } } = useContext(AuthInfo);
  const [isDeleting, setIsDeleting] = useState(false);
  const canDelete = currentUser && currentUser.uid === data.user.uid;

  return (
    <div className='EventItem'>
      <div className='EventItem__header'>
        <div className='EventItem__time'>{data.event_time}</div>
        {showUserInfo && (
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
        )}
        </div>
      <h1 className='EventItem__title'>{data.title}</h1>
      <div className='EventItem__content'>{data.content}</div>
      {data.plates && !!data.plates.length && (
        <div>
          <EventPlates data={data.plates} />
        </div>
      )}
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
      {canDelete && (
        <button 
          className='EventItem__deleteBtn button button_dashed button_sm'
          disabled={isDeleting}
          onClick={() => {
            if (window.confirm('确定删除事件？')) {
              setIsDeleting(true);
              deleteEvent(data.id, token).then(() => {
                props.onDeleted(data, props.index);
              }).catch((err) => {
                alert(err.message);
                setIsDeleting(false);
              })
            }
          }}
        >
          &times;
        </button>
      )}
    </div>
  )
}

EventItem.defaultProps = {
  showUserInfo: true
}

export default EventItem
