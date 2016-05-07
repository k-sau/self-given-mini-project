document.addEventListener('DOMContentLoaded', function(){
  var checkPageButton = document.getElementById('fetch');
  checkPageButton.addEventListener('click', function(){

    // Remove notification
    chrome.browserAction.setBadgeText({text: ""});

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = xhttp.responseText;

      // Parse JSON response
      var obj = JSON.parse(response);

      // Storing first report id from response for comparison to show notification
      chrome.storage.local.set({
        'firstReportId': obj.reports[0].id
      });

      // Loop to show last 25 reports
      for(var i=0; i<25; i++){

        // List tag
        var li = document.createElement("li");
        li.className = "well well-sm";

        // Team image
        var teamImg = document.createElement("img");
        teamImg.src = obj.reports[i].team.profile_picture_urls.small;
        teamImg.alt = obj.reports[i].team.profile.name;
        teamImg.style = "margin-top: 10px; margin-bottom: 5px; vertical-align: middle; margin-left: 10px; margin-right: 10px;";
        teamImg.className = "img-responsive img-thumbnail";
        li.appendChild(teamImg);

        // Report title and link..
        var reportTitle = document.createElement("a");
        reportTitle.href = obj.reports[i].url;
        reportTitle.target = "_blank";
        reportTitle.text = obj.reports[i].title;
        li.appendChild(reportTitle);

        // Break line
        var br = document.createElement("br");
        li.appendChild(br);

        // Team name and handle
        var team = document.createElement("a");
        team.text = obj.reports[i].team.profile.name;
        team.href = obj.reports[i].team.url;
        team.target = "_blank";
        team.style = "padding-left: 1.3em;";
        li.appendChild(team);

        // Bounty
        var bold, bounty;
        bold = document.createElement("b");
        if(typeof obj.reports[i].formatted_bounty != "undefined"){
          var usd = document.createElement("img");
          usd.src = "usd.png";
          usd.style = "width: 130px; height: auto; padding-left: 100px; padding-bottom: 0.1em";
          li.appendChild(usd);
          bounty = document.createTextNode(obj.reports[i].formatted_bounty);
        }
        else {
          bounty = document.createTextNode("Bounty: NIL");
          bold.style = "padding-left: 10%;";
        }

        bold.appendChild(bounty);
        li.appendChild(bold);


        // Reporter name and profile link
        var anotherBold = document.createElement("b");
        anotherBold.style = "padding-left: 9em;";
        var by = document.createTextNode("By: ");
        anotherBold.appendChild(by);
        li.appendChild(anotherBold);
        var reporter = document.createElement("a");
        reporter.href = obj.reports[i].reporter.url;
        reporter.target = "_blank";
        reporter.text = obj.reports[i].reporter.username;
        li.appendChild(reporter);

        // Adding all elements under list tag
        document.getElementById("reportList").appendChild(li);

      }
    }
  };
  xhttp.open("GET", "https://hackerone.com/hacktivity?page=1&filter=public", true);
  xhttp.send();

  },false);
},false);
