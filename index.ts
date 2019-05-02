import * as _ from 'lodash'
import { FormatCodeSettings } from 'typescript/lib/typescript'

function denullify(value: any) {
	if (_.isNull(value)) return undefined
	if (_.isArray(value)) {
		return value.map(v => denullify(v))
	}
	if (_.isObject(value)) {
		return _.mapValues(value, v => denullify(v))
	}
	return value
}

function combine(value: any) {
	if (_.isArray(value) && value.find(v => _.isObject(v))) {
		return [_.merge({}, ...value.map(v => combine(v)))]
	}
	if (_.isObject(value) && !_.isArray(value)) {
		return _.mapValues(value, v => combine(v))
	}
	return value
}

function generate(value: any, name = '', silent = false) {
	return import('typescript/lib/typescript').then(function({
		generateTypesForGlobal,
		getDefaultFormatCodeSettings,
	}) {
		let settings = _.merge(getDefaultFormatCodeSettings(), {
			convertTabsToSpaces: true,
		} as FormatCodeSettings)
		name = (name && _.upperFirst(_.camelCase(name))) || '____'
		let raw = generateTypesForGlobal(name, combine(denullify(value)), settings)
		let output = _.trim(raw.replace(/;\n/g, '\n'))
		if (!silent) console.log(output)
		return output
	})
}

declare namespace generate {}
export = generate
