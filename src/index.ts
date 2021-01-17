import isArray = require('lodash/isArray')
import isNil = require('lodash/isNil')
import isPlainObject = require('lodash/isPlainObject')
import mapValues = require('lodash/mapValues')
import merge = require('lodash/merge')
import pickBy = require('lodash/pickBy')
import { generateIdentifierDeclarationFile } from 'dts-gen'
import { pascalCase } from 'pascal-case'

function combine(value: any) {
	if (isArray(value) && value.find((v) => isPlainObject(v))) {
		return [merge({}, ...value.map((v) => combine(v)))]
	}
	if (isPlainObject(value) && !isArray(value)) {
		value = pickBy(value, (v) => !isNil(v))
		return mapValues(value, (v) => combine(v))
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
