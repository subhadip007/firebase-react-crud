import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Crud from './components/Crud.jsx'
import DelBatch from './components/delBatch'
import ReadDelete from './components/readDelete.jsx'

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Crud} />
        <Route path='/delete' exact component={DelBatch} />
        <Route path='/update' exact component={ReadDelete} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
