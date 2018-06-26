import Router from './modules/Router'
import VideoPlayer from './modules/VideoPlayer'
import HomeController from './controllers/HomeController'
import MapController from './controllers/MapController'
import StoryController from './controllers/StoryController'

const controllers = {
  home: new HomeController(),
  story: new StoryController(),
  map: new MapController(),
}  
new Router(controllers)
