import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Inbox from '../features/Shared/Pages/Inbox'

function SharedRoutes() {
  return (
    <Route element={<ProtectedRoute allowedRoles={["patient","doctor"]} />}>
        <Route path='/inbox/' element={<Inbox/>} />   
        <Route path='/inbox/:id' element={<Inbox/>} />
    </Route>
  )
}

export default SharedRoutes