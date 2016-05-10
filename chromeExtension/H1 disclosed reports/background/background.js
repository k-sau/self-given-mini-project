document.addEventListener('DOMContentLoaded', function(){

    // setInterval function to check for new reports every 30 mins
    window.setInterval(function updateBadge(){
        var newxhttp = new XMLHttpRequest();
        newxhttp.onreadystatechange = function() {

        // If request gets failed
        if(newxhttp.readyState == 4 && newxhttp.status != 200) {
          updateBadge();
        }
        else if(newxhttp.readyState == 4 && newxhttp.status == 200){

        newResponse = newxhttp.responseText;
        newObj = JSON.parse(newResponse);

       // Reading stored id (popup.js:17)
       chrome.storage.local.get('firstReportId', function (savedId) {

         if(typeof savedId.firstReportId == "undefined"){
             chrome.browserAction.setBadgeText({
             text: "25+"
           });
         }
         else if(newObj.reports[0].id != savedId.firstReportId ){
           // "count" counts no. of new disclosed reports
           var count = 0;
           while(newObj.reports[count].id != savedId.firstReportId){
             count++;
             if(count > 24){
               break;
             }
           }
           // Shows notification
           chrome.browserAction.setBadgeText({
             text: count.toString()
           });
         }
       });
     }
    };
  newxhttp.open("GET", "https://hackerone.com/hacktivity?page=1&filter=public", true);
  newxhttp.send();
}, 1800000);

},false);
