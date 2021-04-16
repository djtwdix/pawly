import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";

import React from "react";

export default function SwipeButtons({ onSwipe }) {
  return (
    <section>
      <footer className="swipeButtons MultiIconButton-root">
        <IconButton >
          <CloseIcon className="swipeButtons__close" />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon className="swipeButtons__bone" icon={faBone} />
        </IconButton>
        <IconButton>
          <FavoriteIcon className="swipeButtons__favorite" />
        </IconButton>
      </footer>
    </section>
  );
}
