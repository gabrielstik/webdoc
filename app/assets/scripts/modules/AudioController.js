export default class AudioController
{
    constructor(audio)
    {
        this.audio = audio
        this.once = [true, true]
    }
    fadeOutPause(duration)
    {
        if(this.once[0]){ this.audio.volume = 1 }

        this.once[0] = false

        this.audio.volume -= 0.025

        if(this.audio.volume > 0.025)
        {
            setTimeout(() => {
                this.fadeOutPause(duration)
            }, duration / 40)
        }
        else
        {
            this.audio.volume = 0
            // this.audio.pause()
            this.once[0] = true
        }
    }
    fadeInPlay(duration)
    {
        console.log('play')
        if(this.once[1])
        { 
            this.audio.volume = 0 
            console.log('PLAY')
            this.audio.play()
        }

        this.once[1] = false

        this.audio.volume += 0.025

        if(this.audio.volume < 0.975)
        {
            setTimeout(() => {
                this.fadeInPlay(duration)
            }, duration / 40)
        }
        else
        {
            this.audio.volume = 1
            this.once[1] = true
        }
    }
    fadeOutEnding(duration)
    {
        setTimeout(() => 
        {
            console.log(this.audio.currentTime)
            if(this.audio.currentTime >= this.audio.duration - (duration / 1000))
            {
                console.log('il reste ' + duration + ' sec')
                this.fadeOutPause(duration)
            }
            else
            {
                this.fadeOutEnding(duration)
            }
        }, 50)
    }
    loop(fadeDuration)
    {
        this.fadeInPlay(fadeDuration)
        this.fadeOutEnding(fadeDuration)

        this.audio.addEventListener('ended', () => 
        {
            this.audio.currentTime = 0

            this.fadeInPlay(fadeDuration)
            this.fadeOutEnding(fadeDuration)
        })
    }
}