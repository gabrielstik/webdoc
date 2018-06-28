import GraphCanvas from '../modules/GraphCanvas'
import Parallax from '../modules/Parallax'
import ScrollBar from '../modules/ScrollBar'
import MuteWindow from '../modules/MuteWindow'
import AudioController from '../modules/AudioController'

export default class DevController
{
    init()
    {
        const audio = new Audio('assets/medias/djeuns-2.m4a')
        const fade = new AudioController(audio)

        window.addEventListener('click', () => 
        {
            fade.loop(3000)

            window.addEventListener('click', () => 
            {
                fade.fadeOutPause(3000)

                setTimeout(() => {
                    fade.fadeInPlay(3000)
            
                }, 5000);

            
            })
        })
        // new GraphCanvas('dev', 'assets/images/favelas/wall.jpeg', 'assets/images/favelas/wark.png', 'assets/images/favelas/warkBlend.png')
        // new Parallax('graph__wrapper', 1, true)
        // new ScrollBar(7, 'dev', '80', '15')
        new ScrollBar(['window1', 'window2', 'window3', 'window4', 'window5'], 'dev', '60', '20')
        new MuteWindow('.dev')
    }
}