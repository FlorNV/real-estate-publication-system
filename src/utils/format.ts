const MAX = 48

export const createSlug = (title: string): string => {
  const withoutCommasOrBar = title.toLowerCase().replace(/[,/]/g, ' ')
  const withoutAccents = withoutCommasOrBar.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const withHyphens = withoutAccents.replace(/\s+/g, '-')

  return withHyphens.substring(0, MAX)
}
