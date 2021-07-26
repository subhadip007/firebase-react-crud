import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Crud from './components/Crud.jsx'
import DelBatch from './components/delBatch'

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Crud} />
        <Route path='/delete' exact component={DelBatch} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
