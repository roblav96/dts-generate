#!/usr/bin/env node

import * as dts from './'
import * as mri from 'mri'

async function start() {
	let argv = mri(process.argv.slice(2))
	let arg = Array.isArray(argv._) && (argv._[0] as string)
	if (!arg) throw new Error('Input argument is undefined')
	let pkg = require(arg)
	let output = await dts(pkg, arg, true)
	console.log(`\n\n${output}\n\n`)
}
start().catch(error => console.error(`dts-generate Error ->`, error))
