export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeoutID: NodeJS.Timeout | null = null

  return function (this: any, ...args: any[]) {
    if (timeoutID !== null) {
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  } as T
}
