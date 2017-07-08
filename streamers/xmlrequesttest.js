
const fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
let streamers = JSON.parse(fs.readFileSync('./streamers.json', 'utf8'));
xhr.open("GET", "http://api.streamers.lt/info/Knok1Zygis", false);
xhr.send();
var myArr = JSON.parse(xhr.responseText);
streamers[myArr["channel"]] = myArr;
       fs.writeFile('./streamers.json', JSON.stringify(streamers), (err) => {
        if (err) console.error(err)
        });
console.log(myArr);
console.log(xhr.status);
console.log(xhr.statusText);