export default class VideoPlayer
{
  /**
   * 
   * @param {div} wrapperClass - wrapper of video
   * @param {path} videoUrl - path to load video
   */
  
  constructor(wrapperClass, videoUrl)
  {
    // Select container
    const wrapper = document.querySelector('.' + wrapperClass)

    // Create DOM element & class & attributes
    const videoContainer = document.createElement('div')
    videoContainer.classList.add('videoPlayer')

    this.video = document.createElement('video')
    this.video.setAttribute('src', videoUrl)

    // Inject in container
    videoContainer.appendChild(this.video)
    wrapper.appendChild(videoContainer)

    // Click event to play()
    document.addEventListener('click', () => { this.video.play() }, { once : true })

    // Init method
    this.init(videoContainer)
  }

  init(videoContainer)
  {
    // Create timeline DOM
    const timeline = document.createElement('div')
    timeline.classList.add('videoPlayer__timeline')

    // Create timelineFill DOM
    const timelineFill = document.createElement('div')
    timelineFill.classList.add('videoPlayer__timelineFill')

    // AppendChild timeline into videoContainer
    timeline.appendChild(timelineFill)
    videoContainer.appendChild(timeline)
  }

  play()
  {
    // play video
    this.video.play()
  }
  
  pause()
  {
    // pause video
    this.video.pause()
  }
}