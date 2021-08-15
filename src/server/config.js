import fs from 'fs'
import path from 'path'

const privateKey = fs.readFileSync(path.resolve('keys', 'private_key.pem'))
const publicKey = fs.readFileSync(path.resolve('keys', 'public_key.pem'))

const config = {
  projectName: 'React, Express and MongoDB starter',
  serverPort: 9001,
  cookie: {
    name: 'app-edv',
    httpOnly: true,
    maxAge: 31536000000,
  },
  crypto: {
    saltWorkFactor: 10,
    privateKey: privateKey,
    publicKey: publicKey,
    signOptions: { algorithm: 'RS256' },
  },
  database: {
    connectionString: 'mongodb://localhost/app-dev',
    useUnifiedTopology: true,
  },
}

export default config
