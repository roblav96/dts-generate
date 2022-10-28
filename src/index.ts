import * as deepmerge from 'deepmerge'
import isPlainObj = require('is-plain-obj')
import { generateIdentifierDeclarationFile } from 'dts-gen'
import { pascalCase } from 'pascal-case'

function combine(value: any) {
	if (Array.isArray(value) && value.some((v) => isPlainObj(v))) {
		return [deepmerge.all([{}, ...value.map((v) => combine(v))])]
	}
	if (isPlainObj(value) && !Array.isArray(value)) {
		return Object.entries(value).reduce((target, [key, value], index) => {
			if (value === undefined) {
				return target
			}
			return Object.assign(target, { [key]: combine(value) })
		}, {})
	}
	return value
}

export function generate(value: any, identifier = '') {
	let output = generateIdentifierDeclarationFile(
		identifier ? pascalCase(identifier) : '____',
		combine(value),
	) as string
	output = output.replace(/[;]/g, '')
	output = output.replace(/\015\n\015\n+/g, '\n')
	output = output.replace(/    /g, '\t')
	return output.trim()
}
