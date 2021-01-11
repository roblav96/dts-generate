import * as dts from '.'
import * as fs from 'fs-extra'
import * as mri from 'mri'
import * as path from 'path'

async function run() {
	let argvs = mri(process.argv.slice(2))

	let inputs = argvs._ as string[]
	if (!Array.isArray(inputs) || inputs.length == 0) {
		throw new Error(
			`dts-generate argument requires a valid NodeRequire module or json file, example: 'dts-generate lodash'`,
		)
	}

	let values = [] as { identifier: string; value: any }[]
	for (let input of inputs) {
		try {
			let filepath = path.resolve(process.cwd(), input)
			if (await fs.pathExists(filepath)) {
				values.push({
					identifier: path.basename(filepath),
					value: [await fs.readJson(filepath)].flat(),
				})
			} else {
				values.push({
					identifier: input,
					value: require(input),
				})
			}
		} catch (error) {
			console.error(`Invalid NodeRequire module or json file '${input}' -> %O`, error)
		}
	}

	if (values.length == 0) {
		throw new Error(`Empty input values`)
	}

	if (argvs.merge) {
		values = [
			values.reduce((target, value, index) => {
				target.identifier = `${target.identifier} ${value.identifier}`
				target.value = [...target.value, ...value.value]
				return target
			}),
		]
		// console.log(`${values[0].identifier} ->`, values[0].value)
	}

	for (let value of values) {
		try {
			console.log(await dts.generate(value.value, value.identifier))
		} catch (error) {
			console.error(`${value.identifier} -> %O`, error)
		}
	}
}

run().catch((error) => console.error('dts-generate cli error ->', error))
