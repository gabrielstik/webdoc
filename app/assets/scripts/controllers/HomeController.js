import VideoPlayer from '../modules/VideoPlayer'
import Parallax from './Parallax'

export default class HomeController {

  constructor() {
    console.log('ok')
  }

  init() {
    new VideoPlayer('video', '../assets/medias/minions.mp4', 'Compton NWA')
    new Parallax('video', 10, true)
  }
}