export interface IUser {
  id: string
  first_name: string
  last_name: string | null
  avatar: string | null
  email: string
  google_id?: string | null
}
