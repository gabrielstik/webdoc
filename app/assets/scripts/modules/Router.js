export default class Router {

  constructor(viewControllers) {
    this.viewControllers = viewControllers

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

  ajax(route) {
    this.isRequesting = true
    const url = `/views/${route}.html`
    let success = false
    const http = new XMLHttpRequest()
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        document.querySelector('.app').innerHTML += http.responseText

        switch (route) {
          case 'home':
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
        this.ajax('home')
        break
      default:
        this.ajax('notfound')
        break
    }
  }
}