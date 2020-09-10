import Page from './page'
import Grid from './grid'
import Teaser from './teaser'
import Feature from './feature'
import ComponentNotFound from './component_not_found'
import TheQuestion from '../../src/ts/TheQuestion'
const ComponentList = {
  page: Page,
  grid: Grid,
  teaser: Teaser,
  feature: Feature,
  theQuestion: TheQuestion
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
