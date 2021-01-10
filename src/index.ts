import * as _ from 'lodash'
import * as stringFn from 'string-fn'

function combine(value: any) {
	if (_.isArray(value) && value.find((v) => _.isPlainObject(v))) {
		return [_.merge({}, ...value.map((v) => combine(v)))]
	}
	if (_.isPlainObject(value) && !_.isArray(value)) {
		value = _.pickBy(value, (v) => !_.isNil(v))
		return _.mapValues(value, (v) => combine(v))
	}
	return value
}

/** `typescript` + dependencies are loaded on-demand using `dynamic import()` */
async function generate(value: any, identifier = '') {
	let { generateIdentifierDeclarationFile } = await import('dts-gen')
	let output = generateIdentifierDeclarationFile(
		stringFn.pascalCase(identifier) || '____',
		combine(value),
	) as string
	output = output.replace(/[;]/g, '')
	output = output.replace(/\015\n\015\n+/g, '\n')
	output = output.replace(/    /g, '\t')
	output = output.trim()
	return output
}

export = generate
declare namespace generate {}
