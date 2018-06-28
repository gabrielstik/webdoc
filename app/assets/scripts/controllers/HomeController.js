import Parallax from '../modules/Parallax'

export default class HomeController {

  passRouter(router) {
    this.router = router
  }

  initCover() {
    document.body.style.overflow = 'hidden'
    
    const $titleLines = document.querySelectorAll('.cover__title .text')
    TweenMax.staggerFrom($titleLines, .5, { y: '100%', ease: Power1.easeOut, delay: .5 }, .05)

    TweenMax.to('.cover__image img', 1,
      { scale: 1.02, ease: Power1.easeOut, delay: .5 }
    )

    TweenMax.from('.cover__button', 1,
      { opacity: 0, ease: Power1.easeOut, delay: .7 }
    )

    new Parallax('cover__image', 1, true)

    const $discover = document.querySelector('.cover__button')
    const $videoContainer = document.querySelector('.cover__video')
    const $video = $videoContainer.querySelector('.cover__video video')
    $discover.addEventListener('mousedown',() => {
      TweenMax.to('.cover__hidder', .5,
        { y: '-100%', ease: Power1.easeOut }
      )
      setTimeout(() => {
        $videoContainer.style.transform = 'translateY(-100%)'
      }, 500)
      TweenMax.to('.cover__hidder', .5,
        { y: '-200%', ease: Power1.easeOut, delay: .5 }
      )
      $video.play()
    })

    const $skip = document.querySelector('.cover__video--skip')
    $skip.addEventListener('mousedown', () => {
      $video.currentTime = $video.duration
    })

    $video.addEventListener('ended', () => {
      this.router.route('map')
    })
  }
}