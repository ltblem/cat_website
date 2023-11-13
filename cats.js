// cats.js - A LetThereBeLemons creation (part of https://github.com/ltblem/cat_webiste/ or https://cat-website.pages.dev/)
// Liscenced under DONT STEAL MY CODE YOU ASSHOLE (DSMCYA)

const version = '0.1.3'
const versionstring = 'the `blake` update.'
//TODO: Make the returned image the correct aspect ratio

//* This is the amount of `custom` images, change as necessary.
var AmountCustomTotal = 48

const urlParams = new URLSearchParams(window.location.search); // Setting URL parameters (like /?help=true) into a vaiable
var stretch;
var help;
var custom;
const helpstring = 'Press \'s\' to toggle stretch fill, press \'h\' to toggle this help message, press \'c\' to switch to James Blake\'s cat, press enter to reload. Running cats.js version ' + version + ', ' + versionstring + ' https://github.com/ltblem/cat_webiste/';

// Checking the URL parameters and assigning relevant variables to be used later
if (urlParams.get("stretch") == "true") {
    stretch = true;
    console.log('dbg: main: stretch is true, OK')
} else if (urlParams.get("stretch") == "false") {
    stretch = false;
    console.log('dbg: main: stretch is false, OK')
} else {
    stretch = false;
    console.log('dbg: main: stretch param is invalid or missing, but this is fine; setting stretch to false, OK')
}

if (urlParams.get("help") == "true") {
    help = true;
    console.log('dbg: main: help is true, OK')
} else if (urlParams.get("help") == "false") {
    help = false;
    console.log('dbg: main: help is false, OK')
} else {
    help = true;
    console.log('dbg: main: help param is invalid or missing, but this is fine; setting help to true, OK')
}

if (urlParams.get("custom") == "true") {
    custom = true;
    console.log('dbg: main: custom is true, OK')
} else if (urlParams.get("custom") == "false") {
    custom = false;
    console.log('dbg: main: custom is false, OK')
} else {
    custom = false;
    console.log('dbg: main: custom param is invalid or missing, but this is fine; setting custom to false, OK')
}

if (help) {
    document.write('<p style="color: white; font-family: monospace; height: 5px;">' + helpstring + '</p>\n<div id="imagecontainer"></div>\n</body>\n</html>')
} else if (!help) {
    document.write('<div id="imagecontainer"></div>\n</body>\n</html>')
}

function cat_loaded() {
    console.log('dbg: cat_loaded: loaded, OK')
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
    console.log('dbg: ajax_get: request sent, OK')
}

// we then call the function... (but only if `custom` is false)
if (custom == false) {
    console.log('dbg: main: calling ajax_get')
    ajax_get('https://api.thecatapi.com/v1/images/search?api_key=live_W2PxBHqGJN8L6WZ2NNOcGPvflkQ6OTOiTTYTY0X4KD41Zj3r0PRFyPdyr9P4RzE5', function(data) {
        console.log('dbg: main: ajax_get data recieved, OK')
        document.getElementById('image')
        // ...parse the data into HTML...
        if (stretch && !help) {
            var html = '<img id="image" src="' + data[0]["url"] + '"; width=' + window.innerWidth + '; height=' + window.innerHeight + '    onload="cat_loaded()">';
        } else if (stretch && help) {
            var html = '<img id="image" src="' + data[0]["url"] + '"; width=' + window.innerWidth + '; height=' + (window.innerHeight - 34) + '     onload="cat_loaded()">';
            console.log('dbg: stretched image has been squished slightly due to help text, to avoid scrollbar, OK')
        } else if (!stretch) {
            var html = '<img id="image" src="' + data[0]["url"] + '" onload="cat_loaded()">';
        }
        // ...and write it to the page.
        document.getElementById("imagecontainer").innerHTML = html;
        console.log('dbg: main: html written, OK!')

})} else if (custom == true) { // HOWEVER if `custom` is true...
    // we draw a random image from ./custom/ and put that on the screen instead.
    // They will be named with numbers (0-*)
    console.log('dbg: main: custom selected, picking image...')
    var imgsource = "./custom/" + Math.floor(Math.random() * (AmountCustomTotal - 1)) + ".jpeg";
    console.log('dbg: custom: image selection made, OK')
    console.log('dbg: custom: image path is ' + imgsource)

    if (stretch && !help) {
        var html = '<img id="image" src="' + imgsource + '"; width=' + window.innerWidth + '; height=' + window.innerHeight + '    onload="cat_loaded()">';
    } else if (stretch && help) {
        var html = '<img id="image" src="' + imgsource + '"; width=' + window.innerWidth + '; height=' + (window.innerHeight - 34) + '     onload="cat_loaded()">';
        console.log('dbg: stretched image has been squished slightly due to help text, to avoid scrollbar, OK')
    } else if (!stretch) {
        var html = '<img id="image" src="' + imgsource + '" onload="cat_loaded()">';
    }
    // write html
    document.getElementById("imagecontainer").innerHTML = html;
    console.log('dbg: custom: html written, OK!')
}


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
    } else if (e.key == "c" || e.key == "C") {
        if (custom) {
            urlParams.set("custom", "false")
        } else if (!custom) {
            urlParams.set("custom", "true")
        }
        window.location.replace(window.location.href.split('?')[0] + '?' + urlParams.toString());
    }
   
}