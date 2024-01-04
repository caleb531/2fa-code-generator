// place files you want to import through the `$lib` alias in this folder.

let buffer: typeof import('@otplib/preset-browser/buffer');
let otplib: typeof import('@otplib/preset-browser');

// Load the OTPLib library if it's not already loaded, then return it
export async function getOTPLib() {
	// Because we are operating in a browser context (which lacks an
	// implementation of Node's 'buffer' module), we must first import the
	// Buffer polyfill and expose it globally (since @otplib/preset-browser is a
	// UMD module, and will expect it to be in the global namespace)
	if (!buffer) {
		buffer = await import('@otplib/preset-browser/buffer');
		window.Buffer = buffer.Buffer;
	}
	if (!otplib) {
		otplib = await import('@otplib/preset-browser');
	}
	return otplib;
}
