import { CognitoIdentityServiceProvider } from 'aws-sdk'

const logout = (token: string, secret: string, router: any, callback: () => void) => {
  const params: CognitoIdentityServiceProvider.GlobalSignOutRequest = {
    AccessToken: secret
  }
  const region = 'us-east-1'
  const config: CognitoIdentityServiceProvider.ClientConfiguration = {
    region,
    credentials: {
      accessKeyId: token,
      secretAccessKey: secret
    }
  }

  const cognito = new CognitoIdentityServiceProvider(config)

  cognito.globalSignOut(params, (err, _data) => {
    if (err) {
      console.error('Error logging out:', err)
    } else {
      console.log('User logged out successfully')
      document.cookie = 'cognito_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      callback()
      router.push('/')
    }
  })
}

export default logout
