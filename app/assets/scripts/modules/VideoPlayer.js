export default class VideoPlayer
{
  /**
   * 
   * @param {div} wrapperClass - wrapper of video
   * @param {path} videoUrl - path to load video
   */

	constructor(wrapperClass, videoUrl, videoTitle)
	{
    // Select container
    const wrapper = document.querySelector('.' + wrapperClass)

    // Create DOM element & class & attributes
    this.videoContainer = document.createElement('div')
    this.videoContainer.classList.add('videoPlayer')

		// Set class & attribute of video
    this.video = document.createElement('video')
		this.video.classList.add('videoPlayer__video')
		this.video.setAttribute('src', videoUrl)

		// Set timeline & timelineFill
		this.timeline = document.createElement('div')
		this.timelineFill = document.createElement('div')

		// Set play icon
		this.playIcon = document.createElement('div')
		this.playIcon.classList.add('videoPlayer__playIcon')

		// Set pause icon
		this.pauseIcon = 
		{
			container: document.createElement('div'),
			barLeft: document.createElement('div'),
			barRight: document.createElement('div'),
		}

		this.gradient = document.createElement('div')
		this.videoTitle = document.createElement('h3')

		// Set pause icon elements class
		this.pauseIcon.container.classList.add('videoPlayer__pauseIcon')
		this.pauseIcon.barLeft.classList.add('videoPlayer__pauseBar')
		this.pauseIcon.barRight.classList.add('videoPlayer__pauseBar')

		this.gradient.classList.add('videoPlayer__gradient')
		this.videoTitle.classList.add('videoPlayer__title')

		this.videoTitle.innerHTML = videoTitle

		// Push pause bar into pause icon
		this.pauseIcon.container.appendChild(this.pauseIcon.barLeft)
		this.pauseIcon.container.appendChild(this.pauseIcon.barRight)

		this.video.addEventListener('loadedmetadata', () => {
			this.videoDuration = this.video.duration

			// Init methods
			this.init()
		})

    // Inject in container
		this.videoContainer.appendChild(this.video)
		this.videoContainer.appendChild(this.gradient)
		this.videoContainer.appendChild(this.videoTitle)
    this.videoContainer.appendChild(this.playIcon)
		this.videoContainer.appendChild(this.pauseIcon.container)
		
		wrapper.appendChild(this.videoContainer)

		// Play or pause video when click on video
		this.video.addEventListener('click', () => { this.video.paused ? this.playVideo() : this.pauseVideo() })

		// Listen timeline events to update currentTime and timeline style
		this.timeline.addEventListener('mousedown', () => 
		{ 
			// State of mouseup
			let mouseUp = false

			// Mouse move on window
			window.addEventListener('mousemove', (event) => 
			{
				// Update current time on mouseup
				if(!mouseUp) { this.updateCurrentTime(event) }

			})
			// Mouse set at true when mouseup on window
			window.addEventListener('mouseup', () => 
			{
				mouseUp = true
			})
		})

		// Update current time of video
		this.timeline.addEventListener('click', (event) => 
		{
			this.updateCurrentTime(event)
		})

		this.videoContainer.addEventListener('mousemove', () => 
		{
			this.gradient.style.opacity = '1'
			this.videoTitle.style.opacity = '1'
			this.timeline.style.height = '14px'
			this.videoContainer.style.cursor = 'default'
			

			setTimeout(() => 
			{
				this.gradient.style.opacity = '0'
				this.videoTitle.style.opacity = '0'
				this.timeline.style.height = '4px'
				this.videoContainer.style.cursor = 'none'
			}, 5000)
		})
  }

  init()
  {
    // Create timeline DOM
    this.timeline.classList.add('videoPlayer__timeline')

    // Create timelineFill DOM
    this.timelineFill.classList.add('videoPlayer__timelineFill')

    // AppendChild timeline into videoContainer
    this.timeline.appendChild(this.timelineFill)
		this.videoContainer.appendChild(this.timeline)
		
		// Update timeline style
		this.updateTimeline()
	}
	
	updateTimeline()
	{
		// Set animation frame
		const animationFrame = window.requestAnimationFrame(this.updateTimeline.bind(this, this.timelineFill))

		// Set scaleX of timeline
		this.timelineFill.style.transform = `scaleX(${this.video.currentTime / this.videoDuration})`

		// Cancel aniamtionFrame when video in ending
		if(this.video.currentTime == this.videoDuration)
		{ 
			this.resetVideo()
			this.resetTimeline()
			this.playVideo()
			this.init()
			window.cancelAnimationFrame(animationFrame) 
		}
	}

	updateCurrentTime(event)
	{
		this.video.currentTime = event.clientX / this.timeline.offsetWidth * this.video.duration
	}

  playVideo()
  {
		this.playIcon.style.opacity = '1'
		setTimeout(() => { this.playIcon.style.opacity = '0' }, 200)

    // play video
		this.video.play()
		
  }
  
  pauseVideo()
  {
		this.pauseIcon.container.style.opacity = '1'
		setTimeout(() => { this.pauseIcon.container.style.opacity = '0' }, 200)

    // pause video
		this.video.pause()

	}

	resetVideo()
	{
		this.video.currentTime = 0
	}

	resetTimeline()
	{
		this.timelineFill.style.transform = `scaleX(0)`
  }
  getVideoDOM()
  {
    return this.videoContainer
  }
}