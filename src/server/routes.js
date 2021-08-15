import setupApiRoutes from './route/api'
import ReactApp from './route/app'

export default (app) => {
  setupApiRoutes(app)

  app.get('*', ReactApp)
}
