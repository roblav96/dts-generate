import 'node-env-dev'
import * as _ from 'lodash'

function combine(value: object) {
	if (_.isArray(value) && value.find(v => _.isPlainObject(v))) {
		return [_.merge({}, ...value.map(v => combine(v)))]
	}
	if (_.isPlainObject(value) && !_.isArray(value)) {
		return _.mapValues(value, v => combine(v))
	}
	return value
}

async function generate(value: any, name = '') {
	let { generateIdentifierDeclarationFile } = await import('dts-gen')
	let output = generateIdentifierDeclarationFile(
		_.upperFirst(_.camelCase(name)) || '____',
		combine(value)
	) as string
	output = output.replace(/[;]/g, '')
	output = output.replace(/\015\n\015\n+/g, '\n')
	output = output.replace(/    /g, '\t')
	output = output.trim()
	if (name) console.log(`dts-generate '${name}' ->`, output)
	return output
}

Object.assign(global, { dts: generate })

declare namespace generate {}
export = generate

declare global {
	var dts: typeof generate
	var global: NodeJS.Global
	namespace NodeJS {
		interface Global {
			dts: typeof dts
		}
	}
}
