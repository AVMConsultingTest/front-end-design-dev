import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk'

const region = 'us-east-1'
const clientId = '4jqmo438sn7qr3bljmokqdkd6b'

const logout = (token: string, secret: string, router: any, callback: () => void) => {
  const params: CognitoIdentityServiceProvider.GlobalSignOutRequest = {
    AccessToken: secret
  }
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
      document.cookie = 'cognito_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      callback()
      router.push('/')
    }
  })
}

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const cognito = new CognitoIdentityServiceProvider({
    region
  })

  const params: CognitoIdentityServiceProvider.Types.InitiateAuthRequest = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: clientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken
    }
  }

  return await new Promise((resolve, reject) => {
    cognito.initiateAuth(params, (err, data) => {
      if (err) {
        reject(err)
      } else if (data.AuthenticationResult?.AccessToken) {
        resolve(data.AuthenticationResult.AccessToken)
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          code: '',
          message: 'Accees Token is undefined',
          name: 'TokenNotDefined',
          time: new Date(new Date().getDate())
        } as AWSError)
      }
    })
  })
}

const login = async (userName: string, password: string) => {
  try {
    const cognito = new CognitoIdentityServiceProvider({
      region
    })

    const authParams = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: clientId,
      AuthParameters: {
        USERNAME: userName,
        PASSWORD: password
      }
    }

    const user = await cognito.initiateAuth(authParams).promise()

    if (user.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
      const newAuthParams: CognitoIdentityServiceProvider.RespondToAuthChallengeRequest = {
        ClientId: authParams.ClientId,
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        Session: user.Session,
        ChallengeResponses: {
          USERNAME: userName,
          NEW_PASSWORD: password
        }
      }

      const loggedUser = await cognito.respondToAuthChallenge(newAuthParams).promise()
      console.log(loggedUser)
      return loggedUser
    }

    return user
  } catch (error) {
    console.log('error logging in', error)
  }
}

const forgotPassword = async (email: string): Promise<CognitoIdentityServiceProvider.Types.ForgotPasswordResponse> => {
  const cognito = new CognitoIdentityServiceProvider({
    region
  })
  const params: CognitoIdentityServiceProvider.Types.ForgotPasswordRequest = {
    ClientId: clientId,
    Username: email
  }

  return await new Promise((resolve, reject) => {
    cognito.forgotPassword(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const confirmPassword = async (email: string, code: string, newPassword: string): Promise<CognitoIdentityServiceProvider.Types.ConfirmForgotPasswordResponse> => {
  const cognito = new CognitoIdentityServiceProvider({
    region
  })
  const params: CognitoIdentityServiceProvider.Types.ConfirmForgotPasswordRequest = {
    ClientId: clientId,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword
  }

  return await new Promise((resolve, reject) => {
    cognito.confirmForgotPassword(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
        console.log('confirm:', data)
      }
    })
  })
}

export { logout, login, refreshAccessToken, forgotPassword, confirmPassword }
