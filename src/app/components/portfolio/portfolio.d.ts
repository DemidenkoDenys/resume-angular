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

