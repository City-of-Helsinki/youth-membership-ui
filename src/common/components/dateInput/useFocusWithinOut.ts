import { useRef, useEffect, useCallback, RefObject } from 'react';

function useFocusWithinOut(
  ref: RefObject<HTMLDivElement>,
  onBlur?: () => void
) {
  const isFocused = useRef(false);

  const handleIsFocusedCheck = useCallback(() => {
    const element = ref.current;

    // If the element contains the activeElement it has the focus within
    // it. activeElement is the the element that currently has focus.
    if (element && element.contains(document.activeElement)) {
      isFocused.current = true;
    }

    // If the current element no longer contains the activeElement, but
    // it did on the previous render, we will fire onBlur and set
    // isFocused to false.
    if (
      element &&
      !element.contains(document.activeElement) &&
      isFocused.current
    ) {
      isFocused.current = false;

      if (onBlur) {
        onBlur();
      }
    }
  }, [onBlur, ref]);

  // It seems like a better option would be to not add these event
  // listeners if there is no onBlur, but that would require us to add
  // onBlur into the dependency array. As a way to circumvent this, we
  // are always binding the event listeners and handle the onBlur logic
  // within the event handler.
  useEffect(() => {
    // Binds keyup and mouseup events. This means that if the user
    // leaves the element with a keyboard click or a mouse click, blur
    // is handled correctly.
    //
    // Are there edge cases here? For instance, if blur is changed
    // programmatically it will likely go unnoticed.
    window.addEventListener('keyup', handleIsFocusedCheck);
    window.addEventListener('mouseup', handleIsFocusedCheck);
    return () => {
      window.removeEventListener('keyup', handleIsFocusedCheck);
      window.removeEventListener('mouseup', handleIsFocusedCheck);
    };
  }, [handleIsFocusedCheck]);

  return;
}

export default useFocusWithinOut;
