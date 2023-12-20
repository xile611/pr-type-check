export const checkBugserveCase = (bodyString: string): boolean => {
  if (!bodyString) {
    return false
  }

  const startString = '🐞 Bugserver case id'
  const endString = '💡 Background and solution'

  const startIndex = bodyString.indexOf(startString)

  if (startIndex >= 0) {
    const endIndex = bodyString.indexOf(
      endString,
      startIndex + startString.length
    )

    if (endIndex >= 0) {
      const middleString = bodyString.slice(
        startIndex + startString.length,
        endIndex
      )

      if (/\S/.exec(middleString)) {
        return true
      }
    }
  }

  return false
}
