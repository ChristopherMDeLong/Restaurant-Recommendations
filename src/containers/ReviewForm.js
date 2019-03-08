import React, { Component } from 'react';
import TextField from '../components/TextField';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id: this.props.selectedId,
      name: '',
      rating: '',
      content: ''
    }

    this.handleReviewName = this.handleReviewName.bind(this);
    this.handleReviewRating = this.handleReviewRating.bind(this);
    this.handleReviewText = this.handleReviewText.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

  }

  handleReviewName(event){
    this.setState({ name: event.target.value })
  }

  handleReviewRating(event){
    this.setState({ rating: event.target.value })
  }

  handleReviewText(event){
    this.setState({ content: event.target.value })
  }

  handleClearForm(event){
    this.setState({ name: '', rating: '', content: ''})
  }

  handleFormSubmit(event){
    event.preventDefault()

    let reviewPayload = {
      restaurant_id: this.props.selectedId,
      name: this.state.name,
      rating: this.state.rating * 20,
      content: this.state.content
    }
    this.props.trackNewRestaurantReview(reviewPayload)
    this.handleClearForm()
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <form className="callout" onSubmit={this.handleFormSubmit}>
          <TextField
            name="Your Name"
            content={this.state.name}
            handleChange={this.handleReviewName}
          />
          <TextField
            name="Star Rating 1-5"
            content={this.state.rating}
            handleChange={this.handleReviewRating}
          />
          <TextField
            name="Review Text"
            content={this.state.content}
            handleChange={this.handleReviewText}
          />

          <input className="button" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default ReviewForm;
