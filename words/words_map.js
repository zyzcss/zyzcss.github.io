const wordsMap = {}
for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const first = word[0]
    const target = wordsMap[first]
    if (target) {
        target.push(word)
    } else {
        wordsMap[first] = [word]
    }
}