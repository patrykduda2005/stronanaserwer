window.addEventListener('message', function(e) {
    document.querySelector("iframe").style.height = e.data + 'px';
}, false);
