import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Crud from './components/Crud.jsx'
import DBatch from './components/delBatch'
import RUDSingle from './components/readDelete.jsx'

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Crud} />
        <Route path='/delete' exact component={DBatch} />
        <Route path='/update' exact component={RUDSingle} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
