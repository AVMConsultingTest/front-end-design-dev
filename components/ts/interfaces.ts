
interface IconObject {
  name: string,
  variant: string,
  [x: string]: any
}

interface SelectOption {
  id: number|string|unknown;
  text: string;
  selected: boolean;
  slotName?: string;
  img?: string
  icon?: string | IconObject
}

export { SelectOption, IconObject }
