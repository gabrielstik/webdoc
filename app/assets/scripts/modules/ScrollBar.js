export default class ScrollBar {
	constructor(windowNumber, containerClass, scrollHeight, bulletPointDiametre) {
		this.bulletPointFills = []
		this.bulletChainFills = []
		this.bulletPoints = []
		this.timeline = new TimelineMax()

		const scrollBarContainer = document.querySelector('.' + containerClass)

		this.former = null
		this.updateScrollCount = 0
		this.currentWindow = 0

		const scrollBarWrapper = document.createElement('div')
		scrollBarWrapper.classList.add('scrollBar')
		scrollBarWrapper.style.height = scrollHeight + 'vh'

		const chainHeight = Math.round((80 * window.innerHeight / 100) / (windowNumber - 1) - (bulletPointDiametre / (windowNumber)) - ((bulletPointDiametre / 2) / (windowNumber * 2)))

		for (let i = 0; i < windowNumber; i++) {
			const bulletPoint = document.createElement('div')
			const bulletPointFill = document.createElement('div')
			const bulletChain = document.createElement('div')
			const bulletChainFill = document.createElement('div')
			
			bulletPoint.classList.add('scrollBar__bulletPoint')
			bulletPointFill.classList.add('scrollBar__bulletPointFill')
			bulletChain.classList.add('scrollBar__bulletChain')
			bulletChainFill.classList.add('scrollBar__bulletChainFill')

			bulletChain.style.height = chainHeight + 'px'
			bulletPoint.style.height = bulletPointDiametre + 'px'
			bulletPoint.style.width = bulletPointDiametre + 'px'

			bulletPoint.appendChild(bulletPointFill)
			bulletChain.appendChild(bulletChainFill)

			this.bulletChainFills.push(bulletChainFill)
			this.bulletPointFills.push(bulletPointFill)
			this.bulletPoints.push(bulletPoint)

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
		this.updateScroll(0)

		for(const [index, bulletPoint] of this.bulletPoints.entries())
		{
			this.once = true
			bulletPoint.addEventListener('click', () => 
			{
				if(this.once) 
				{ 
					console.log('INDEX ' + index)
					this.updateScroll(index) 
				}
				this.once = false

				window.addEventListener('mouseup', () => 
				{
					this.once = true
				})
			})
		}
	}
	updateScroll(windowIndex)
	{
		const bulletPointFills = [] 
		const bulletChainFills = [] 
		const bulletPoint = []

		if(windowIndex == 0 && this.currentWindow == windowIndex)
		{
			TweenMax.to(this.bulletPointFills[0], 0.1, { scale: 1 , ease: Power1.easeOut}, 0.1)
			TweenMax.to(this.bulletPoints[0], 0.1, { borderWidth: '0px', ease: Power1.easeOut}, 0.1)
		}
		else if(windowIndex < this.bulletPointFills.length && this.currentWindow < windowIndex)
		{
			console.log('FORWARD')
			for(let i = 0; i < windowIndex; i++)
			{
				bulletPointFills.push(this.bulletPointFills[i])
				bulletPoint.push(this.bulletPoints[i])
				bulletChainFills.push(this.bulletChainFills[i])
	
				if(i == windowIndex - 1)
				{ 
					bulletPointFills.push(this.bulletPointFills[i + 1])
					bulletPoint.push(this.bulletPoints[i + 1])
				}
			}
		}
		else if(windowIndex < this.bulletPointFills.length && this.currentWindow > windowIndex)
		{
			for(let i = this.bulletPoints.length - 1; i > windowIndex; i--)
			{
				bulletPointFills.push(this.bulletPointFills[i])
				bulletPoint.push(this.bulletPoints[i])
				bulletChainFills.push(this.bulletChainFills[i])

				if(i == windowIndex + 1)
				{ 
					bulletChainFills.push(this.bulletChainFills[i - 1])
					bulletPoint.push(this.bulletPoints[i])
				}
			}
		}
		else
		{
			console.error('Unexpected number')
		}
		if(this.currentWindow < windowIndex)
		{
			TweenMax.staggerTo(bulletPointFills, 0.1, { scale: 1 , ease: Power1.easeOut}, 0.1)
			TweenMax.staggerTo(bulletChainFills, 0.1, { scale: 1 , ease: Power0.easeOut}, 0.1)
			TweenMax.staggerTo(bulletPoint, 0.1, { borderWidth: '0px' , ease: Power0.easeOut}, 0.1)
		}
		else
		{
			TweenMax.staggerTo(bulletPointFills, 0.1, { scale: 0 , ease: Power1.easeOut}, 0.1)
			TweenMax.staggerTo(bulletChainFills, 0.1, { scale: 0 , ease: Power0.easeOut}, 0.1)
			TweenMax.staggerTo(bulletPoint, 0.1, { borderWidth: '3px' , ease: Power0.easeOut}, 0.1)
		}
		this.currentWindow = windowIndex
	}
}