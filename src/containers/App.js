import React, { Component } from 'react'
import ReviewForm from '../containers/ReviewForm'

import Restaurant from '../components/Restaurant'
import Reviews from '../components/Reviews'

import restaurants from '../constants/restaurants'
import reviews from '../constants/reviews'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: restaurants,
      reviews: reviews,
      selectedId: restaurants[0].id
    }
    this.restaurantClick = this.restaurantClick.bind(this)
    this.trackNewRestaurantReview = this.trackNewRestaurantReview.bind(this)
  }

  restaurantClick(event) {
    event.preventDefault()
    this.setState({selectedId: event.target.id})
  }

  trackNewRestaurantReview(reviewPayload){
    let allReviews = this.state.reviews
    this.setState({ reviews: allReviews.concat(reviewPayload)})
  }

  selectedRestaurant() {
    return this.state.restaurants.find((restaurant) =>
      (restaurant.id === this.state.selectedId)
    )
  }

  render() {
    let restaurantComponents = restaurants.map((restaurant) => {
      return (
        <Restaurant key={restaurant.id}
          data={restaurant}
          isSelected={this.state.selectedId === restaurant.id}
          handleClick={this.restaurantClick}/>
      )
    })

    let relevantReviews = this.state.reviews.filter((review) =>
      (this.state.selectedId === review.restaurant_id)
    )

    return(
      <div>
        <div className="row">
          <div className="restaurants small-2 columns">
            <h3>Restaurant</h3>
            {restaurantComponents}
          </div>
          <div className="reviews small-9 columns">
            <h3>Reviews for {this.selectedRestaurant().name}</h3>
            <Reviews data={relevantReviews} />
            <h5>Write a New Review</h5>
            <ReviewForm
              selectedId={this.state.selectedId}
              trackNewRestaurantReview={this.trackNewRestaurantReview}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
