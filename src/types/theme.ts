export interface ITheme {
  palette: {
    white: string
    black: string
    red: string
    orange: string
    yellow: string
    green: string
    teal: string
    blue: string
    purple: string
    pink: string
    primary: {
      primaryColor: string
      primaryText: string
      primaryBackgroundColor: string
    }
    secondary: {
      secondaryColor: string
      secondaryText: string
      secondaryBackgroundColor: string
    }
  }
  spacing: {
    unit: number
  }
  typography: {
    fontFamily: string
    baseFontSize: number
  }
}
