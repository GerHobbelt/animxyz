import { isEmptyObject, joinRegexes, stringifyRegex } from '../utils'

// Injects modifiers into regex string
export default function (regex, modifiers) {
	if (isEmptyObject(modifiers)) return regex

	let newRegexString = stringifyRegex(regex)

	const prefixRegexes = []
	const postfixRegexes = []
	for (const [modifierName, modifier] of Object.entries(modifiers)) {
		if (modifier.matches) {
			const modifierMatches = new RegExp(`(?<__modifier__${modifierName}>${stringifyRegex(modifier.matches)})`)
			switch (modifier.type) {
				case 'prefix':
					prefixRegexes.push(modifierMatches)
					break
				case 'postfix':
					postfixRegexes.push(modifierMatches)
					break
				default:
					throw new Error(`modifier ${modifierName} must have a 'type' property of either 'prefix' or 'postfix'`)
			}
		} else {
			throw new Error(`modifier ${modifierName} must have a defined 'matches' property`)
		}
	}

	const prefixRegex = joinRegexes(...prefixRegexes)
	const postfixRegex = joinRegexes(...postfixRegexes)

	newRegexString = `(?:${stringifyRegex(prefixRegex)})*${newRegexString}(?:${stringifyRegex(postfixRegex)})*`
	return new RegExp(newRegexString)
}