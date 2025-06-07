import { v4 as uuidv4 } from 'uuid'

export type FarmerProps = {
  id?: string
  document: string
  documentType: string
  name: string
  createdAt?: Date
}
