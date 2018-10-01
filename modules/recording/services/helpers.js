export function getTimeString (elapsedTime) {
  elapsedTime = elapsedTime > 0 ? elapsedTime : 0
  if (!elapsedTime) {
    return '00:00'
  }

  const addZero = (val) => val < 10 ? '0' + val : val
  const hours = addZero(Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  const minutes = addZero(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)))
  const seconds = addZero(Math.floor((elapsedTime % (1000 * 60)) / 1000))

  return +hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}
