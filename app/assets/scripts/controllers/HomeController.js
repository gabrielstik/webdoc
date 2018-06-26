import VideoPlayer from '../modules/VideoPlayer'

export default class HomeController {

  constructor() {
    console.log('ok')
  }

  init() {
    new VideoPlayer('video', '../assets/medias/minions.mp4', 'Campton NWA')
  }
}