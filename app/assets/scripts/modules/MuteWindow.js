export default class MuteWindow
{
    constructor(containerClass, audiosArray = [], muteIconSrc, unMuteIconSrc = null)
    {
        this.videos = null

        this.tryCatchVideo()

        this.audios = audiosArray

        let muted = false

        const container = document.querySelector(containerClass)

        this.muteButton = document.createElement('div')
        this.muteButton.classList.add('muteWindowButton')

        this.muteIcon = document.createElement('img')
        this.unMuteIcon = document.createElement('img')

        this.muteIcon.setAttribute('src', muteIconSrc)
        // this.unMuteIcon.setAttribute('src', unMuteIconSrc)

        this.muteIcon.style.width = '100%'
        // this.unMuteIcon.style.width = '100%'

        // this.unMuteIcon.style.position = 'absolute'

        this.muteButton.appendChild(this.muteIcon)
        this.muteButton.appendChild(this.unMuteIcon)

        this.muteButton.style.width = '50px'
        this.muteButton.style.height = '50px'
        this.muteButton.style.position = "fixed"
        this.muteButton.style.bottom = '20px'
        this.muteButton.style.right = '20px'
        this.muteButton.style.cursor = 'pointer'
        this.muteButton.style.display = 'flex'
        this.muteButton.style.justifyContent = 'center'
        this.muteButton.style.alignItems = 'baseline'

        container.appendChild(this.muteButton)

        this.muteButton.addEventListener('click', () => 
        {
            muted ? muted = false : muted = true
            muted ? this.muteAll() : this.unMuteAll()
        })
    }
    muteAll()
    {
        TweenMax.to(this.muteButton, 0.3, { opacity: 0.4 })
        TweenMax.from(this.muteButton, 1, { scale: 1.1, ease: Elastic.easeOut })

        for(const video of this.videos)
        {
            video.muted = true
        }
        for(const audio of this.audios)
        {
            audio.muted = true
        }
    }
    tryCatchVideo()
    {
        const videos = document.querySelectorAll('video')

        setTimeout(() => {

            if(videos.length < 1) 
            { 
                this.tryCatchVideo()
            }
            else
            {
                this.videos = videos
            }
        }, 50)

    }
    unMuteAll()
    {
        TweenMax.to(this.muteButton, 0.3, { opacity: 1 })
        TweenMax.from(this.muteButton, 1, { scale: 1.1, ease: Elastic.easeOut })

        for(const video of this.videos)
        {
            video.muted = false
        }
        for(const audio of this.audios)
        {
            audio.muted = false
        }
    }
    pauseAll()
    {
        for(const video of this.videos)
        {
            video.pause()
        }
        for(const audio of this.audios)
        {
            audio.pause()
        }
    }
}