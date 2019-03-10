interface MenuItem {
  show: boolean,
  href?: string,
  prevent?: boolean,
  download?: boolean,
  description: string,
  action?(): void,
}

interface Modal {
  open: boolean,
  url: string,
  type?: string
}

interface Images {
  [key: string]: string
}
