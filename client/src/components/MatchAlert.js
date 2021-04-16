import { Button } from '@material-ui/core'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function MatchAlert() {
  const history = useHistory();

  return (
    <div className="matchAlert">
      <h1>You've found a new friend!</h1>
      <Link to="/chats">
        <Button>
           Let's Chat!
    </Button>
      </Link>
      <Button onClick={(e) => history.goBack()} >
        Keep Swiping!
    </Button>
    </div>
  )
}
