import React, { useContext } from 'react'
import classNames from 'classnames'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AuthInfo } from './AuthInfoProvider';
import './CommentItem.css'

function CommentItem (props) {
  const { data, level } = props
  const { state: { currentUser } } = useContext(AuthInfo);
  const history = useHistory();
  const location = useLocation()
  const canEdit = currentUser && currentUser.uid === data.user.uid;
  const canReply = currentUser && currentUser.uid !== data.user.uid;
  
  return (
    <div
      className={classNames('CommentItem', {
        CommentItem_root: level === 0
      })}
    >
      <div className='CommentItem__main'>
        <div className='Comment'>
          <div className='Comment__header'>
            <img
              src={data.user.avatar}
              alt={data.user.username}
              className='Comment__userAvatar'
            />
            <Link
              to={{
                pathname: `/user/${data.user.uid}`,
                state: {
                  user: data.user
                }
              }}
              className='Comment__username'
            >
              {data.user.username}
            </Link>
            <span className='Comment__date'>
              {new Date(data.last_modified).toDateString()}
            </span>
          </div>
          <div className='Comment__main'>
            <div
              className='Comment__content'
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <div className="Comment__action">
              {canEdit && (
                <button
                  className="button button_sm button_merge"
                  onClick={() => {
                    history.push(`${location.pathname}/${data.id}/edit`, {
                      comment: data
                    })
                  }}
                >
                  E
                </button>
              )}
              {canReply && (
                <button
                  className="button button_sm button_merge"
                  onClick={() => {
                    history.push(`${location.pathname}/${data.id}/reply`, {
                      comment: data
                    })
                  }}
                >
                  R
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {data.children && !!data.children.length && (
        <div className='CommentItem__children'>
          {data.children.map(item => (
            <CommentItem level={props.level + 1} key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  )
}

CommentItem.defaultProps = {
  level: 0
}

export default CommentItem
