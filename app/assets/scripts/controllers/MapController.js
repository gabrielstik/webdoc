export default class MapController {

  init() {
    const $lands = document.querySelectorAll('.land')
    TweenMax.staggerFrom($lands, 1, { opacity: '0', ease: Power1.easeOut, delay: 1 }, .01)

    const $map = document.querySelector('.map')
    TweenMax.from($map, 1,
      { y: '100%', ease: Power1.easeOut }
    )

    const $countries = document.querySelectorAll('#US, #FR, #RU, #BR')
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
    
    this.events($lands)
  }

  events($lands) {
    for (const $land of $lands) {
      $land.addEventListener('mousedown', () => {
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
        }
      })
    }
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
      { x: '0', ease: Power1.easeOut },
    )
    TweenMax.to($map, .5,
      { opacity: '.3', ease: Power1.easeOut },
    )

    this.loadThemes(document.querySelector($country))
  }

  loadThemes($country) {
    const $buttons = $country.querySelectorAll('.infos__theme')
    const $link = $country.querySelector('.infos__button')
    for (const $button of $buttons) {
      $button.addEventListener('mousedown', () => {
        for (const $button of $buttons) {
          $button.classList.remove('selected')
        }
        $button.classList.add('selected')
      })
    }
  }
}