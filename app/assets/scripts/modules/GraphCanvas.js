export default class GraphCanvas
{
    constructor(wrapperClass)
    {
        this.container = document.querySelector('.' + warpperClass)

        this.canvas = document.createElement('canvas')
        this.canvas.classList.add('graphCanvas')
        this.context = this.canvas.getContext('2d')

        this.container.appendChild(this.canvas)

        this.mouse = 
        {
            x: 0,
            y: 0,
        }

        this.canvas.addEventListener('mousemove', (event) => 
        {
            this.mouse.x = event.clientX
            this.mouse.y = event.clientY
        })
    }
    init()
    {
        this.context.fillStyle = 'red'
        this.context.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight)
    }
}