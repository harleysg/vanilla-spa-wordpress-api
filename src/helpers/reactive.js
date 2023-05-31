import { Observable } from 'rxjs';

export function FromEvent (node, name) {
  return new Observable((observer) => {
    function handler(event) {
      event.preventDefault()
      observer.next(event)
    }
    node.addEventListener(name, handler);
    return () => node.removeEventListener(name, handler);
  });
}