var app = function(){

  var url = "https://newsapi.org/v1/sources?language=en"; 
  var APIKey = "66b118a81efb4e869af256f87f303abb";


  var sourceList = document.querySelector("#source-select"); 
  sourceList.addEventListener('change', handleSourceSelected); 

  makeRequest(url, requestComplete);

//app bracket
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send(); 
};

var requestComplete = function(){
  if(this.status !==200) return; 
  var jsonString = this.responseText;
  storeLocally(jsonString, "sourcesAPI");
  var sources = JSON.parse(jsonString);
  populateSelectList(sources);
  // storeLocally(sources);
};


var requestCompleteFULLAPI = function(){
  if(this.status !==200) return; 
  var jsonString = this.responseText;
  storeLocally(jsonString, "sourcesAPI");
  var articles = JSON.parse(jsonString);
  populateArticles(articles);
  // storeLocally(sources);
};

var populateSelectList = function(sources){
  var sourceList = document.querySelector("#source-select"); 
  sources = sources.sources; 
  sources.forEach(function(source){
    var newsSource = createNewsItem(source);
    sourceList.appendChild(newsSource);  
  });
};

var createNewsItem = function(source){
  var option = document.createElement("option");
  option.innerText = source.name;
  option.value = source.id;
  return option; 
};

var storeLocally = function(APIString, keyName){
  localStorage.setItem(keyName, APIString);
};

var retrieveAPI = function(keyName){
  var jsonString = localStorage.getItem(keyName);
  return JSON.parse(jsonString);
};

var handleSourceSelected = function(){
  var sourceSelected = this.value;
  var url = urlBuilder(sourceSelected);
  makeRequest(url, requestCompleteFULLAPI);
};

var urlBuilder = function(source){
  var url = "https://newsapi.org/v1/articles?source=" + source +"&apiKey=" + "66b118a81efb4e869af256f87f303abb";
  return url;
};

var populateArticles = function(articles){
  // debugger;
  var articlesSection = document.querySelector("#news-articles");
  while(articlesSection.firstChild){
    articlesSection.removeChild(articlesSection.firstChild);
  }

  articles = articles.articles;
  articles.forEach(function(article){
    var article = createNewsArticle(article);
    articlesSection.appendChild(article);
  });
  // console.log(articles);
};

var createNewsArticle = function(newsItem){
  var article = document.createElement("article");
  var headline = document.createElement("h2");
  headline.textContent = newsItem.title; 
  article.appendChild(headline);
  return article;

};





window.addEventListener('load', app);