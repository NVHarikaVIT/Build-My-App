import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card lh-1" >
            <img src={imageUrl?imageUrl:"https://www.gstatic.com/devrel-devsite/prod/v158caafe57d4670a8abac19430cb93c14f6b6846e8f3012a57383593e392bfd9/firebase/images/lockup.svg"} alt="" />
            <div className="card-body">
                <h4> {title}... </h4>
                <p> {description}... </p>
                <a href={newsUrl} className='btn btn-warning'> See more </a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems;
