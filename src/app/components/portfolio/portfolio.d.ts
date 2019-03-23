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
  url?: string,
  mode?: string,
  layout?: string,
  github?: string,
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

type GitHubSizes = 0 | 1 | 2;

interface GitHubBanner {
  disabled: boolean,
  size: GitHubSizes,
  url: string,
  name: string
}
