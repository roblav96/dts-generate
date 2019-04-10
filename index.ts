import { FormatCodeSettings } from 'typescript/lib/typescript'
import { cloneDeep, mapValues, isArray, isPlainObject, isNull, startCase } from 'lodash'

function iteratee(value: any, key: string, object: any) {
	if (isNull(value)) {
		return undefined
	}
	if (isArray(value)) {
		return value.map(v => (Object(v) === v ? mapValues(v, iteratee) : v))
	}
	if (isPlainObject(value)) {
		return mapValues(value, iteratee)
	}
	return value
}

function generate(value: any, name = '', silent = false) {
	return import('typescript/lib/typescript').then(function({
		generateTypesForGlobal,
		getDefaultFormatCodeSettings,
	}) {
		let settings = Object.assign(getDefaultFormatCodeSettings(), {
			convertTabsToSpaces: true,
		} as FormatCodeSettings)
		name = (name && startCase(name).replace(/\s+/g, '')) || '____'
		value = Object(value) === value ? mapValues(cloneDeep(value), iteratee) : value
		let raw = generateTypesForGlobal(name, value, settings)
		let output = raw.replace(/;/g, '').trim()
		if (!silent) console.log(output)
		return output
	})
}

declare namespace generate {}
export = generate
