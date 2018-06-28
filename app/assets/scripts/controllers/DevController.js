import GraphCanvas from '../modules/GraphCanvas'
import Parallax from '../modules/Parallax';
import ScrollBar from '../modules/ScrollBar'
import MuteWindow from '../modules/MuteWindow'

export default class DevController
{
    init()
    {
        // new GraphCanvas('dev', 'assets/images/favelas/wall.jpeg', 'assets/images/favelas/wark.png', 'assets/images/favelas/warkBlend.png')
        // new Parallax('graph__wrapper', 1, true)
        // new ScrollBar(7, 'dev', '80', '15')
        new ScrollBar(['window1', 'window2', 'window3', 'window4', 'window5'], 'dev', '60', '20')
        new MuteWindow('.dev')
    }
}