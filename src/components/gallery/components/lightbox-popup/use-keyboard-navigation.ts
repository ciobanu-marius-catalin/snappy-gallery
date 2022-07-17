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

  const onScroll = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [onKeyUp, onScroll]);
};

export { useKeyboardNavigation };
