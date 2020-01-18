#!/usr/bin/env node

import '.'
import * as mri from 'mri'

process.nextTick(async () => {
	try {
		let argvs = mri(process.argv.slice(2))
		let arg = Array.isArray(argvs._) && (argvs._[0] as string)
		if (!arg) throw new Error('Command argument is not a valid NodeRequire module')
		await console.dts(require(arg))
	} catch (error) {
		console.error(`[dts-generate] '${process.argv.slice(1)}' -> %O`, error)
	} finally {
		process.exit(0)
	}
})
