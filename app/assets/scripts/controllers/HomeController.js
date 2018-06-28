import Parallax from '../modules/Parallax'
import AudioController from '../modules/AudioController'

export default class HomeController {

  constructor() {
    this.mediaTimeout = null
  }

  passRouter(router) {
    this.router = router
  }

  initCover() {
    document.body.style.overflow = 'hidden'
    const music = new Audio()
    const musicController = new AudioController(music)
    
    const $titleLines = document.querySelectorAll('.cover__title .text')
    TweenMax.staggerFrom($titleLines, .5, { y: '100%', ease: Power1.easeOut, delay: .5 }, .05)

    TweenMax.to('.cover__image img', 1,
      { scale: 1.02, ease: Power1.easeOut, delay: .5 }
    )

    TweenMax.from('.cover__button', 1,
      { opacity: 0, ease: Power1.easeOut, delay: 2 }
    )

    TweenMax.from('.cover__text', 1,
      { opacity: 0, ease: Power1.easeOut, delay: 2 }
    )

    new Parallax('cover__image', 1, true)

    const $discover = document.querySelector('.cover__button')
    const $videoContainer = document.querySelector('.cover__video')
    const $video = $videoContainer.querySelector('.cover__video video')
    const videoController = new AudioController($video)
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
      music.src = './assets/medias/intro.mp3'
      music.play()

      this.mediaTimeout = setTimeout(() => {
        videoController.fadeOutPause(1000)
        TweenMax.to('.cover__hidder-2', .5,
          { y: '-100%', ease: Power1.easeOut }
        )
        setTimeout(() => {
          musicController.fadeOutPause(3000)
          this.router.route('map')
        }, 1000)
      }, 30000)
    })

    const $skip = document.querySelector('.cover__video--skip')
    $skip.addEventListener('mousedown', () => {
      clearTimeout(this.mediaTimeout)
      videoController.fadeOutPause(1000)
      TweenMax.to('.cover__hidder-2', .5,
        { y: '-100%', ease: Power1.easeOut }
      )
      setTimeout(() => {
        musicController.fadeOutPause(3000)
        this.router.route('map')
      }, 1000)
    })
  }
}