import AudioController from "./AudioController"

export default class ImageMusic
{
    constructor(imageContainerClass, audio)
    {
        const imageContainer = document.querySelector(imageContainerClass)
        imageContainer.style.cursor = 'pointer'

        const image = document.querySelector(imageContainerClass + '> img')
        const audioController = new AudioController(audio)

        imageContainer.addEventListener('mouseenter', () => 
        {
            audioController.fadeInPlay(3000)

            TweenMax.to(image, 1, { scale: 1.1 })
        })
        imageContainer.addEventListener('mouseleave', () => 
        {
            audioController.fadeOutPause(2000)
            TweenMax.to(image, 1, { scale: 1 })
        })
    }
}