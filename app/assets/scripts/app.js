import Router from './modules/Router'
import VideoPlayer from './modules/VideoPlayer'
import HomeController from './controllers/HomeController'
import MapController from './controllers/MapController'

const controllers = {
  home: new HomeController()
}  
new Router(controllers)