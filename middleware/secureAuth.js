export default function ({ store, redirect }) {
  console.log('authstate', !store.state.secureAuthenticated)
  if (!store.state.secureAuthenticated && process.env.NODE_ENV === 'production') {
    return redirect('/signin')
  }
}
