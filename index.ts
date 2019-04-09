import { FormatCodeSettings } from 'typescript/lib/typescript'
import startcase = require('lodash.startcase')

function generate(value: any, name = '', silent = false) {
	return import('typescript/lib/typescript').then(function({
		generateTypesForGlobal,
		getDefaultFormatCodeSettings,
	}) {
		let settings = Object.assign(getDefaultFormatCodeSettings(), {
			convertTabsToSpaces: false,
		} as FormatCodeSettings)
		name = name && startcase(name).replace(/\s+/g, '') || '____'
		let raw = generateTypesForGlobal(name, value, settings)
		let output = raw.replace(/;/g, '').trim()
		if (!silent) console.log(`\n\n${output}\n\n`)
		return output
	})
}

declare namespace generate {}
export = generate
