declare module '@otplib/preset-browser' {
	// Import the types from the 'otplib' package
	import * as otplib from 'otplib';

	// Declare that this module has the same types as 'otplib'
	export = otplib;
}

declare module '@otplib/preset-browser/buffer' {
	// Import the types from the 'buffer' module
	import * as buffer from 'buffer';

	// Declare that this module has the same types as 'otplib'
	export = buffer;
}
