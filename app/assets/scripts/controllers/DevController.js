import GraphCanvas from '../modules/GraphCanvas'
import Parallax from '../modules/Parallax';

export default class DevController
{
    init()
    {
        new GraphCanvas('dev', 'assets/images/favelas/wall.jpeg', 'assets/images/favelas/wark.png', 'assets/images/favelas/warkBlend.png')
        new Parallax('graph__wrapper', 1, true)
    }
}