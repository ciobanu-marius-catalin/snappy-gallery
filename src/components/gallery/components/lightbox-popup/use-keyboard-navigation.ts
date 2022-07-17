import { useCallback, useEffect } from "react";

interface UseKeyboardNavigationInput {
  onNext: Function;
  onPrevious: Function;
}

const useKeyboardNavigation = ({
  onNext,
  onPrevious,
}: UseKeyboardNavigationInput) => {
  const onKeyUp = useCallback(
    (e) => {
      let leftKeyCode = 37;
      let rightKeyCode = 39;
      switch (e.keyCode) {
        case leftKeyCode:
          onPrevious();
          break;
        case rightKeyCode:
          onNext();
          break;
      }
    },
    [onNext, onPrevious]
  );

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyUp]);
};

export { useKeyboardNavigation };
