export const getTotalDigit = (num: number): number => {
  let ttlDigit: number = 0
  let numParam: number = num

  while (numParam > 0) {
    numParam = Math.floor(numParam / 10)
    ttlDigit++
  }

  return ttlDigit
}

export const generateRandomNumber = (max: number, min: number = 0): number => {
  return (
    (Math.floor(Math.random() * Math.pow(10, getTotalDigit(max))) %
      (max - min + 1)) +
    min
  )
}
