import Parallax from '../modules/Parallax'
import VideoPlayer from '../modules/VideoPlayer';

export default class StoryController {

  init() {
    TweenMax.to('.story__thumbnail img', .5,
      { scale: 1.02, ease: Power1.easeOut, delay: .5 }
    )

    TweenMax.to('.story__thumbnail .hidder', .5,
      { scaleX: 0, ease: Power1.easeOut, delay: 0 }
    )

    new Parallax('story__thumbnail img', 1, true)

    this.intersectionObservers()
    this.videoPlayers()
    this.scrollAnimation()
  }

  intersectionObservers() {
    const $title = document.querySelector('.story__title')
    const observer = new IntersectionObserver(() => {
      const $titleLines = document.querySelectorAll('.story__title .text')
      TweenMax.staggerFrom($titleLines, .5, { y: '100%', ease: Power1.easeOut, delay: 1 }, .1)

      TweenMax.from('.story__desc', 1,
        { x: '-100%', ease: Power1.easeOut, delay: 1.2 }
      )
    })
    observer.observe($title)

    const $tmInlines = document.querySelectorAll('.tm-inline')
    for (const $tmInline of $tmInlines) {
      const tmInlineObserver = new IntersectionObserver(() => {
        const letters = new SplitText($tmInline, { type: 'chars' })
        TweenMax.staggerFrom(letters.chars, .5, { y: '100%', ease: Power1.easeOut, delay: .5 }, .04)
      })
      tmInlineObserver.observe($tmInline)
    }

    const $tmAsideImages = document.querySelectorAll('.tm-aside-image img')
    for (const $tmAsideImage of $tmAsideImages) {
      const tmAsideImagesObserver = new IntersectionObserver(() => {
        TweenMax.to($tmAsideImage, 1,
        { scale: '1.02', ease: Power1.easeOut, delay: 1 }
      )
      })
      tmAsideImagesObserver.observe($tmAsideImage)
    }

    const $interractiveYouths = document.querySelector('.paris-seine__interractive-youths')
    document.addEventListener('mousemove',() => {
      TweenMax.to('.youth-lolight', 1,
        { opacity: '0', ease: Power1.easeOut, delay: 1 }
      )
    })
  }

  videoPlayers() {
    new VideoPlayer('vp-courneuve64', './assets/medias/lacourneuve64.mp4', '1964 – La Courneuve')
    new VideoPlayer('vp-courneuve83', './assets/medias/lacourneuve83.mp4', '1983 – Youths bored in La Courneuve')
  }

  scrollAnimation() {
    const $image = document.querySelector('.story__thumbnail img')
    const $hidder = document.querySelector('.story__thumbnail .hidder')
    window.addEventListener('scroll', () => {
      $image.style.transform = `scale(1.02) translateX(${window.scrollY / 5}px)`
      $hidder.style.transform = `scaleX(${window.scrollY / 1000})`
    })
  }
}