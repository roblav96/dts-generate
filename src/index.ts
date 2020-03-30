import * as _ from 'lodash'
import { pascalCase } from 'string-fn'

function combine(value: object) {
	if (_.isArray(value) && value.find((v) => _.isPlainObject(v))) {
		return [_.merge({}, ...value.map((v) => combine(v)))]
	}
	if (_.isPlainObject(value) && !_.isArray(value)) {
		return _.mapValues(value, (v) => combine(v))
	}
	return value
}

/** dynamically imports `typescript` into memory on-demand */
async function generate(value: any, identifier = '____') {
	let { generateIdentifierDeclarationFile } = await import('dts-gen')
	let output = generateIdentifierDeclarationFile(pascalCase(identifier), combine(value)) as string
	output = output.replace(/[;]/g, '')
	output = output.replace(/\015\n\015\n+/g, '\n')
	output = output.replace(/    /g, '\t')
	output = output.trim()
	return output
}

export = generate
declare namespace generate {}
