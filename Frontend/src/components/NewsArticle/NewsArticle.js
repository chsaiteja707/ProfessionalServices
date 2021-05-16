import React from 'react';

const NewsArticle=(props)=>{
    return(
        <div class="card mb-3" style={{maxWidth: '540px'}}>
        <div class="row g-0">
          <div class="col-md-4">
            <img src={props.imageURL} className="img-thumbnail" alt="..."/>
            <a href={props.contentURL}>
                <button className="btn btn-danger btn-sm" >Full Article</button>
            </a>          
            <p>{props.sourceName}</p>
            <a href={props.author}>Author</a>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{props.title}</h5>
              <p class="card-text">{props.description}</p>
              <p class="card-text"><small class="text-muted">{props.publishedAt}</small></p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default NewsArticle;