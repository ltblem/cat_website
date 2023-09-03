//TODO: Make the returned image the correct aspect ratio

const urlParams = new URLSearchParams(window.location.search);
var stretch
var help
const helpstring = 'Press \'s\' to toggle stretch fill, press \'h\' to toggle this help message, press space to reload.'

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
    document.write('<p style="color: white; font-family: monospace; height: 5px;">' + helpstring + '</p>\n<div id="image"></div>\n</body>\n</html>')
} else if (!help) {
    document.write('<div id="image"></div>\n</body>\n</html>')
}


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

console.log('dbg: main: calling ajax_get')
ajax_get('https://api.thecatapi.com/v1/images/search?api_key=live_W2PxBHqGJN8L6WZ2NNOcGPvflkQ6OTOiTTYTY0X4KD41Zj3r0PRFyPdyr9P4RzE5', function(data) {
    console.log('dbg: main: ajax_get data recieved')
    if (stretch) {
        var html = '<img src="' + data[0]["url"] + '"; width=' + window.innerWidth + '; height=' + window.innerHeight + '>';
    } else if (!stretch) {
        var html = '<img src="' + data[0]["url"] + '">';
    }
    document.getElementById("image").innerHTML = html;
    console.log('dbg: main: html written')
});


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
    } else if (e.key == " ") {
        window.location.reload();
    }
   
}