const regexMask = {
  PF: [/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'],
  PJ: [/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'],
}

export class FindFarmerDto {
  id?: string
  name: string
  document: string
  documentType: string

  static useMask(data: FindFarmerDto[]): FindFarmerDto[] {
    return data.map(item => {
      const value = regexMask[item.documentType]?.[0]
      const replace = regexMask[item.documentType]?.[1]
      return {
        ...item,
        document: item.document.replace(value, replace),
      }
    })
  }
}
