import { Store } from 'vuex'

// eslint-disable-next-line import/no-mutable-exports
let $store: Store<any>

export function injectStore (_store: Store<any>) {
  $store = _store
}

export { $store }
