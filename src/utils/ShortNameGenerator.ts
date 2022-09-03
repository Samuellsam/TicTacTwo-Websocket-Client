export const generateShortName = (name: string) => {
  if (name === undefined) return ''

  return name[0]
}
