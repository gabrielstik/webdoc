export default class GraphCanvas
{
    constructor(wrapperClass, imageSrc)
    {
        this.container = document.querySelector('.' + wrapperClass)
        this.container.style.position = 'relative'

        this.image = document.createElement('img')
        this.image.setAttribute('src', imageSrc)
        this.image.classList.add('graph__image')
        // this.image.style.width = this.container.offsetWidth + 'px'
        // this.image.style.height = this.container.offsetHeight + 'px'
        this.container.appendChild(this.image)

        this.text = document.createElement('div')
        this.text.classList.add('graph__text')
        this.text.innerHTML = 'COUCOU LES COPAINS ÇA VA MOI ÇA VA SUPER BIEN'
        this.container.appendChild(this.text)

        this.canvas = document.createElement('canvas')
        this.canvas.classList.add('graphCanvas')

        this.canvas.width = this.container.offsetWidth 
        this.canvas.height = this.container.offsetHeight
        this.canvas.style.objectFit = 'cover'

        this.context = this.canvas.getContext('2d')

        this.container.appendChild(this.canvas)

        this.mouse = 
        {
            x: 0,
            y: 0,
        }

        this.oldWidth = this.container.offsetWidth
        this.oldHeight = this.container.offsetWidth

        window.addEventListener('resize', () => 
        {
            this.canvas.width = this.container.offsetWidth
            this.canvas.height = this.container.offsetHeight
            this.context.drawImage(this.image, 0, 110 * this.container.offsetWidth / this.oldWidth, this.image.naturalWidth, this.image.naturalHeight, 0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight + 210)
            this.oldWidth = this.container.offsetWidth
        })

        this.canvas.addEventListener('mousemove', (event) => 
        {
            this.mouse.x = event.clientX
            this.mouse.y = event.clientY
        })

        window.addEventListener('mousedown', () => 
        {
            let mouseUp = false
            this.canvas.addEventListener('mousemove', () => 
            {
                if(!mouseUp) { this.clearCanvas() }

            })
            window.addEventListener('mouseup', () => 
            {
                mouseUp = true
            })
        })

        this.image.addEventListener('load', () => { this.init() })        
    }
    init()
    {
        console.log('init')
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