type TFunc = (...args: unknown[]) => unknown;

export function debounce<T extends TFunc>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  //
  let timeoutId: NodeJS.Timeout | null;
  //
  return (...args: Parameters<T>) => {
    //
    if (timeoutId) clearTimeout(timeoutId);
    //
    timeoutId = setTimeout(() => {
      //
      func(...args);
      //
      timeoutId = null;
      //
    }, delay);
  };
}

