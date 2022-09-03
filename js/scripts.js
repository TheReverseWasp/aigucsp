
$(document).ready(function(){
  var articles, members, projects;

  function build(){
    request_articles();
  };

  function request_articles(){
    fetch("https://raw.githubusercontent.com/TheReverseWasp/AIG-UCSP/data/data/jsons/articles.json")
      .then( r => r.text() )
      .then( text => articles = JSON.parse(text))
      .then(() => request_members());
  };
  function request_members(){
    fetch("https://raw.githubusercontent.com/TheReverseWasp/AIG-UCSP/data/data/jsons/members.json")
      .then( r => r.text() )
      .then( text => members = JSON.parse(text))
      .then(() => request_projects());
  };
  function request_projects(){
    fetch("https://raw.githubusercontent.com/TheReverseWasp/AIG-UCSP/data/data/jsons/projects.json")
      .then( r => r.text() )
      .then( text => projects = JSON.parse(text))
      .then(() => fill_data());
  };
  
  function fill_data() {
    var temp_articles = dicToArr(articles);
    var sorted_articles = temp_articles.sort(sort_articles);
    var article_years = getArticleYears(sorted_articles);
    article_years = article_years.sort().reverse();

    var temp_projects = dicToArr(projects);
    var sorted_projects = temp_projects.sort(sort_projects);

    var temp_members = dicToArr(members);
    var sorted_members = temp_members.sort(sort_members);

    fillLastPapers(sorted_articles);
    fillAllProjects(sorted_projects);
    fillAllMembers(sorted_members);
    fillAllPublications(sorted_articles, article_years);
  };

  function dicToArr(dic) {
    var arr = [];
    for(key in dic){
      arr.push(dic[key]);
    }
    return arr;
  }

  function sort_articles(article1, article2) {
    return article1.date > article2.date;
  };

  function getArticleYears(sorted_articles){
    var temp = new Set();
    var answer = [];
    for(i in sorted_articles) {
      temp.add(sorted_articles[i].date);
    }
    for(let key of temp) {
      answer.push(key);
    }
    return answer;
  };

  function sort_projects(project1, project2) {
    return project1.end_date > project2.end_date;
  };

  function sort_members(member1, member2) {
    return member1.aig_role_id < member2.aig_role_id;
  }

  function fillLastPapers(sorted_articles) {   
    var i = 0;
    $('.last-articles-item').each(function(){
      console.log(i);
      try{
        $(this).append('<h2 class="h5">' + sorted_articles[i].paper_title + '</h2>');
        $(this).append('<p class="mb-0">' + sorted_articles[i].conference_journal_title + '</p>');
        i++;  
      }
      catch(error) {
        console.log("Not Enough Papers!");
        return 0;
      }
    });
  };

  function fillAllProjects(sorted_projects) {
    var projectRow = $("#project-row");
    for(i in sorted_projects) {
      projectRow.append('<div class="col-lg-6"><div class="position-relative mb-5" onclick="buildPI(' + sorted_projects[i].project_id + ')">' +
      '<img class="img-fluid rounded-3 mb-3" src="assets/images/projects/' + sorted_projects[i].image_name + '" alt="..." />' +
      '<a class="h4 fw-bolder text-decoration-none link-dark stretched-link" href="#!">' + sorted_projects[i].project_name + 
      '</a></div></div>'
      )
    }
    
  };

  function fillAllMembers(sorted_members) {
    fillRoleOne(sorted_members);
    fillRoleTwo(sorted_members);
    fillRoleThree(sorted_members);
    fillRoleFour(sorted_members);
  };

  function fillRoleOne(sorted_members) {
    var roleOneDiv = $("#members-role-1");
    for(i in sorted_members) {
      if(sorted_members[i].aig_role_id == 1){
        roleOneDiv.append(
          '<div class="row gx-5 my-5 align-items-center">' +
            '<div class="col"></div>' +
            '<div class="col-lg-3"><img class="img-fluid rounded mb-5 mb-lg-0" src="assets/images/team/' + sorted_members[i].image +'" alt="..." /></div>' +
            '<div class="col-lg-6">' +
              '<h2 class="fw-bolder ">' + sorted_members[i].name + '</h2>' +
              '<p class="lead fw-normal text-muted mb-0 fs-6">' + 
                sorted_members[i].aig_role + '</br>' +
                sorted_members[i].university_role + '</br>' +
                sorted_members[i].education + '</br>' +
                'e-mail: ' + sorted_members[i].e_mail + '</br>' +
              '</p>' + 
            '</div>' +
            '<div class="col"></div>' +
          '</div>'
          )
      }
    }
  };
  function fillRoleTwo(sorted_members) {
    var roleTwoDiv = $("#members-role-2");
    for(i in sorted_members) {
      if(sorted_members[i].aig_role_id == 2){
        roleTwoDiv.append(
          '<div class="gx-5 col-6 my-5 row align-items-center">' + 
            '<div class="col-lg-5"><img class="img-fluid rounded mb-5 mb-lg-0" src="assets/images/team/' + sorted_members[i].image + '" alt="..." /></div>' + 
            '<div class="col-lg-7">' +
              '<h2 class="fw-bolder fs-3">' + sorted_members[i].name + '</h2>' +
              '<p class="lead fw-normal text-muted mb-0 fs-6">' + sorted_members[i].aig_role + '<br />' +
                sorted_members[i].university_role + '</br>' +
                sorted_members[i].education + '</br>' +
                'e-mail: ' + sorted_members[i].e_mail + '</br>' +
              '</p>' + 
            '</div>' +
          '</div>'
          );
      }
    }
  };

  function fillRoleThree(sorted_members) {
    var roleThreeDiv = $("#members-role-3");
    for(i in sorted_members) {
      if(sorted_members[i].aig_role_id == 3){
        roleThreeDiv.append(
          '<div class="col-3 my-5 mb-xl-0">' +
              '<div class="text-center">' +
                  '<img class="img-fluid rounded-circle mb-4 px-4" src="assets/images/team/' + sorted_members[i].image + '" alt="..." />' +
                  '<h5 class="fw-bolder">' + sorted_members[i].name + '</h5>' +
                  '<div class="fst-italic text-muted">' + sorted_members[i].education + '</div>' +
              '</div>' +
          '</div>'
        );
      }
    }
  };

  function fillRoleFour(sorted_members) {
    var roleThreeDiv = $("#members-role-3");
    for(i in sorted_members) {
      if(sorted_members[i].aig_role_id == 4){
        roleThreeDiv.append(
          '<div class="col-2 my-5 mb-xl-0">' +
              '<div class="text-center">' +
                  '<img class="img-fluid rounded-circle mb-4 px-4" src="assets/images/team/' + sorted_members[i].image + '" alt="..." />' +
                  '<h6 class="fw-bolder">' + sorted_members[i].name + '</h5>' +
              '</div>' +
          '</div>'
        );
      }
    }
  };

  function fillAllPublications(sorted_articles, article_years) {
    var publications = $("#publications");
    for(year in article_years) {
      publications.append(
        '<section class="py-0">' +
            '<div class="container px-5 mt-5">' +
                '<div class="row gx-5">' +
                    '<div class="col-12 mb-0 text-primary"><h2 class="fw-bolder "> ' + article_years[year] + '</h2></div>'
      );
      for(i in sorted_articles) {
        if (sorted_articles[i].date == article_years[year]) {
          publications.append(
                    '<hr>' +
                    '<div class="col-lg-12 row align-items-center"">' +
                        '<div class="col-2"></div>' +
                        '<div class="col mb-5">' +
                            '<div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-book"></i></div>' +
                        '</div>' +
                        '<div class="col-9 mb-5 ">' +
                            '<h5 class="fw-bolder text-primary mb-2 "> ' + sorted_articles[i].paper_title + '</h5><br>' +
                            '<p class="mb-0"> ' +
                                'Conference/Journal: ' + sorted_articles[i].conference_journal_title + '<br>' +
                                'Authors: ' + sorted_articles[i].authors + ' <br>' +
                                '' + sorted_articles[i].state + ' <br>' +
                                '' + sorted_articles[i].other_info + '' +
                            '</p>' +
                        '</div>' +
                    '</div>'
          );

        }
      }
      publications.append(
                '<hr></div>'+
            '</div>' +
        '</section>'
      );
    }                  
  }

  build();
});
