import { FormatCodeSettings } from 'typescript/lib/typescript'
import * as keys from 'all-keys'
import { cloneDeep, isArray, isPlainObject, isNull, startCase } from 'lodash'

function fix(value: any) {
	if (value) {
		keys(value).forEach(k => {
			let v = value[k]
			if (isArray(v)) {
				v.forEach(fix)
			}
			if (isPlainObject(v)) {
				fix(v)
			}
			if (isNull(v)) {
				value[k] = undefined
			}
		})
	}
	return value
}

function generate(value: any, name = '', silent = false) {
	return import('typescript/lib/typescript').then(function({
		generateTypesForGlobal,
		getDefaultFormatCodeSettings,
	}) {
		let settings = Object.assign(getDefaultFormatCodeSettings(), {
			convertTabsToSpaces: false,
		} as FormatCodeSettings)
		name = (name && startCase(name).replace(/\s+/g, '')) || '____'
		let raw = generateTypesForGlobal(name, fix(cloneDeep(value)), settings)
		let output = raw.replace(/;/g, '').trim()
		if (!silent) console.log(output)
		return output
	})
}

declare namespace generate {}
export = generate
