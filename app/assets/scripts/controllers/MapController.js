export default class MapController {

  init() {
    const $lands = document.querySelectorAll('.land')
    TweenMax.staggerFrom($lands, 1, { opacity: '0', ease: Power1.easeOut }, .01)

    this.events($lands)
  }

  events($lands) {
    for (const $land of $lands) {
      $land.addEventListener('mousedown', () => {
        switch ($land.id) {
          case 'US':
            this.dispAside('US')
            break;
          case 'FR':
            this.dispAside('FR')
            break;
        }
      })
    }
  }

  dispAside($country) {
    const $aside = document.querySelector('.infos')

    TweenMax.to($aside, .5,
      { x: '0', ease: Power1.easeOut },
    )
  }
}