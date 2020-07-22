import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Explore from './Explore'
import Me from './Me'
import UserPage from './UserPage'
import EventCreation from './EventCreation'
import EventComment from './EventComment'
import CommentCreate from './CommentCreate'
import CommentEdit from './CommentEdit'
import CommentReply from './CommentReply'
import Authorize from './Authorize'
import AuthInfoProvider from './AuthInfoProvider'

function App () {
  return (
    <AuthInfoProvider>
      <Router>
        <Switch>
          <Route path='/explore' exact component={Explore} />
          <Route path='/me' exact component={Me} />
          <Route path='/user/:uid' exact component={UserPage} />
          <Route path='/event/new' exact component={EventCreation} />
          <Route path='/event/:id/comment' exact component={EventComment} />
          <Route
            path='/event/:id/comment/:cid/edit'
            exact
            component={CommentEdit}
          />
          <Route
            path='/event/:id/comment/:cid/reply'
            exact
            component={CommentReply}
          />
          <Route
            path='/event/:id/comment/new'
            exact
            component={CommentCreate}
          />
          <Route path='/authorize' exact component={Authorize} />
          <Redirect to='/explore' />
        </Switch>
      </Router>
    </AuthInfoProvider>
  )
}

export default App
