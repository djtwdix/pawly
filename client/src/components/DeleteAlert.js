import React from 'react'
import { Button } from '@material-ui/core'

export default function DeleteAlert({ destroyPup, pup, deleteAlert}) {

  return (
    <div className="deleteAlert">
      <div className="deleteAlert__message">
      <h2>ARE YOU SURE?</h2>
      </div>
      <div className="deleteAlert__buttons">
      <Button className="deleteAlert__yep" onClick={() => destroyPup(pup._id).then(deleteAlert())}>
        YEP!
      </Button>
      <Button className="deleteAlert__nope" onClick={() => deleteAlert()}>
        Nope!
      </Button>
      </div>
    </div>
  )
}
