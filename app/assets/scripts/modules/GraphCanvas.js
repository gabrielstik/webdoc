export default class GraphCanvas
{
    constructor(wrapperClass)
    {
        this.container = document.querySelector('.' + wrapperClass)
        this.container.style.position = 'relative'

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
        this.canvas.addEventListener('mousedown', () => 
        {
            this.canvas.addEventListener('mousemove', () => 
            {
                this.clearCanvas()
            })
        })
        this.init()
    }
    init()
    {
        this.context.fillStyle = 'red'
        this.context.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight)
    }
    clearCanvas()
    {
        console.log('x ' + this.mouse.x)
        console.log('y ' + this.mouse.y)
        this.context.clearRect(this.mouse.x, this.mouse.y, 1, 1)
    }
}