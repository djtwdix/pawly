import { useState } from "react";

export default function useDeleteAlert() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  //toggles whether delete alert is show upon clicking destroy button, saved as state
  const deleteAlert = () => {
    if (showDeleteAlert) {
      setShowDeleteAlert(false);
    } else {
      setShowDeleteAlert(true);
    }
  };

  return { deleteAlert, showDeleteAlert };
}
