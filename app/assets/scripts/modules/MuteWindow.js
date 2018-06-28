export default class MuteWindow
{
    constructor(containerClass, audiosArray = [], muteIconSrc, unMuteIconSrc)
    {
        this.videos = document.querySelectorAll('.videoPlayer__video')
        console.log(this.videos)
        this.audios = audiosArray

        let muted = false

        const container = document.querySelector(containerClass)

        this.muteButton = document.createElement('div')
        this.muteButton.classList.add('muteWindowButton')

        this.muteIcon = document.createElement('img')
        this.unMuteIcon = document.createElement('img')

        this.muteIcon.setAttribute('src', muteIconSrc)
        this.unMuteIcon.setAttribute('src', unMuteIconSrc)

        this.muteIcon.style.width = '100%'
        this.unMuteIcon.style.width = '100%'

        this.unMuteIcon.style.position = 'absolute'

        this.muteButton.appendChild(this.muteIcon)
        this.muteButton.appendChild(this.unMuteIcon)

        this.muteButton.style.width = '50px'
        this.muteButton.style.height = '50px'
        this.muteButton.style.background = 'blue'
        this.muteButton.style.position = "fixed"
        this.muteButton.style.bottom = '20px'
        this.muteButton.style.right = '20px'
        this.muteButton.style.cursor = 'pointer'
        this.muteButton.style.display = 'flex'
        this.muteButton.style.justifyContent = 'center'
        this.muteButton.style.alignItems = 'center'

        container.appendChild(this.muteButton)

        this.muteButton.addEventListener('click', () => 
        {
            muted ? muted = false : muted = true
            muted ? this.muteAll() : this.unMuteAll()
        })
    }
    muteAll()
    {
        TweenMax.to(this.muteButton, 0.3, { rotation : 90 })

        for(const video of this.videos)
        {
            video.muted = true
        }
        for(const audio of this.audios)
        {
            audio.muted = true
        }
    }
    unMuteAll()
    {
        TweenMax.to(this.muteButton, 0.3, { rotation : -90 })

        for(const video of this.videos)
        {
            video.muted = false
        }
        for(const audio of this.audios)
        {
            audio.muted = false
        }
    }
}