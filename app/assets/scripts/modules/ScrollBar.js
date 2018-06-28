export default class ScrollBar {
	constructor(windowsTitle, containerClass, scrollHeight, bulletPointDiametre) {
		this.bulletPointFills = []
		this.bulletChainFills = []
		this.bulletPoints = []
		this.bulletTitles = []
		this.timeline = new TimelineMax()

		const scrollBarContainer = document.querySelector(containerClass)

		this.former = null
		this.updateScrollCount = 0
		this.oldWindow = 0
		this.currentWindow = 0

		const scrollBarWrapper = document.createElement('div')
		scrollBarWrapper.classList.add('scrollBar')
		scrollBarWrapper.style.height = scrollHeight + 'vh'

		const chainHeight = Math.round((scrollHeight * window.innerHeight / 100) / (windowsTitle.length - 1) - (bulletPointDiametre / (windowsTitle.length)) - ((bulletPointDiametre / 2) / (windowsTitle.length * 2)))

		for (let i = 0; i < windowsTitle.length; i++) {
			const bulletPoint = document.createElement('div')
			const bulletPointFill = document.createElement('div')
			const bulletChain = document.createElement('div')
			const bulletChainFill = document.createElement('div')
			const bulletTitle = document.createElement('div')
			bulletTitle.innerHTML = windowsTitle[i]
			
			bulletPoint.classList.add('scrollBar__bulletPoint')
			bulletPointFill.classList.add('scrollBar__bulletPointFill')
			bulletChain.classList.add('scrollBar__bulletChain')
			bulletChainFill.classList.add('scrollBar__bulletChainFill')
			bulletTitle.classList.add('scrollBar__bulletTitle')

			bulletChain.style.height = chainHeight + 'px'
			bulletPoint.style.height = bulletPointDiametre + 'px'
			bulletPoint.style.width = bulletPointDiametre + 'px'

			bulletPoint.appendChild(bulletPointFill)
			bulletChain.appendChild(bulletChainFill)
			bulletPoint.appendChild(bulletTitle)

			this.bulletChainFills.push(bulletChainFill)
			this.bulletPointFills.push(bulletPointFill)
			this.bulletPoints.push(bulletPoint)
			this.bulletTitles.push(bulletTitle)

			if (i == 0) {
				bulletPoint.classList.add('scrollBar__bulletPoint--first')
				scrollBarWrapper.appendChild(bulletPoint)
				bulletPoint.appendChild(bulletChain)
			}
			else if (i == windowsTitle.length.length - 1) {
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

		this.once = [true, true]

		for(const [index, bulletPoint] of this.bulletPoints.entries())
		{

			bulletPoint.addEventListener('click', () => 
			{
				if(this.once[0]) 
				{ 
          this.index = index
					this.updateScroll(index) 
<<<<<<< HEAD
          this.getWindowNumber()
          this.currentWindow = index
=======
					this.getWindowNumber()
					this.currentWindow = index
>>>>>>> hoverSpeak
				}
				this.once[0] = false

				window.addEventListener('mouseup', () => 
				{
					this.once[0] = true
				})
			})

		}
		for(const [index, bulletPoint] of this.bulletPoints.entries())
		{
			bulletPoint.addEventListener('mouseover', () => 
			{
				if(this.once[1]) 
				{ 
					TweenMax.to(this.bulletTitles[index], 0.3, { opacity : 1, x: '30%' }) 
				}

				this.once[1] = false

				bulletPoint.addEventListener('mouseleave', () => 
				{
					TweenMax.to(this.bulletTitles[index], 0.3, { opacity : 0, x: '0%' })
					this.once[1] = true
				})
				bulletPoint.addEventListener('click', () => 
				{
					TweenMax.to(this.bulletTitles[index], 0.3, { opacity : 0, x: '0%' })
					this.once[1] = false
				})
			})
		}
	}

	updateScroll(windowIndex)
	{
		const bulletPointFills = [] 
		const bulletChainFills = [] 
		const bulletPoint = []

		if(windowIndex == 0 && this.oldWindow == windowIndex)
		{
			TweenMax.to(this.bulletPointFills[0], 0.1, { scale: 1 , ease: Power1.easeOut}, 0.1)
			TweenMax.to(this.bulletPoints[0], 0.1, { borderWidth: '0px', ease: Power1.easeOut}, 0.1)
		}
		else if(windowIndex < this.bulletPointFills.length && this.oldWindow < windowIndex)
		{
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
		else if(windowIndex < this.bulletPointFills.length && this.oldWindow > windowIndex)
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

		if(this.oldWindow < windowIndex)
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
		this.oldWindow = windowIndex
	}
	
	getWindowNumber()
	{
<<<<<<< HEAD
		return this.oldWindow
=======
		console.log(this.oldWindow)
>>>>>>> hoverSpeak
	}
}