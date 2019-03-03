interface MenuItem {
  show: boolean,
  href?: string,
  current: boolean,
  prevent?: boolean,
  download?: boolean,
  description: string,
  action?(): void,
}