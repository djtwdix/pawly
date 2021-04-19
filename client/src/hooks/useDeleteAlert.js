import { useState } from "react";

export default function useDeleteAlert() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const deleteAlert = () => {
    if (showDeleteAlert) {
      setShowDeleteAlert(false);
    } else {
      setShowDeleteAlert(true);
    }
  };

  return { deleteAlert, showDeleteAlert };
}
