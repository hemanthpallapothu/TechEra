import {Switch, BrowserRouter, Route} from 'react-router-dom'
import TechEra from './components/TechEra'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TechEra} />
    </Switch>
  </BrowserRouter>
)

export default App
