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
      let middleString = bodyString.slice(
        startIndex + startString.length,
        endIndex
      )
      const commentStart = middleString.indexOf('<!--')
      const commentEnd = middleString.indexOf('-->')

      if (commentStart >= 0 && commentEnd > commentStart) {
        middleString = middleString.replace(
          middleString.slice(commentStart, commentEnd + 3),
          ''
        )
      }

      middleString = middleString.replace('###', '')

      if (/\S/.exec(middleString)) {
        return true
      }
    }
  }

  return false
}
