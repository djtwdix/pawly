import React from 'react'
import ListItemContainer from "./ListItemContainer"
import { Avatar } from "@material-ui/core";

export default function Pup({pup}) {
  return (
 
<ListItemContainer>
{/*<Link to={"/"}>*/ }
  <section key={pup._id} className="chat">
    <Avatar
    
      alt= {pup.name}
      src={pup.photoURL}
    >
    </Avatar>
    
      <h1>{pup.name}</h1>
      <p>{pup.breed}</p>
 
  </section>
{/* </Link> */}
</ListItemContainer>
 
  )
}






