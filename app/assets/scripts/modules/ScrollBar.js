export default class ScrollBar {
	constructor(windowNumber, containerClass) {
		this.bulletPoints = []

		const scrollBarContainer = document.querySelector('.' + containerClass)

		this.former = null

		const scrollBarWrapper = document.createElement('div')
		scrollBarWrapper.classList.add('scrollBar')

		for (let i = 0; i < windowNumber; i++) {
			const bulletPoint = document.createElement('div')
			const bulletChain = document.createElement('div')
			
			bulletPoint.classList.add('scrollBar__bulletPoint')
      bulletChain.classList.add('scrollBar__bulletChain')
      
      bulletChain.style.height = '200px'

			if (i == 0) {
				bulletPoint.classList.add('scrollBar__bulletPoint--first')
				scrollBarWrapper.appendChild(bulletPoint)
				bulletPoint.appendChild(bulletChain)
			}
			else if (i == windowNumber - 1) {
				this.former.appendChild(bulletPoint)
			}
			else {
				bulletPoint.appendChild(bulletChain)

				this.former.appendChild(bulletPoint)
			}

			this.former = bulletChain

			scrollBarContainer.appendChild(scrollBarWrapper)
		}
	}
}