import { Button } from '@material-ui/core'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function MatchAlert({matchAlert}) {
  const history = useHistory();

  return (
    <div className="matchAlert">
      <div className="matchAlert__text">
      <h1>You've found a new friend!</h1>
      </div>
      <div className="matchAlert__Buttons">
      <Link to="/chats">
        <Button className="matchAlert__Button1" size="large">
           Let's Chat!
    </Button>
      </Link>
      <Button className="matchAlert__Button2" size="large" onClick={(e) => matchAlert()} >
        Keep Swiping!
    </Button>
    </div>
    </div>
  )
}
