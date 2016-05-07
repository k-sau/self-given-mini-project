document.addEventListener('DOMContentLoaded', function(){

    window.setInterval(function updateBadge(){
        var newxhttp = new XMLHttpRequest();
        newxhttp.onreadystatechange = function() {
          if (newxhttp.readyState == 4 && newxhttp.status == 200) {


            chrome.storage.local.get('firstReportId', function (savedId) {
              if(typeof savedId.firstReportId == "undefined"){
                  chrome.browserAction.setBadgeText({
                  text: "25+"
                });
              }
              else if(newObj.reports[0].id != savedId.firstReportId ){
                var count = 0;
                while(newObj.reports[count].id != savedId.firstReportId){
                  count++;
                }
                chrome.browserAction.setBadgeText({
                  text: count.toString()
                });
              }
            });


         // Action to be performed when the document is read;
            newResponse = newxhttp.responseText;
            newObj = JSON.parse(newResponse);

       }
     };
  newxhttp.open("GET", "https://hackerone.com/hacktivity?page=1&filter=public", true);
  newxhttp.send();
}, 1800000);

},false);
