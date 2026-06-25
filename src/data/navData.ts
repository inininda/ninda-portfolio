// Navigation menu items for the portfolio navbar
export interface NavItem {
  label: string
  href: string
}

export const navData: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
]
