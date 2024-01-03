import { SelectOption } from '~/components/ts/interfaces'

const getText = (list: SelectOption[], id: number): String => {
  const item = list.find(item => item.id === id)
  return item ? item.text : ''
}

export { getText }
