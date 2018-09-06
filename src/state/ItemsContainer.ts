import { Container } from 'unstated'
import { ICheckLyst } from '../types/items'

interface IState {
  savedCheckLysts: ICheckLyst[]
}

interface IOrder {
  from: number
  to: number
  checkLyst: ICheckLyst
}

export default class ItemsContainer extends Container<IState> {
  public state: IState = { savedCheckLysts: [] }

  public create = (newCheckLyst: ICheckLyst) => {
    this.setState(prevState => ({
      savedCheckLysts: [...prevState.savedCheckLysts, newCheckLyst],
    }))
  }

  public delete = (checkLyst: ICheckLyst) => {
    const checkLystIndex: number = this.state.savedCheckLysts.indexOf(checkLyst)

    this.setState(prevState => ({
      savedCheckLysts: [
        ...prevState.savedCheckLysts.slice(0, checkLystIndex),
        ...prevState.savedCheckLysts.slice(checkLystIndex + 1),
      ],
    }))
  }

  public edit = (checkLyst: ICheckLyst) => {
    const checkLystIndex: number = this.state.savedCheckLysts.indexOf(checkLyst)

    this.setState(prevState => ({
      savedCheckLysts: prevState.savedCheckLysts.map((lyst, index) => {
        if (index !== checkLystIndex) return lyst

        return {
          ...lyst,
          ...checkLyst,
        }
      }),
    }))
  }

  public reorder = ({ from, to, checkLyst }: IOrder) => {
    const remainingCheckLysts = this.state.savedCheckLysts.filter((lyst, index) => index !== from)
    this.setState(prevState => ({
      savedCheckLysts: [
        ...remainingCheckLysts.slice(0, to),
        checkLyst,
        ...remainingCheckLysts.slice(to),
      ],
    }))
  }
}
