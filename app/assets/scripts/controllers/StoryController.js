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
    this.navigation()
  }

  navigation() {
    const lethargy = new Lethargy()
    let currentScroll = 0
    let isScrolling = false

    window.addEventListener('wheel', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (lethargy.check(e) !== false) {
        if (isScrolling == false) {
          if (lethargy.check(e) === -1) {
            currentScroll += 100
          }
          if (lethargy.check(e) === 1) {
            currentScroll -= 100
          }
          isScrolling = true
          setTimeout(() => {
            isScrolling = false
          }, 2000)
        }
        TweenMax.to(document.body, .5,
          { transform: `translateY(-${currentScroll}vh)`, ease: Power1.easeOut }
        )
        window.scrollY = currentScroll
      }
    })
  }

  intersectionObservers() {
    const $intro = document.querySelector('.story__intro')
    const observer = new IntersectionObserver(() => {
      const $titleLines = document.querySelectorAll('.story__title .text')
      TweenMax.staggerFrom($titleLines, .5, { y: '100%', ease: Power1.easeOut, delay: 1 }, .1)
    })
    observer.observe($intro)

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
    $interractiveYouths.addEventListener('mousemove',() => {
      TweenMax.to('.youth-lolight', 1,
        { opacity: '0', ease: Power1.easeOut, delay: 0 }
      )
    })
    $interractiveYouths.addEventListener('mouseout',() => {
      TweenMax.to('.youth-lolight', 1,
        { opacity: '1', ease: Power1.easeOut, delay: 0 }
      )
    })

    const $finalValue1 = document.querySelector('.lemondechico .value')
    const $finalValue2 = document.querySelector('.danslalegende .value')
    const finalValue1 = parseInt($finalValue1.innerHTML)
    const finalValue2 = parseInt($finalValue2.innerHTML)
    
    const clean = (value) => {
      value = Math.round(value)
      const newValue = value.toString().match(/.{3}/g).join(' ');
      return newValue
    }

    const $graphsContainer = document.querySelector('.paris-seine__graph')
    const $graphs = document.querySelectorAll('.paris-seine__graph-bar .filled')
    for (const $graph of $graphs) {
      const tmAsideImagesObserver = new IntersectionObserver(() => {
        let value1 = 0
        let value2 = 0
        TweenMax.from($graph, 1,
          { scaleY: '0', ease: Power1.easeOut, delay: 1 }
        )
        const increase = () => {
          value1 += finalValue1 / 123
          value2 += finalValue2 / 123
          $finalValue1.innerHTML = clean(value1)
          $finalValue2.innerHTML = clean(value2)
          if (value1 < finalValue1 && value2 < finalValue2) {
            requestAnimationFrame(increase)
          }
        }
        increase()
      })
      tmAsideImagesObserver.observe($graphsContainer)
    }
  }

  videoPlayers() {
    new VideoPlayer('vp-courneuve64', './assets/medias/lacourneuve64.mp4', '1964 – La Courneuve')
    new VideoPlayer('vp-courneuve83', './assets/medias/lacourneuve83.mp4', '1983 – Youths bored in La Courneuve')
    new VideoPlayer('vp-ntm', './assets/medias/ntm.mp4', 'NTM – Laisse pas traîner ton fils')
    new VideoPlayer('vp-pnl', './assets/medias/pnl.mp4', 'PNL – Le Monde ou Rien')
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