import { CognitoIdentityServiceProvider } from 'aws-sdk'

// const userPoolId = 'us-east-1_1O3Ocu0va'
const clientId = '4jqmo438sn7qr3bljmokqdkd6b'
const region = 'us-east-1'

const cognito = new CognitoIdentityServiceProvider({ region })

const signIn = (username, password) => {
  return new Promise((resolve, reject) => {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
      //   UserPoolId: userPoolId

    }

    cognito.initiateAuth(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export default (_, inject) => {
  inject('cognito', { signIn })
}
