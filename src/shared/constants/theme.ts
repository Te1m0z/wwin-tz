const COLORS = {
  greenDark: '#66AC52',
  greenLight: '#71C658',
  white: '#FFF',
} as const

const SIZES = {
  siteContainer: '1024px',
} as const

const BREAKPOINTS = {
  xs   : '(max-width: 640px)',
  sm   : '(min-width: 641px) and (max-width: 767px)',
  md   : '(min-width: 768px) and (max-width: 1023px)',
  lg   : '(min-width: 1024px) and (max-width: 1399px)',
  xl   : '(min-width: 1400px) and (max-width: 2047px)',
  xxl  : '(min-width: 2048px)',
  xsUp : '(min-width: 0)',
  smUp : '(min-width: 641px)',
  mdUp : '(min-width: 768px)',
  lgUp : '(min-width: 1024px)',
  xlUp : '(min-width: 1400px)',
  xxlUp: '(min-width: 2048px)',
} as const

export {
  COLORS,
  BREAKPOINTS,
  SIZES,
}