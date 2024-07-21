import React, { Component } from 'react';
import NewsItems from '../Components/NewsItems';
import axios from 'axios';

export class News extends Component {
  
  constructor(){
    super();
    console.log("News component constructor..");
    this.state = {
      articles : [],
      loading: false,
    }
  }
  async componentDidMount(){
    let newsUrl = "https://newsapi.org/v2/everything?q=india&apiKey=24858fe39fad40659b2ac90d606ed59c&pageSize=30";
    let newsInfo = await axios.get(newsUrl);
    this.setState({articles: newsInfo.data.articles});
  }
  render() {
    return (
      <div className='container mt-5 mb-5' style={{position: "relative", top:"60px"}}>
        <h2> Daily Feed </h2>
        <div className="row my-3">
        {this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
                    <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} 
                    imageUrl={element.urlToImage} newsUrl={element.url}/>
                  </div>
        })}
        </div>
      </div>
    )
  }
}

export default News;