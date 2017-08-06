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
  var myModal = document.createElement("div");
  var modalContent = document.createElement("div");
  var modalClose = document.createElement("span");
  var testText = document.createElement("p");
  // var img = document.createElement("img");
  myModal.className = "modal";
  myModal.id = "myModal";
  console.log(myModal);

  modalContent.className = "modal-content";

  modalClose.className = "close";
  modalClose.textContent = "X"; 

  testText.textContent = "some content";
  //GET MODAL NEWS ITEM
  var modalNewsItem = createModalNewsItem(newsItem);


  //BUTTON
  var input = document.createElement("input");
  input.type = "image"; 
  input.src = newsItem.urlToImage;
  input.addEventListener("click", handleModalClick);

  modalClose.addEventListener("click", handleModalClose);

  window.addEventListener("click", handleWindowClick);

 

  // input.onclick = function() {
  //   // article.appendChild(modalContent);

  //   console.log(myModal);
  //   console.log("MODAL CLISKED");
  //   console.log(this);
  //   console.log(event);
  //   myModal.style.display = "block";
  // };

  

//HEADLINE
  headline.textContent = newsItem.title; 
  // console.log(newsItem);
  // img.src = newsItem.urlToImage; 

  // <div id="myModal" class="modal">

  //   <!-- Modal content -->
  //   <div class="modal-content">
  //     <span class="close">&times;</span>
  //     <p>Some text in the Modal..</p>
  //   </div>
  article.appendChild(myModal);
  article.appendChild(headline);
  article.appendChild(input);
  myModal.appendChild(modalContent);
  modalContent.appendChild(testText);
  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalNewsItem);
  return article;
};

var handleModalClick = function(event){
  var myModal = document.getElementById('myModal');
  console.log(myModal);

  console.log("MODAL CLISKED");
  console.log(this);
  console.log(event);
  myModal.style.display = "block";

};

var handleModalClose = function(event){
  var myModal = document.getElementById('myModal');
      myModal.style.display = "none";
};

var handleWindowClick = function(event) {
var myModal = document.getElementById('myModal');
    if (event.target == myModal) {
        myModal.style.display = "none";
    }
}

var createModalNewsItem = function(newsItem){
  var modalArticle = document.createElement("article");
  var headline = document.createElement("h3");
  var date = document.createElement("p");
  var description = document.createElement("p");

  headline.textContent = newsItem.title; 
  date.textContent = newsItem.publishedAt;
  description.textContent = newsItem.description; 

  modalArticle.appendChild(headline);
  modalArticle.appendChild(date);
  modalArticle.appendChild(description);

  return modalArticle;

};





window.addEventListener('load', app);