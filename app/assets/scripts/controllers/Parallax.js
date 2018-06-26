export default class Parallax
{
    constructor(elementClass, amplitude, rotation = false)
    {
        const item = 
        {
            element: document.querySelector('.' + elementClass),
            offsetX: 0,
            offsetY: 0,
        }

        this.mouse = 
        {
            x: 0,
            y: 0,
        }

        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight

        window.addEventListener('resize', () => {
            windowWidth = window.innerWidth
            windowHeight = window.innerHeight
        })

        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / windowWidth - 0.5
            this.mouse.y = event.clientY / windowHeight - 0.5
        })

        this.rotation = rotation

        this.init(item, amplitude)
    }
    init(item, amplitude)
    {
        window.requestAnimationFrame(this.init.bind(this, item, amplitude))

        const offsetX = - this.mouse.x * amplitude
        const offsetY = - this.mouse.y * amplitude

        // Easing
        item.offsetY += (offsetY - item.offsetY) * 0.05
        item.offsetX += (offsetX - item.offsetX) * 0.05
        
        const roundedOffsetX = Math.round(item.offsetX * 100) / 100
        const roundedOffsetY = Math.round(item.offsetY * 100) / 100

        this.rotation ?
            item.element.style.transform = `scale(1.1) rotateX(${roundedOffsetY * 2}deg) rotateY(${roundedOffsetX}deg) translateX(${- roundedOffsetX * 4}px) translateY(${- roundedOffsetY * 8}px)`
            : item.element.style.transform = `translateX(${- roundedOffsetX * 4}px) translateY(${- roundedOffsetY * 8}px)`
    }
}
