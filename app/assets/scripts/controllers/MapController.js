import Parallax from "../modules/Parallax";

export default class MapController {

  init() {
    new Parallax('mapWrapper', 4, true)

    const $lands = document.querySelectorAll('.land')
    TweenMax.staggerFrom($lands, 1, { opacity: '0', ease: Power1.easeOut, delay: 1 }, .01)

    const $map = document.querySelector('.map')
    TweenMax.from($map, 1,
      { y: '100%', ease: Power1.easeOut }
    )

    const $countries = document.querySelectorAll('#US, #FR, #RU, #BR, #ZA')
    for (const $country of $countries) {
      $country.classList.add('animate')
      $country.addEventListener('mouseenter', () => {
        $country.classList.remove('animate')
        $country.classList.add('hover')
      })
      $country.addEventListener('mouseout', () => {
        $country.classList.add('animate')
        $country.classList.remove('hover')
      })
    }

    const $links = document.querySelectorAll('.infos__button')
    for (const $link of $links) {
      $link.style.display = 'none'
    }
    const $selectedLinks = document.querySelectorAll('.infos__button.selected')
    for (const $selectedLink of $selectedLinks) {
      $selectedLink.style.display = 'inline-block'
    }

    
    this.events($lands)
  }

  events($lands) {
    const letDisp = ($land) => {
      switch ($land.id) {
        case 'US':
          this.dispAside('.infos__US')
          break;
        case 'FR':
          this.dispAside('.infos__FR')
          break;
        case 'RU':
          this.dispAside('.infos__RU')
          break;
        case 'BR':
          this.dispAside('.infos__BR')
          break;
        case 'ZA':
          this.dispAside('.infos__ZA')
          break;
      }
    }
    const $map = document.querySelector('.mapmonde svg')
    $map.addEventListener('mousedown', (e) => {
      let targetted = false
      let target = null
      for (const $land of $lands) {
        if (e.target == $land) {
          targetted = true
          target = $land
        }
      }
      targetted ? letDisp(target) : this.hideAside()
    })
  }

  dispAside($country) {
    const $aside = document.querySelector('.infos')
    const $map = document.querySelector('.mapmonde')
    const $infos = document.querySelectorAll('.infos > div')
    
    for (const $info of $infos) {
      $info.style.display = 'none'
    }
    document.querySelector($country).style.display = 'block'

    TweenMax.to($aside, .5,
      { right: '0', ease: Power1.easeOut },
    )
    TweenMax.to($map, .5,
      { opacity: '.3', ease: Power1.easeOut },
    )

    this.loadThemes(document.querySelector($country))
  }

  hideAside() {
    const $aside = document.querySelector('.infos')
    const $map = document.querySelector('.mapmonde')

    this.isAside = false

    TweenMax.to($aside, .5,
      { right: '-100%', ease: Power1.easeOut },
    )
    TweenMax.to($map, .5,
      { opacity: '1', ease: Power1.easeOut },
    )
  }

  loadThemes($country) {
    const $buttons = $country.querySelectorAll('.infos__theme')
    console.log($buttons)
    const $links = $country.querySelectorAll('.infos__button')
    for (const $button of $buttons) {
      $button.addEventListener('mousedown', () => {
        for (const $link of $links) {
          $link.style.display = 'none'
        }
        for (const $button of $buttons) {
          $button.classList.remove('selected')
        }
        $button.classList.add('selected')
        for (const $link of $links) {
          if ($link.dataset.url == $button.dataset.link) {
            $link.style.display = 'inline-block'
          }
        }
      })
    }
  }
}