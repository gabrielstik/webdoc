import AudioController from '../modules/AudioController'

export default class GraphCanvas
{
    constructor(wrapperClass, imageSrc, discoverImageSrc, discoverImageBlendSrc, ctaQuote)
    {
        this.spraySound = new Audio('assets/medias/favelas/spray.mp3')
        this.sprayShake = new Audio('assets/medias/favelas/shake_spray.wav')

        this.spraying = false

        this.container = document.querySelector('.' + wrapperClass)
        this.container.style.position = 'relative'

        this.wrapper = document.createElement('div')
        this.wrapper.classList.add('graph__wrapper')
        this.wrapper.style.overflow = 'hidden'
        this.wrapper.style.width = '100vw'
        this.wrapper.style.height = '100vh'
        this.container.appendChild(this.wrapper)

        this.image = document.createElement('img')
        this.image.setAttribute('src', imageSrc)
        this.image.classList.add('graph__image')

        this.image.style.opacity = '0.4'
        this.wrapper.appendChild(this.image)

        this.discover = document.createElement('img')
        this.discover.setAttribute('src', discoverImageSrc)
        this.discover.classList.add('graph__discover')
        // this.discover.innerHTML = 'COUCOU LES COPAINS ÇA VA MOI ÇA VA SUPER BIEN'
        this.ctaSentence = document.createElement('div')
        this.ctaSentence.classList.add('graph__cta')
        this.ctaSentence.innerHTML = ctaQuote

        this.cta = document.createElement('div')
        this.cta.classList.add('cta')
        this.ctaRing = document.createElement('div')
        this.ctaRing.classList.add('cta__ring')
        this.cta.appendChild(this.ctaRing)

        this.wrapper.appendChild(this.discover)

        this.discoverBlendMode = document.createElement('img')
        this.discoverBlendMode.setAttribute('src', discoverImageBlendSrc)
        this.discoverBlendMode.classList.add('graph__discoverBlend')
        // this.discover.innerHTML = 'COUCOU LES COPAINS ÇA VA MOI ÇA VA SUPER BIEN'
        this.wrapper.appendChild(this.discoverBlendMode)
        
        this.canvas = document.createElement('canvas')
        this.canvas.classList.add('graphCanvas')
        
        this.canvas.width = this.container.offsetWidth 
        this.canvas.height = this.container.offsetHeight
        this.canvas.style.objectFit = 'cover'
        
        this.context = this.canvas.getContext('2d')
        
        this.wrapper.appendChild(this.canvas)
        this.wrapper.appendChild(this.ctaSentence)
        this.ctaSentence.appendChild(this.cta)

        this.mouse = 
        {
            x: 0,
            y: 0,
        }

        this.oldWidth = this.container.offsetWidth
        this.oldHeight = this.container.offsetWidth

        this.canvas.addEventListener('mousemove', (event) => 
        {
            this.mouse.x = event.clientX
            this.mouse.y = event.clientY
        })

        this.count = 0
        this.once = true
        this.siren = new Audio('assets/medias/siren.wav')
        this.sirenController = new AudioController(this.siren)

        window.addEventListener('mousedown', (event) => 
        {
            if(event.which == 1)
            {
                let mouseUp = false
                if(!mouseUp && this.spraying) { this.clearCanvas() }
    
                this.canvas.addEventListener('mousemove', () => 
                {
                    if(!mouseUp && this.spraying) 
                    { 
                        this.clearCanvas() 
                        this.count++
                        
                        if(this.count >= 50 && this.once)
                        {
                            this.once = false
                            this.siren.currentTime = 0
                            this.siren.volume = 0.5
                            this.siren.play()

                            setTimeout(() => 
                            {
                                this.sirenController.fadeOutPause(5000)
                            }, 3000)
                        }
                    }
    
                })
                window.addEventListener('mouseup', () => 
                {
                    mouseUp = true
                })
            }
        })

        this.image.addEventListener('load', () => { this.init() })     
        
        this.wrapper.addEventListener('mousedown', (event) => 
        {
            if(event.which == 1)
            {
                
                TweenMax.to(this.ctaSentence, 0.15, { opacity : 0 }, 0.3)

                this.randomDuration = Math.random() * (4000 - 2000) + 2000
                this.randomPlaying = Math.round(Math.random() * 2)

                this.spraying = true

                this.sprayShake.pause()
                this.spraySound.play()

                document.addEventListener('mouseup', () => 
                {

                    this.spraySound.pause()
                    this.spraySound.currentTime = Math.random() * 3

                    if(this.randomPlaying == 1) { this.sprayShake.currentTime = Math.random() * 6 }
                    if(this.randomPlaying == 1) { this.sprayShake.play() }

                    setTimeout(() => {
                        this.sprayShake.pause()
                    }, this.randomDuration);
                })
                this.spraySound.addEventListener('ended', () => { this.spraying = false })
            }
        })
    }
    init()
    {
        // this.context.drawImage(this.image, 0, 120, this.image.naturalWidth, this.image.naturalHeight - 200, 0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight )
        this.context.drawImage(this.image, 0, 120, this.image.naturalWidth, this.image.naturalHeight - 200, 0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight )
    }
    clearCanvas()
    {
        this.context.globalCompositeOperation = 'destination-out'

        for(let i = 0; i < 3000; i++)
        {
            const t = 2 * Math.PI * Math.random()
            const r = Math.sqrt(Math.random() * 10000)
            const x = r * Math.cos(t)
            const y = r * Math.sin(t)
            const p = Math.random() * 2

            this.context.beginPath()
            this.context.arc(this.mouse.x + x, this.mouse.y + y, p, 0, Math.PI * 2)
            
            if(r < 70) 
            { 
                this.context.fill()
            }
            else if(i % 6 == 0 && r < 80)
            {
                this.context.fill()
            }
            else if(i % 12 == 0 && r < 100)
            {
                this.context.fill()
            }
            this.context.closePath()
        }
        
    }
}