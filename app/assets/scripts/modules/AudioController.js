export default class AudioController
{
    constructor(audio, volume = 1)
    {
        this.audio = audio
        this.volume = volume
        this.once = [true, true, true]
        this.stopLoop = false
        this.isLoop = false
    }
    fadeOutPause(duration)
    {
        if(this.once[0] && this.audio.volume <= 0.25){ this.audio.volume = 0.25 }

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

            if(!this.isLoop) this.audio.pause()
            
            this.once[0] = true
        }
    }
    fadeInPlay(duration)
    {
        if(this.once[1])
        { 
            this.audio.volume = 0 
            this.audio.play()
        }

        this.once[1] = false

        this.audio.volume += 0.025

        if(this.audio.volume < this.volume - 0.025)
        {
            setTimeout(() => {
                this.fadeInPlay(duration)
            }, duration / 40)
        }
        else
        {
            this.audio.volume = this.volume
            this.once[1] = true
        }
    }
    fadeOutEnding(duration, loop)
    {
        setTimeout(() => 
        {
            if(this.audio.currentTime >= this.audio.duration - (duration / 1000))
            {
                this.fadeOutPause(duration, loop)
            }
            else
            {
                this.fadeOutEnding(duration)
            }
        }, 50)
    }
    loop(fadeDuration)
    {
        if(this.once[2])
        { 
            this.isLoop = true
            this.audio.play()
        }

        this.once[2] = false
        
        this.fadeInPlay(fadeDuration)
        this.fadeOutEnding(fadeDuration)

        this.audio.addEventListener('ended', () => 
        {
            if(this.isLoop) 
            {
                    this.audio.currentTime = 0
        
                    this.fadeInPlay(fadeDuration)
                    this.fadeOutEnding(fadeDuration)
            }
            else
            {
                this.audio.pause()
                this.once[2] = true
            }
        })
        
    }
    removeLoop()
    {
        this.isLoop = false
    }
    pauseSound()
    {
        this.audio.pause()
    }
}