var app = function(){

  localStorage.clear();

  var url = "https://newsapi.org/v1/sources?language=en"; 
  var APIKey = "66b118a81efb4e869af256f87f303abb";


  var sourceList = document.querySelector("#source-select"); 
  sourceList.addEventListener('change', handleSourceSelected); 

  makeRequest(url, requestComplete);

  var getAllButton = document.querySelector("#get-all-button");
  getAllButton.addEventListener("click", handleAllButton); 

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
  // storeLocally(jsonString, "sourcesAPI");
  var articles = JSON.parse(jsonString);
  articles = articles.articles;
  populateArticles(articles);
  // storeLocally(sources);
};




var requestALLAPIS = function(){
  // debugger;

  if(this.status !==200) return; 
  var jsonString = this.responseText;
  // storeLocally(jsonString, "sourcesAPI");
  var articles = JSON.parse(jsonString);
  articles = articles.articles;
  // return articles;
  // populateArticles(articles);
  storeLocallyAppend(articles, "allArticles");
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
  if(jsonString !== null){
    return JSON.parse(jsonString);
  } else {
    return "";
  }
};

var storeLocallyAppend = function(APIObject, keyName){
  var articles = retrieveAPI(keyName);
  if( articles === "") {
    articles = JSON.stringify(APIObject);
    storeLocally(articles, keyName); 
  } else {
    var combinedArticles = articles.concat(APIObject);
    var articlesString = JSON.stringify(combinedArticles);
    storeLocally(articlesString, keyName);
  }
};



var handleSourceSelected = function(){
  var sourceSelected = this.value;
  var url = urlBuilder(sourceSelected);
  makeRequest(url, requestCompleteFULLAPI);
};

var handleAllButton = function(){
  // if (retrieveAPI("allArticles") !== ""){
  // var allArticles = retrieveAPI("allArticles");
  //   populateArticles(allArticles);
  // } else {
  var sources = retrieveAPI("sourcesAPI");
  var allArticles= "";
  //clear local storage
  // storeLocally(allArticles, "allArticles");
  console.log(sources);
  sources = sources.sources;
  sources.forEach(function(source){
    var url = urlBuilder(source.id);
    makeRequest(url, requestALLAPIS);
    // allArticles.concat(articles);
  });
  // debugger;
  allArticles = retrieveAPI("allArticles");
  var shuffledArticles = _.shuffle(allArticles);
  populateArticles(shuffledArticles);
}
// }

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

  // articles = articles.articles;
  // articles.pop();
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

  //GET MODAL NEWS ITEM
  var modalNewsItem = createModalNewsItem(newsItem);


  //BUTTON
  var input = document.createElement("input");
  input.type = "image"; 
  input.src = newsItem.urlToImage;
  // input.addEventListener("click", handleModalClick);
  input.onclick = function(){
    myModal.style.display = "block";
  };

  // modalClose.addEventListener("click", handleModalClose);
  modalClose.onclick = function(){
    myModal.style.display = "none";
  };

  myModal.onclick = function(){
    myModal.style.display = "none";
  };


  window.onclick = function(event){
    console.log(event.target);
    if (event.target == myModal) {
      myModal.style.display = "none";
    }
  };
  // window.addEventListener("click", handleWindowClick);



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
  // article.appendChild(headline);
  article.appendChild(input);
  myModal.appendChild(modalContent);
  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalNewsItem);
  return article;
};

// var handleModalClick = function(event){
//   var myModal = document.getElementById('myModal');
//   console.log(myModal);

//   console.log("MODAL CLISKED");
//   console.log(this);
//   console.log(event);
//   myModal.style.display = "block";

// };

// var handleModalClose = function(event){
//   var myModal = document.getElementById('myModal');
//       myModal.style.display = "none";
// };

// var handleWindowClick = function(event) {
// var myModal = document.getElementById('myModal');
//     if (event.target == myModal) {
//         myModal.style.display = "none";
//     }
// }

var createModalNewsItem = function(newsItem){
  var modalArticle = document.createElement("article");
  var headline = document.createElement("h3");
  var date = document.createElement("p");
  var author = document.createElement("p");
  var description = document.createElement("p");
  var linkToFull = document.createElement("a");


  headline.textContent = newsItem.title; 
  date.textContent = newsItem.publishedAt;
  author.textContent =  newsItem.author;
  description.textContent = newsItem.description; 
  linkToFull.textContent = "continue reading";
  linkToFull.href = newsItem.url;
  linkToFull.target="_blank"

  modalArticle.appendChild(headline);
  modalArticle.appendChild(date);
  modalArticle.appendChild(author);
  modalArticle.appendChild(description);
  modalArticle.appendChild(linkToFull);

  return modalArticle;

};





window.addEventListener('load', app);