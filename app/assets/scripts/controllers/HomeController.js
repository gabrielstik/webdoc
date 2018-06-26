import Parallax from '../modules/Parallax'

export default class HomeController {

  initCover() {
    const $titleLines = document.querySelectorAll('.cover__title .text')
    TweenMax.staggerFrom($titleLines, .5, { y: '100%', ease: Power1.easeOut, delay: .5 }, .05)

    TweenMax.to('.cover__image img', 1,
      { scale: 1.02, ease: Power1.easeOut, delay: .5 }
    )

    TweenMax.from('.cover__button', 1,
      { opacity: 0, ease: Power1.easeOut, delay: .7 }
    )

    new Parallax('cover__image', 1, true)
  }
}