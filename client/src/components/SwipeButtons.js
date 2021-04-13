import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import React from "react";

export default function SwipeButtons() {
  return (
    <section>
      <footer className="swipeButtons MultiIconButton-root">
        <IconButton>
          <CloseIcon className="swipeButtons__close" />
        </IconButton>
        <IconButton>
          <StarRateIcon className="swipeButtons__star" />
        </IconButton>
        <IconButton>
          <FavoriteIcon className="swipeButtons__favorite" />
        </IconButton>
      </footer>
    </section>
  );
}
