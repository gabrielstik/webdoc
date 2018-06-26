import Router from './modules/Router'
import VideoPlayer from './modules/VideoPlayer'
import HomeController from './controllers/HomeController'

const controllers = {
  home: new HomeController()
}  
new Router(controllers)