document.write(
    '<img src="https://theoldreader.com/kittens/' + window.innerWidth + '/'+ window.innerHeight + '"; width="' + window.innerWidth + '"; height="' + window.innerHeight + '">'
);
document.onkeydown = function() {
    location.reload()
}
//TODO: Add notice to the webpage along the lines of "press any key to reload"