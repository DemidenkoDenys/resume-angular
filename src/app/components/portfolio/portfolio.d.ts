interface FiltersInterface {
  [key: string]: boolean
}

interface Technology {
  [key: string]: number
}

interface Work {
  title: string,
  show: number,
  image: URL,
  techs: Technology[]
}

interface Mode {
  name: string,
  scale: number,
  width: number,
  height: number
}

interface Modes {
  [key: string]: Mode
}
