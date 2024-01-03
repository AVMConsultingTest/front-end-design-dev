import { SizeType, ActionType, ButtonType, IconVariantType } from './types'

const SizeTypeEnum = {
  SM: 'sm' as SizeType,
  MD: 'md' as SizeType,
  LG: 'lg' as SizeType
}

const ActionTypeEnum = {
  BUTTON: 'button' as ActionType,
  SUBMIT: 'submit' as ActionType,
  RESET: 'reset' as ActionType
}

const ButtonTypeEnum = {
  PRIMARY: 'primary' as ButtonType,
  SECONDARY: 'secondary' as ButtonType,
  GREEN: 'green' as ButtonType,
  LINK: 'link' as ButtonType
}

const IconVariantTypeEnum = {
  OUTLINE: 'outline' as IconVariantType,
  LINEAR: 'linear' as IconVariantType,
  TWOTONE: 'twotone' as IconVariantType,
  BULK: 'bulk' as IconVariantType
}
export {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum,
  IconVariantTypeEnum
}
