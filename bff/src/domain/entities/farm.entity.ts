import { v4 as uuidv4 } from 'uuid'

export type FarmProps = {
  id?: string
  name: string
  city: string
  state: string
  totalArea: number
  cultivatedArea: number
  vegetatedArea: number
  creatAt?: Date
}
