import Router from './modules/Router'
import VideoPlayer from './modules/VideoPlayer'
import HomeController from './controllers/HomeController'
import MapController from './controllers/MapController'
import StoryController from './controllers/StoryController'
import DevController from './controllers/DevController'

const controllers = {
  home: new HomeController(),
  story: new StoryController(),
  dev: new DevController()
}  
new Router(controllers)