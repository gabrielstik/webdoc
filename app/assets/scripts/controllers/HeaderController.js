export default class HeaderController {

  constructor() {
    this.$header = document.querySelector('.header')

    document.querySelector('.header__quit').addEventListener('mousedown', () => {
      this.hideHeader()
    })

    const $links = document.querySelectorAll('.route-link')
    for (const $link of $links) {
      $link.addEventListener('mousedown', () => {
        setTimeout(() => { this.hideHeader() }, 100)
      })
    }
  }

  showHeader() {
    TweenMax.to(this.$header, .5,
      { y: 0, ease: Power1.easeOut }
    )
  }

  hideHeader() {
    TweenMax.to(this.$header, .5,
      { y: '-100%', ease: Power1.easeOut }
    )
  }
}