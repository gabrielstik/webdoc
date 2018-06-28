export default class Router {

  constructor(controllers) {
    this.controllers = controllers

    window.addEventListener('popstate', () => {
      this.route(this.pullRoute())
    })
    this.init()
  }

  ajax(route, subroute = '') {
    this.isRequesting = true
    const url = `/views/${subroute}/${route}.html`
    let success = false
    const http = new XMLHttpRequest()
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        TweenMax.to('.story', .5,
          { opacity: '1', ease: Power1.easeOut }
        )
        setTimeout(() => {
          document.body.style.transform = 'none'
        }, 500)
        setTimeout(() => {
          document.querySelector('.app').innerHTML += http.responseText

          switch (route) {
            case 'cover':
              this.controllers.home.initCover()
              break;
            case 'map':
              this.controllers.map.init()
              break;
            case 'paris-seine':
              this.controllers.story.init('paris-seine')
              break;
            case 'sao-paulo':
              this.controllers.story.init('sao-paulo')
              break;
            case 'compton':
              this.controllers.story.init('compton')
              break;
            case 'de-rocinha-music':
              this.controllers.story.init('de-rocinha-music')
              break;
            case 'de-rocinha-street-art':
              this.controllers.story.init('de-rocinha-street-art')
              break;
            case 'dev':
              this.controllers.dev.init()
              break;
          }
          this.clearOldDom(route)

          const $links = document.querySelectorAll('.route-link')
          for (const $link of $links) {
            const route = $link.dataset.url
            $link.addEventListener('click', (e) => {
              e.preventDefault()
              this.route(route)
              this.pushRoute(route)
            })
          }
        }, 500)
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
        setTimeout(() => {
          $node.parentNode.removeChild($node)
          if (document.querySelector('.cover') || document.querySelector('.home') || document.querySelector('.map')) {
            if (document.querySelector('.scrollBar')) document.querySelector('.scrollBar').parentNode.removeChild(document.querySelector('.scrollBar'))
          }
        }, 1000)
      }
    }
  }

  route(route) {
    switch (route) {
      case '':
        this.ajax('cover', 'intro')
        break
      case 'paris-seine':
        this.ajax('paris-seine', 'stories')
        break
      case 'sao-paulo':
        this.ajax('sao-paulo', 'stories')
        break
      case 'compton':
        this.ajax('compton', 'stories')
        break
      case 'de-rocinha-music':
        this.ajax('de-rocinha-music', 'stories')
        break
      case 'de-rocinha-street-art':
        this.ajax('de-rocinha-street-art', 'stories')
        break
      case 'home':
        this.ajax('home')
        break
      case 'map':
        this.ajax('map', 'map')
        break
      case 'dev':
        this.ajax('dev')
        break
      default:
        this.ajax('notfound')
        break
    }
  }
}