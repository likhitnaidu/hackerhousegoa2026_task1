export const makeBuilderId = (name: string) => {
  let hash = 0
  for (const c of name.trim().toUpperCase() || 'GOA') hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0
  return `HHGOA2026-${Math.abs(hash).toString(36).toUpperCase().padStart(4, '0').slice(-4)}`
}

export const makeTitle = (build: string, stack: string) => {
  const text = `${build} ${stack}`.toLowerCase()
  if (/open.?source/.test(text)) return 'THE OPEN SOURCE BUILDER'
  if (/ai|ml|machine.?learning|model/.test(text)) return 'THE MODEL BUILDER'
  if (/rust|infra|devops|systems|backend/.test(text)) return 'THE SYSTEM BUILDER'
  if (/react|design|frontend|pixel/.test(text)) return 'THE PIXEL BUILDER'
  if (/product|founder|startup/.test(text)) return 'THE PRODUCT BUILDER'
  if (/api|automation|workflow/.test(text)) return 'THE AUTOMATION BUILDER'
  return 'THE NIGHT SHIPPER'
}
