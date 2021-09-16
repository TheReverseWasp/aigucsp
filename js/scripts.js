
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
      .then( r => r.text().value )
      .then( text => members = JSON.parse(text))
      .then(() => request_projects());
  };
  function request_projects(){
    fetch("https://raw.githubusercontent.com/TheReverseWasp/AIG-UCSP/data/data/jsons/projects.json")
      .then( r => r.text().value )
      .then( text => projects = JSON.parse(text))
      .then(() => fill_data());
  };
  
  function fill_data() {
    var temp_articles = dicToArr(articles);
    var sorted_articles = temp_articles.sort(sort_articles);

    var temp_projects = dicToArr(projects);
    var sorted_projects = temp_projects.sort(sort_projects);

    var temp_members = dicToArr(members);
    var sorted_members = temp_members.sort(sort_members);

    fillLastPapers(sorted_articles);
    fillAllProjects(sorted_projects);
    fillAllMembers(sorted_members);
  };

  function dicToArr(dic) {
    var arr = [] 
    for(key in Object.keys(dic)){
      arr.push(dic[key]);
    }
    return arr;
  }

  function sort_articles(article1, article2) {
    return article1.date > article2.date;
  };

  function sort_projects(project1, project2) {
    return project1.end_date > project2.end_date;
  };

  function sort_members(member1, member2) {
    return member1.aig_role_id < member2.aig_role_id;
  }

  function fillLastPapers(sorted_articles) {    
    var i = 0;
    $('#last-article-list').each(function(){
      console.log(i);
      try{
        $(this).append('<h2 class="h5">' + sorted_articles[i].paper_title + '</h2>');
        $(this).append('<p class="mb-0">' + sorted_articles[i].paper_conference_journal_title + '</p>');
        i++;  
      }
      catch(error) {
        console.log("Not Enough Papers!");
        return 0;
      }
    });
  };

  function fillAllProjects(sorted_projects) {
    var projectRow = $("project-row");
    for(item in sorted_projects) {
      projectRow.append('<div class="col-lg-6"><div class="position-relative mb-5" onclick="buildPI(' + item["project_id"] + ')">' +
      '<img class="img-fluid rounded-3 mb-3" src="assets/images/projects/' + item["image_name"] + '" alt="..." />' +
      '<a class="h4 fw-bolder text-decoration-none link-dark stretched-link" href="#!">' + item["project_name"] + 
      '</a></div></div>'
      )
    }
    
  };

  function fillAllMembers(sorted_members) {
    fillRoleOne(sorted_members);
    fillRoleTwo(sorted_members);
    fillRoleThree(sorted_members);
  };

  function fillRoleOne(sorted_members) {
    var roleOneDiv = $("#members-role-1");
    for(member in sorted_members) {
      if(member.aig_role_id == 1){
        roleOneDiv.append(
          '<div class="row gx-5 align-items-center">' +
            '<div class="col"></div>' +
            '<div class="col-lg-3"><img class="img-fluid rounded mb-5 mb-lg-0" src="assets/images/team/' + member.image +'" alt="..." /></div>' +
            '<div class="col-lg-6">' +
              '<h2 class="fw-bolder ">' + member.name + '</h2>' +
              '<p class="lead fw-normal text-muted mb-0 fs-6">' + 
                member.aig_role + '</br>' +
                member.university_role + '</br>' +
                member.education + '</br>' +
                'e-mail: ' + member.e_mail + '</br>' +
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
    for(member in sorted_members) {
      if(member.aig_role_id == 2){
        roleTwoDiv.append(
          '<div class="gx-5 col-6 row align-items-center">' + 
            '<div class="col-lg-5"><img class="img-fluid rounded mb-5 mb-lg-0" src="assets/images/team/' + member.image + '" alt="..." /></div>' + 
            '<div class="col-lg-7">' +
              '<h2 class="fw-bolder fs-3">' + member.name + '</h2>' +
              '<p class="lead fw-normal text-muted mb-0 fs-6">' + member.aig_role + '<br />' +
                member.university_role + '</br>' +
                member.education + '</br>' +
                'e-mail: ' + member.e_mail + '</br>' +
              '</p>' + 
            '</div>' +
          '</div>'
          );
      }
    }
  };

  function fillRoleThree(sorted_members) {
    var roleThreeDiv = $("#members-role-3");
    for(member in sorted_members) {
      if(member.aig_role_id == 2){
        roleThreeDiv.append(
          '<div class="col-3 mb-5 mb-5 mb-xl-0">' +
              '<div class="text-center">' +
                  '<img class="img-fluid rounded-circle mb-4 px-4" src="assets/images/team/' + member.image + '" alt="..." />' +
                  '<h5 class="fw-bolder">' + member.name + '</h5>' +
                  '<div class="fst-italic text-muted">' + member.aig_role + '</div>' +
              '</div>' +
          '</div>'
        );
      }
    }
  };



  build();
});
