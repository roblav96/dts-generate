/** `typescript` + dependencies are loaded on-demand using `await import(...)` */
export async function generate(value: any, identifier = '') {
	const _ = await import('lodash')
	const stringFn = await import('string-fn')

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

	const { generateIdentifierDeclarationFile } = await import('dts-gen')
	let output = generateIdentifierDeclarationFile(
		stringFn.pascalCase(identifier) || '____',
		combine(value),
	) as string
	output = output.replace(/[;]/g, '')
	output = output.replace(/\015\n\015\n+/g, '\n')
	output = output.replace(/    /g, '\t')
	return output.trim()
}
