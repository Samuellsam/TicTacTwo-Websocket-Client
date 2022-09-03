import {
  LOWER_ALPHABET,
  LOWER_ALPHABET_TYPE,
  NUMERIC,
  NUMERIC_TYPE,
  UPPER_ALPHABET,
  UPPER_ALPHABET_TYPE,
} from '../constants/AlphaNumericConstant'
import { generateRandomNumber } from './RandomNumGenerator'

export const generateId = (
  lowerCount: number,
  upperCount: number,
  numericCount: number
) => {
  let resultId = ''

  let ttlLowerAlphabet = lowerCount
  let ttlUpperAlphabet = upperCount
  let ttlNumber = numericCount
  const ttlLength = lowerCount + upperCount + numericCount

  let canBeRandom = [LOWER_ALPHABET_TYPE, NUMERIC_TYPE, UPPER_ALPHABET_TYPE]

  while (resultId.length < ttlLength) {
    if (
      ttlLowerAlphabet === 0 &&
      canBeRandom.indexOf(LOWER_ALPHABET_TYPE) !== -1
    ) {
      canBeRandom.splice(canBeRandom.indexOf(LOWER_ALPHABET_TYPE), 1)
    }
    if (
      ttlUpperAlphabet === 0 &&
      canBeRandom.indexOf(UPPER_ALPHABET_TYPE) !== -1
    ) {
      canBeRandom.splice(canBeRandom.indexOf(UPPER_ALPHABET_TYPE), 1)
    }
    if (ttlNumber === 0 && canBeRandom.indexOf(NUMERIC_TYPE) !== -1) {
      canBeRandom.splice(canBeRandom.indexOf(NUMERIC_TYPE), 1)
    }

    let randomTypeIdx = generateRandomNumber(canBeRandom.length - 1)
    let type = canBeRandom[randomTypeIdx]

    let char = undefined

    switch (type) {
      case LOWER_ALPHABET_TYPE:
        char = LOWER_ALPHABET.charAt(
          generateRandomNumber(LOWER_ALPHABET.length - 1)
        )
        ttlLowerAlphabet--
        break
      case UPPER_ALPHABET_TYPE:
        char = UPPER_ALPHABET.charAt(
          generateRandomNumber(UPPER_ALPHABET.length - 1)
        )
        ttlUpperAlphabet--
        break
      case NUMERIC_TYPE:
        char = NUMERIC.charAt(generateRandomNumber(NUMERIC.length - 1))
        ttlNumber--
        break
    }

    resultId += char
  }

  return resultId
}
