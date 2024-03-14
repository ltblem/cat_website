// cats.js - A LetThereBeLemons creation (part of https://github.com/ltblem/cat_webiste/ or https://cat-website.pages.dev/)
// Liscenced under DONT STEAL MY CODE YOU ASSHOLE (DSMCYA)
// contact - jamsieh@icloud.com | https://github.com/ltblem/

const version = '<b style="color:lime">0.2.3</b>'
const versionstring = '<b style="color:green">the `b****y+++` update</b>.'
const poptext = '<b style="color:lime">Updated to 0.2.3.</b> <b style="color:red">This is a development build. Do not ship.</b>'

/*
!     We haven't recieved Br's pics yet, so 0.2.2 was pushed early. Remove this when we get the pics.
?     Do we need a better way of storing custom pics?
TODO: Add a way to see a few of the previous images, if the user wants to see an image they skipped
TODO: Make the returned image the correct aspect ratio (if possible)
TODO: Make the helptext at the top of the screen consume the right amount of space, AND/OR...
TODO: Add toggleable, overlayed buttons and text over image for existing functions 
*/

//* This is the amount of `custom` images, change as necessary.
const AmountCustomTotal = 54
// Their filenames are numbered, starting from 0.

//* This is the chance that a `custom` image is shown, even when the `custom` switch is disabled.
const customChance = 0.05 // 5% chance
// This is a float between 0 (incl.) and 1 (excl.)

const urlParams = new URLSearchParams(window.location.search); // Setting URL parameters (like /?help=true) into a vaiable
var stretch;
var help;
var custom;
var customTemp = false;
const helpstring = 'Press \'s\' to toggle stretch fill, \'h\' to toggle this help message, \'c\' to switch to only custom cats, enter to reload. Running cats.js v' + version + ', ' + versionstring + ' https://github.com/ltblem/cat_webiste/ || ' + poptext;

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

// Let's make a random chance for custom images to show up anyway
if (Math.random() < customChance) {
    customTemp = true;
    console.log('dbg: main: customTemp is true, OK')
}

if (help) { // this document.write() is a bit jank, text spacing is constant, ew. 50px is generally about 3 lines of text, so that's the max until this is fixed.
    document.write('<p style="color: white; font-family: monospace; height: 50px;">' + helpstring + '</p>\n<div id="imagecontainer"></div>\n</body>\n</html>')
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
if (custom == false && customTemp == false) {
    console.log('dbg: main: calling ajax_get')
    ajax_get('https://api.thecatapi.com/v1/images/search?api_key=live_W2PxBHqGJN8L6WZ2NNOcGPvflkQ6OTOiTTYTY0X4KD41Zj3r0PRFyPdyr9P4RzE5', function(data) {
        console.log('dbg: main: ajax_get data recieved, OK')
        document.getElementById('image')
        // ...parse the data into HTML...
        if (stretch && !help) {
            var html = '<img id="image" src="' + data[0]["url"] + '"; width=' + window.innerWidth + '; height=' + window.innerHeight + '    onload="cat_loaded()">';
        } else if (stretch && help) {
            var html = '<img id="image" src="' + data[0]["url"] + '"; width=' + window.innerWidth + '; height=' + (window.innerHeight - 84) + '     onload="cat_loaded()">';
            console.log('dbg: stretched image has been squished slightly due to help text, to avoid scrollbar, OK')
        } else if (!stretch) {
            var html = '<img id="image" src="' + data[0]["url"] + '" onload="cat_loaded()">';
        }
        // ...and write it to the page.
        document.getElementById("imagecontainer").innerHTML = html;
        console.log('dbg: main: html written, OK!')

})} else if (custom == true || customTemp == true) { // HOWEVER if `custom` is true...
    // we draw a random image from ./custom/ and put that on the screen instead.
    // They will be named with numbers (0-*).jpeg
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
    console.log('dbg: main: keypress detected: ' + e.key)
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
