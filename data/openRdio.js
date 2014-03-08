// Add “Open in Rdio.app” link
link = document.createElement('span')
link.className = 'blue button open-in-rdio-link'
link.innerHTML = 'Open in Rdio.app'
link.onclick = function() {
    location.href = location.href.replace(location.href.split('://')[0],'rdio')
}
document.body.appendChild(link)
