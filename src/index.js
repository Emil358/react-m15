import React from 'react';
import ReactDOM from 'react-dom'; 
import style from './index.css';
import CommentItem from './commentItem';

class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      comments: localStorage.getItem('comments') === null ? [
        {name: 'egor', text: 'bla bla bla bla', time: '12:03'},
        {name: 'inga', text: 'bla bla bla bla', time: '12:05'},
        {name: 'milk', text: 'bla bla bla bla', time: '12:07'}
      ] : JSON.parse(localStorage.getItem('comments')),
      newCommentName: '',
      newCommentText: ''
    }
  }

  deleteComment(index) {
    const comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({comments});
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  addComment () {
    const newName = this.state.newCommentName;
    const newText = this.state.newCommentText;
    if(newName === '' || newText === '') {
      return
    } else {
      const comments = this.state.comments;
      const newTime = new Date();
      comments.push({
        name: newName,
        text: newText,
        time: `${newTime.getHours()}:${newTime.getMinutes() < 10 ? '0' + newTime.getMinutes() : newTime.getMinutes()}`
      });
      this.setState({
        comments: comments,
        newCommentName: '',
        newCommentText: ''
      });
      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }

  render() {
    return (
      
      <div className = 'container'>
        <div className='add-comment'>
          <label htmlFor = 'name' className = 'top'>*Введите ваше имя</label>
          <input 
            type='text' 
            value = {this.state.newCommentName}
            onChange = {ev => {this.setState({newCommentName: ev.target.value})}}
            className = 'name bottom'
            id = 'name'
          />
          <label htmlFor = 'text' className = 'top'>*Введите текст коментария</label>
          <textarea  
            value = {this.state.newCommentText}
            onChange = {ev => {this.setState({newCommentText: ev.target.value})}}
            className = 'text bottom'
            id = 'text'
          />
          <button className = 'button-add-comment' onClick = {() => {this.addComment()}}>Add</button>
        </div>
        <ol className = 'list-comments'>
          
          {
            this.state.comments.map((comment, i) => {
              return (
                <CommentItem 
                key = {i} 
                name = {comment.name} 
                time = {comment.time} 
                text = {comment.text} 
                deleteComment = {this.deleteComment.bind(this, i)} 
                />
              );
            })
          }
        </ol>
      </div>
    )
  }
}

ReactDOM.render(
  <Comments />,
  document.querySelector('body')
) 