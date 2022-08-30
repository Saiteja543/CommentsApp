import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  onToggelLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteClicked = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  onSubmitGivenData = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state

    const initialBackgroundColor = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBackgroundColor,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  getCommentsItem = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        eachCommentDetails={eachComment}
        toggleIsLiked={this.onToggelLike}
        deleteComment={this.onDeleteClicked}
      />
    ))
  }

  onChangeGivenName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeGivenComment = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-main-container">
          <h1 className="comments-heading">Comments</h1>
          <div className="inputs-and-image-container">
            <form className="form-container" onSubmit={this.onSubmitGivenData}>
              <p className="about-ccbp">Say something about 4.0 Technologies</p>
              <input
                type="text"
                className="name-input-box"
                placeholder="Your Name"
                onChange={this.onChangeGivenName}
                value={nameInput}
              />
              <textarea
                type="description"
                rows="6"
                placeholder="Your Comment"
                className="comment-box"
                onChange={this.onChangeGivenComment}
                value={commentInput}
              />
              <button type="submit" className="comment-btn">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="ccbp-image"
            />
          </div>
          <p className="comment-sub-heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.getCommentsItem()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
