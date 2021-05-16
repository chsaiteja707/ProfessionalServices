import React,{ Component } from 'react';
import 'axios';
import axios from 'axios';

import NewsArticle from '../../components/NewsArticle/NewsArticle';

class NewsFeed extends Component{

    state={
        newsArticles:[],
        isLoading:false
    }

    getLatestHeadlines=async()=>{
        this.setState({isLoading:true});
        const latestHeadlines=await axios.get('http://localhost:5001/news/latest',{ headers: {"Authorization" : 'Bearer '+sessionStorage.getItem('userSessionID')} })       
        this.setState({newsArticles:latestHeadlines.data.articles});
        console.log(this.state.newsArticles);
        this.setState({isLoading:false});
    }

    componentDidMount(){
        this.getLatestHeadlines();
    }

    render(){
        var loading=this.state.isLoading?<div>Loading...</div>:null;
        
        return(
            <div>
                {loading}
                {this.state.newsArticles.map((article,index)=>{
                    return <NewsArticle sourceName={article.source.name}
                                        title={article.title}
                                        description={article.description}
                                        contentURL={article.url}
                                        imageURL={article.urlToImage}
                                        publishedAt={article.publishedAt}
                                        content={article.content}
                                        author={article.author}/>
                })}
            </div>
        )
    }
}

export default NewsFeed;