import React from 'react';

const CommentItem = (props) => {
  return (
    <li>
      <div className = 'comment'>
        <div className = 'comment-name'>
          {props.name} <span className = 'comment-time'>{props.time}</span>
          <button className = 'comment-remove' onClick = {props.deleteComment}>&times;</button>
        </div>
        <div className = 'comment-text'>
          {props.text} 
        </div>
      </div>
    </li>
  )
}

export default CommentItem;