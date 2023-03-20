import { api } from "../axios";

export default async function UserRegister(email: string, password: string) {
  const options = {
    headers: {"content-type": "application/json"}
  }

  return api.post('/users',
    {
      user: {
        email,
        password,
        active: true
      }
    },
    options
  )
}