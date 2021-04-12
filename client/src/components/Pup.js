import React from 'react'
import ListItemContainer from "./ListItemContainer"
import { Avatar } from "@material-ui/core";

export default function Pup() {
  return (
 
<ListItemContainer>
{/*<Link to={"/"}>*/ }
  <section /* key={pup.id} */ className="chat">
    <Avatar
    
      alt= "billie"
      src= "billie.jpeg"
    >
    </Avatar>
    
      <h1> Billie</h1>
      <p>Toy poodle</p>
 
  </section>
{/* </Link> */}
</ListItemContainer>
 
  )
}






