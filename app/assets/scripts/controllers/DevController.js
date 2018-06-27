import GraphCanvas from '../modules/GraphCanvas'
import Parallax from '../modules/Parallax';
<<<<<<< HEAD
=======
import ScrollBar from '../modules/ScrollBar'
>>>>>>> ScrollBar

export default class DevController
{
    init()
    {
<<<<<<< HEAD
        new GraphCanvas('dev', 'assets/images/favelas/wall.jpeg', 'assets/images/favelas/wark.png', 'assets/images/favelas/warkBlend.png')
        new Parallax('graph__wrapper', 1, true)
=======
        // new GraphCanvas('dev', 'assets/images/favelas/wall.jpeg', 'assets/images/favelas/wark.png', 'assets/images/favelas/warkBlend.png')
        // new Parallax('graph__wrapper', 1, true)
        new ScrollBar(7, 'dev')
>>>>>>> ScrollBar
    }
}