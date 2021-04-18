import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";

import React from "react";

export default function SwipeButtons({ swipe, throwABone, id }) {
  return (
    <section>
      <footer className="swipeButtons MultiIconButton-root">
        <IconButton onClick={() => swipe("left")}>
          <CloseIcon className="swipeButtons__close" />
        </IconButton>
        <IconButton
          onClick={() => {
            throwABone(id);
            swipe("up");
          }}
        >
          <FontAwesomeIcon className="swipeButtons__bone" icon={faBone} />
        </IconButton>
        <IconButton onClick={() => swipe("right")}>
          <FavoriteIcon className="swipeButtons__favorite" />
        </IconButton>
      </footer>
    </section>
  );
}
