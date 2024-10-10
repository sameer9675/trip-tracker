// we need to resuse stateful logic that why custom hook is

import { useState } from "react";

// good way -> try to use named export for custom hook
export function useGeolocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return {
    getPosition,
    isLoading,
    error,
    position,
  };
}
