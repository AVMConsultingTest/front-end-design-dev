import { configure } from 'aws-amplify'

configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_Rqd5x2fnL',
    userPoolWebClientId: '5km6pm3853laonaqt647rt0v3u'
  }
})
