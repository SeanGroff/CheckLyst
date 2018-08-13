export interface IItem {
  id: string
  name: string
  completed: boolean
}

export interface ICheckLyst {
  id: string
  name: string
  items: IItem[]
}

export interface IContainerItems {
  state: { savedCheckLyst: ICheckLyst[] }
  create(i: ICheckLyst): void
  delete(i: ICheckLyst): void
  edit(i: ICheckLyst): void
  reorder(i: ICheckLyst): void
}
