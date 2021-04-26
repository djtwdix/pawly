import { useState, useEffect } from "react";

export default function useDatePicker() {
  const [showPicker, setShowPicker] = useState(false);

  const datePicker = () => {
    if (showPicker) {
      setShowPicker(false);
    } else {
      setShowPicker(true);
    }
  };

  return { datePicker, showPicker };
}