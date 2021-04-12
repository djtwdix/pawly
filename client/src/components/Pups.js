import { Avatar, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React , { useState, useEffect }  from "react";


export default function Pups({ user }) {
  const [pups, setPups] = useState([]);


    const parsedPups = pups.map((pup) => {
      return (
        <Button style={{ width: "100%" }}>
          {/*<Link to={"/"}>*/ }
            <section key={pup.id} className="chat">
              <Avatar
                className="chat__image"
                alt= "billie"
                src= "billie.jpeg"
              ></Avatar>
              <div className="chat__details">
                <h1> Billie</h1>
                <p>Toy poodle</p>
              </div>
            </section>
        {/* </Link> */}
        </Button>
      );
    });




  return (
      <section>
        {parsedPups}
        <Button style={{ width: "100%" }}>
          {/* <Link to={"/pups/new"}> */}
            <section className="chat">
              <Add />
            </section>
        {/* </Link> */}
        </Button>
      </section>
    );

}