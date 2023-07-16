function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
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
}


ajax_get('https://api.thecatapi.com/v1/images/search?api_key=live_W2PxBHqGJN8L6WZ2NNOcGPvflkQ6OTOiTTYTY0X4KD41Zj3r0PRFyPdyr9P4RzE5', function(data) {
    var html = '<img src="' + data[0]["url"] + '">';
    document.getElementById("image").innerHTML = html;
});

//TODO: Make the returned image the correct aspect ratio