$(document).ready(function(){

  fetch("assets/data/articles.csv")
   .then( r => r.text() )
   .then( t => console.log(t) );

  function sort_articles(article1, article2) {
    return article1.date > article2.date;
  }

  function fillLastPapers(articles) {
    var sorted_articles = articles.sort(sort_articles);
    var i = 0;
    $('#last-article-list').each(function(){
      $(this).append('<h2 class="h5">' + sorted_articles[i].paper_title + '</h2>');
      $(this).append('<p class="mb-0">' + sorted_articles[i].paper_conference_journal_title + '</p>');
      i++;
    });
  }


  fillLastPapers(articles);
});
