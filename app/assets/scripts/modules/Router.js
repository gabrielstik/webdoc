export default class Router {

  constructor(controllers) {
    this.controllers = controllers

    const $links = document.querySelectorAll('.route-link')

    window.addEventListener('popstate', () => {
      this.route(this.pullRoute())
    })
    this.init()
    
    for (const $link of $links) {
      const route = $link.dataset.url
      switch (route) {
        case 'home':
          $link.addEventListener('click', (e) => {
            e.preventDefault()
            this.route(route)
            this.pushRoute(route)
          })
          break
      }
    }
  }

  ajax(route, subroute = '') {
    this.isRequesting = true
    const url = `/views/${subroute}/${route}.html`
    let success = false
    const http = new XMLHttpRequest()
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        document.querySelector('.app').innerHTML += http.responseText

        switch (route) {
          case 'home':
            this.controllers.home.init()
            break;
        }
        this.clearOldDom(route)
      }
    }
    http.open('GET', url, true)
    http.send()
  }

  init() {
    this.route(this.pullRoute())
  }

  pullRoute() {
    return window.location.href.split('/')[3]
  }

  pushRoute(route) {
    history.pushState(null, null, route);
  }

  clearOldDom(route) {
    const $appNodes = document.querySelector('.app').childNodes
    for (const $node of $appNodes) {
      if (!$node.classList.contains(route)) {
        setTimeout(() => { $node.parentNode.removeChild($node) }, 1000)
      }
    }
  }

  route(route) {
    switch (route) {
      case '':
        this.ajax('earphones', 'intro')
        break
      default:
        this.ajax('notfound')
        break
    }
  }
}