// cats.js - A LetThereBeLemons creation (part of https://github.com/ltblem/cat_webiste/)
// Liscenced under DONT STEAL MY CODE YOU ASSHOLE (DSMCYA)

//TODO: Make the returned image the correct aspect ratio

const urlParams = new URLSearchParams(window.location.search); // Setting URL parameters (like /?help=true) into a vaiable
var stretch
var help
const helpstring = 'Press \'s\' to toggle stretch fill, press \'h\' to toggle this help message, press enter to reload.'

// Checking the URL parameters and assigning relevant variables to be used later
if (urlParams.get("stretch") == "true") {
    stretch = true;
    console.log('dbg: main: stretch is true')
} else if (urlParams.get("stretch") == "false") {
    stretch = false;
    console.log('dbg: main: stretch is false')
} else {
    stretch = false;
    console.log('dbg: main: stretch param is invalid or missing, but this is fine; setting stretch to false')
}

if (urlParams.get("help") == "true") {
    help = true;
    console.log('dbg: main: help is true')
} else if (urlParams.get("help") == "false") {
    help = false;
    console.log('dbg: main: help is false')
} else {
    help = true;
    console.log('dbg: main: help param is invalid or missing, but this is fine; setting help to true')
}

if (help) {
    document.write('<p style="color: white; font-family: monospace; height: 5px;">' + helpstring + '</p>\n<div id="imagecontainer"></div>\n</body>\n</html>')
} else if (!help) {
    document.write('<div id="imagecontainer"></div>\n</body>\n</html>')
}

// we create the ajax_get function, which creates and sends the request for data
function ajax_get(url, callback) {
    console.log('dbg: ajax_get: forming request...')
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('dbg: ajax_get: responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
  
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    console.log('dbg: ajax_get: request sent')
}

// we then call the function...
console.log('dbg: main: calling ajax_get')
ajax_get('https://api.thecatapi.com/v1/images/search?api_key=live_W2PxBHqGJN8L6WZ2NNOcGPvflkQ6OTOiTTYTY0X4KD41Zj3r0PRFyPdyr9P4RzE5', function(data) {
    console.log('dbg: main: ajax_get data recieved')
    document.getElementById('image')
    // ...parse the data into HTML...
    if (stretch && !help) {
        var html = '<img id="image" src="' + data[0]["url"] + '"; width=' + window.innerWidth + '; height=' + window.innerHeight + '; id="image">';
    } else if (stretch && help) {
        var html = '<img id="image" src="' + data[0]["url"] + '"; width=' + window.innerWidth + '; height=' + (window.innerHeight - 34) + '; id="image">';
        console.log('dbg: stretched image has been squished slightly due to help text, to avoid scrollbar')
    } else if (!stretch) {
        var html = '<img id="image" src="' + data[0]["url"] + '">';
    }
    // ...and write it to the page.
    document.getElementById("imagecontainer").innerHTML = html;
    console.log('dbg: main: html written')

});


// here we are checking for keypresses and changing the URL parameters accordingly
document.onkeydown = function(e) {
    console.log('dbg: main: keypress detected')
    if (e.key == "s" || e.key == "S") {
        if (stretch) {
            urlParams.set("stretch", "false")
        } else if (!stretch) {
            urlParams.set("stretch", "true")
        }
        window.location.replace(window.location.href.split('?')[0] + '?' + urlParams.toString());
    } else if (e.key == "h" || e.key == "H") {
        if (help) {
            urlParams.set("help", "false")
        } else if (!help) {
            urlParams.set("help", "true")
        }
        window.location.replace(window.location.href.split('?')[0] + '?' + urlParams.toString());
    } else if (e.key == "Enter") {
        window.location.reload();
    }
   
}