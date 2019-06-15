#!/usr/bin/env node

import '.'
import * as mri from 'mri'

process.nextTick(async () => {
	try {
		let argv = mri(process.argv.slice(2))
		let arg = Array.isArray(argv._) && (argv._[0] as string)
		if (!arg) throw new Error('Input argument is undefined')
		await global.dts(require(arg), arg)
	} catch (error) {
		console.error(`dts-generate ${process.argv.slice(1)} -> %O`, error)
	}
})
