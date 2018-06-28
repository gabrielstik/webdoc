import GraphCanvas from '../modules/GraphCanvas'
import Parallax from '../modules/Parallax';
import VideoPlayer from '../modules/VideoPlayer';
import ScrollBar from '../modules/ScrollBar';
import MuteWindow from '../modules/MuteWindow';

export default class StoryController {
  constructor()
  {
    this.audios = []
  }

  init(story) {
    const scrollBar = new ScrollBar([
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
    ], 'html', '70', '20')
    document.body.style.overflow = 'auto'
    const $scrollBar = document.querySelector('.scrollBar')
    const $bulletPoints = $scrollBar.querySelectorAll('.scrollBar__bulletPoint')
    this.once = true

    for (const [index, $bulletPoint] of $bulletPoints.entries()) {

      $bulletPoint.addEventListener('mousedown', () => {
        if(this.once) 
        {
          TweenMax.to(document.body, .5,
            { transform: `translateY(-${index * 100}vh)`, ease: Power1.easeOut }
          )
        }
        this.once = false

        window.addEventListener('mouseup', () => 
        {
          this.once = true
        })
      })
    }

    TweenMax.from('.story', .5,
      { x: '100%', ease: Power1.easeOut, delay: .5 }
    )

    TweenMax.to('.story__thumbnail img', .5,
      { scale: 1.02, ease: Power1.easeOut, delay: 1 }
    )

    TweenMax.to('.story__thumbnail .hidder', .5,
      { scaleX: 0, ease: Power1.easeOut, delay: 1 }
    )

    new Parallax('story__thumbnail img', 1, true)

    const videos = this.videoPlayers(story)
    this.intersectionObservers(videos)
    this.scrollAnimation()

    this.navigation(videos, scrollBar)

    this.muteWindow = new MuteWindow('html', this.audios)
  }

  navigation(videos, scrollBar) {
    const lethargy = new Lethargy()
    let currentScroll = 0
    let isScrolling = false

    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 32) e.preventDefault()
    })

    window.addEventListener('wheel', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (lethargy.check(e) !== false) {
        if (isScrolling == false) {
          if (lethargy.check(e) === -1) {
            if (currentScroll < document.querySelectorAll('.window').length - 1) currentScroll++
          }
          if (lethargy.check(e) === 1) {
            if (currentScroll > 0) currentScroll--
          }
          isScrolling = true
          setTimeout(() => {
            isScrolling = false
          }, 500)
          
          for (const video of videos) {
            video.pauseVideo()
          }

          this.muteWindow.pauseAll()
        }
        TweenMax.to(document.body, .5,
          { transform: `translateY(-${currentScroll * 100}vh)`, ease: Power1.easeOut }
        )
        scrollBar.updateScroll(currentScroll)
        window.scrollY = currentScroll
      }
    })
  }

  intersectionObservers(videos) {
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

    for (const video of videos) {
      video.getVideoDOM().addEventListener('mouseenter', () => {
        video.playVideo()
      })
    }

    if (document.querySelector('.paris-seine__interractive-youths')) {
      
      const $youthOne = document.createElement('div')
      const $youthTwo = document.createElement('div')
      const $youthThree = document.createElement('div')
      
      const youthOne = new Audio('assets/medias/djeuns-1.m4a')
      const youthTwo = new Audio('assets/medias/djeuns-2.m4a')
      const youthThree = new Audio('assets/medias/djeuns-3.m4a')

      this.audios.push(youthOne)
      this.audios.push(youthTwo)
      this.audios.push(youthThree)

      const youthSpeakVolume = 1
      const youthSpeakBackgroundVolume = 0.1

      youthOne.volume = youthSpeakBackgroundVolume
      youthTwo.volume = youthSpeakBackgroundVolume
      youthThree.volume = youthSpeakBackgroundVolume

      $youthOne.style.position = 'absolute'
      $youthTwo.style.position = 'absolute'
      $youthThree.style.position = 'absolute'

      $youthOne.style.cursor = 'pointer'
      $youthTwo.style.cursor = 'pointer'
      $youthThree.style.cursor = 'pointer'

      $youthOne.style.width = '10%'
      $youthTwo.style.width = '10%'
      $youthThree.style.width = '14%'

      $youthOne.style.minWidth = '100px'
      $youthTwo.style.minWidth = '100px'
      $youthThree.style.minWidth = '140px'

      $youthOne.style.height = '40%'
      $youthTwo.style.height = '30%'
      $youthThree.style.height = '30%'

      // $youthOne.style.backgroundColor = 'green'
      // $youthTwo.style.backgroundColor = 'blue'
      // $youthThree.style.backgroundColor = 'red'

      $youthOne.style.opacity = '0.4'
      $youthTwo.style.opacity = '0.4'
      $youthThree.style.opacity = '0.4'

      $youthOne.style.left = '40%'
      $youthTwo.style.left = '45%'
      $youthThree.style.left = '55%'
      $youthThree.style.right = '55%'

      $youthOne.style.top = '3%'
      $youthTwo.style.top = '43%'
      $youthThree.style.top = '43%'

      const $interractiveYouths = document.querySelector('.paris-seine__interractive-youths')

      $interractiveYouths.appendChild($youthOne)
      $interractiveYouths.appendChild($youthTwo)
      $interractiveYouths.appendChild($youthThree)

      $interractiveYouths.addEventListener('mouseenter',() => {
        TweenMax.to('.youth-lolight', 1,
          { opacity: '0', ease: Power1.easeOut, delay: 0 }
        )
        youthOne.play()
        youthTwo.play()
        youthThree.play()
      })

      $youthOne.addEventListener('mouseenter', () => 
      {
        console.log('playOne')
        youthOne.volume = youthSpeakVolume
        youthOne.currentTime = 0
        youthOne.play()
        $youthOne.addEventListener('mouseleave', () => 
        {
          console.log('pauseOne')
          youthOne.volume = youthSpeakBackgroundVolume
        })
      })

      $youthTwo.addEventListener('mouseenter', () => 
      {
        console.log('playTwo')
        youthTwo.volume = youthSpeakVolume
        youthTwo.currentTime = 0
        youthTwo.play()
        $youthTwo.addEventListener('mouseleave', () => 
        {
          console.log('pauseTwo')
          youthTwo.volume = youthSpeakBackgroundVolume
        })
      })

      $youthThree.addEventListener('mouseenter', () => 
      {
        console.log('playThree')
        youthThree.volume = youthSpeakVolume
        youthThree.currentTime = 0
        youthThree.play()
        $youthThree.addEventListener('mouseleave', () => 
        {
          console.log('pauseThree')
          youthThree.volume = youthSpeakBackgroundVolume
        })
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

    if (document.querySelector('.story-rio-streetart')) {
      new GraphCanvas('de-rocinha__painting', 'assets/images/favelas/wall.jpeg', 'assets/images/favelas/wark.png', 'assets/images/favelas/warkBlend.png')
      new Parallax('graph__wrapper', 1, true)
    }

    if (document.querySelector('.compton')) {
      let videoTriggered = false

      const $comptonContainer = document.querySelector('.compton__voice')
      $comptonContainer.addEventListener('mouseenter', () => {
        if (!videoTriggered) {
          videoTriggered = true
          const $texts = document.querySelectorAll('.compton__voice--text .text-part')
          for (const $text of $texts) {
            setTimeout(() => {
              $text.style.opacity = 1
            }, 500)
          }

          const delays = [3.5, 5, 7, 9.5, 12.5, 14]
      
          const audio = new Audio()
          audio.src = './assets/medias/quote.mp3'

          audio.addEventListener('canplay', () => {
            for (let i = 0; i < $texts.length; i++) {
              const words = new SplitText($texts[i], { type: 'words' })
              TweenMax.staggerFrom(words.words, .5, { opacity: '0', ease: Power1.easeOut, delay: delays[i] }, .2)
            }
            audio.play()
          })
        }
      })
    }
  }

  videoPlayers(story) {
    switch (story) {
      case 'paris-seine':
        const courneuve64 = new VideoPlayer('vp-courneuve64', './assets/medias/lacourneuve64.mp4', '1964 – La Courneuve')
        const courneuve83 = new VideoPlayer('vp-courneuve83', './assets/medias/lacourneuve83.mp4', '1983 – Youths bored in La Courneuve')
        const ntm = new VideoPlayer('vp-ntm', './assets/medias/ntm.mp4', 'NTM – Laisse pas traîner ton fils')
        const pnl = new VideoPlayer('vp-pnl', './assets/medias/pnl.mp4', 'PNL – Le Monde ou Rien')
        return [
          courneuve64,
          courneuve83,
          ntm,
          pnl
        ]
        break
      case 'sao-paulo':
        const saopaulofootball = new VideoPlayer('vp-saopaulofootball', './assets/medias/favelas.mp4', 'Young people playing football in favelas - Sao Paulo ')
        const neymar = new VideoPlayer('vp-neymar', './assets/medias/neymar.mp4', 'Neymar JR - A star from favelas')
        return [
          saopaulofootball,
          neymar
        ]
        break
      case 'compton':
        const comptonwitness = new VideoPlayer('vp-comptonwitness', './assets/medias/compton_witness.mp4', 'Compton | Witness Greatness | GRAMMYs')
        const noisey = new VideoPlayer('vp-noisey', './assets/medias/noisey.mp4', 'NOISEY Bompton: Growing up with Kendrick Lamar')
        return [
          comptonwitness,
          noisey
        ]
        break
      case 'de-rocinha-music':
        const drfunk = new VideoPlayer('vp-drfunk', './assets/medias/drfunk.mp4', 'Funk Proibidao - Rio de Janeiro')
        return [
          drfunk
        ]
        break;
      case 'de-rocinha-street-art':
        const drdrugs = new VideoPlayer('vp-drdrugs', './assets/medias/drdrugs.mp4', 'Young people studying in the middle of drugs traffic')
        const grafiti = new VideoPlayer('vp-grafiti', './assets/medias/wark.mp4', 'Instituto Wark: Graffiti in Rocinha')
        return [
          drdrugs,
          grafiti
        ]
        break
    }
  }

  scrollAnimation() {
    // const $image = document.querySelector('.story__thumbnail img')
    const $hidder = document.querySelector('.story__thumbnail .hidder')
    window.addEventListener('scroll', () => {
      // $image.style.transform = `scale(1.02) translateX(${window.scrollY / 5}px)`
      $hidder.style.transform = `scaleX(${window.scrollY / 1000})`
    })
  }
}