export type UserModelProps = {
  name: string
  email: string
  password: string
  role: string | 'user'
  root: boolean | false
  avatar: string
}
