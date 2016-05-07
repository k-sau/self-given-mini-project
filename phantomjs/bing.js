var page = require('webpage').create();
var fs = require('fs');

var dir = fs.absolute('.');
page.open("http://www.bing.com/", function(status){

// Un-comment the next line to view page source while running the script.
// console.log('Content: \n' + page.content);

// Scraping image link from source using regex.
console.log('Scrapped image link: '+ page.content.match(/\/az\/\S+\.jpg/i));
var url = "https://www.bing.com" + page.content.match(/\/az\/\S+\.jpg/i);
console.log('Rendering image: '+ url);

var image = require('webpage').create();
var spawn = require('child_process').spawn;

image.viewportSize = {
  width: 1366,
  height: 768
}
image.open(url, function (status) {

    console.log("Connection Status: " + status);
            if (status === "success") {
              console.log("Saving image...");
        image.render('bing.jpg');
        console.log("Saved!");
        console.log("Setting today's bing wallpaper...");
        spawn('gsettings', ['set', 'org.cinnamon.desktop.background', 'picture-uri', 'file://' + dir + '/bing.jpg']);
        spawn('notify-send', 'Wallpaper changed...');
    }
    setTimeout(function(){
      phantom.exit();
    },2000);
  });
});
