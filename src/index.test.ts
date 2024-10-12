import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import page from './routes/+page.svelte';

describe('2FA Code Generator functionality', () => {
	it('should load application with empty secret input', async () => {
		render(page);
		expect(
			await screen.findByRole('heading', { name: '2FA Code Generator' })
		).toBeInTheDocument();
		expect(await screen.findByLabelText('Secret:')).toHaveValue('');
	});

	it('should populate the secret input', async () => {
		render(page);
		const secretInput = await screen.findByLabelText('Secret:');
		const secretValue = 'JR7AX4O5BF5OOE44';
		await userEvent.type(secretInput, secretValue);
		expect(secretInput).toHaveValue(secretValue);
	});

	it('should display the generated code after entering a secret', async () => {
		render(page);
		const secretInput = await screen.findByLabelText('Secret:');
		const secretValue = 'JR7AX4O5BF5OOE44';
		await userEvent.type(secretInput, secretValue);

		// Wait for the code to be generated
		expect(await screen.findByText(/^\d{6}$/)).toBeInTheDocument();
	});

	it('should copy the generated code to clipboard', async () => {
		Object.defineProperties(navigator, {
			clipboard: {
				value: {
					writeText: vi.fn()
				}
			}
		});
		render(page);
		const secretInput = await screen.findByLabelText('Secret:');
		const secretValue = 'PEAVA3WN4ZMBYQUS';
		await userEvent.type(secretInput, secretValue);

		const codeButton = await screen.findByLabelText('Code');
		await userEvent.click(codeButton);

		expect(await screen.findByText('Copied!')).toBeInTheDocument();
	});

	it('should reveal the secret when toggle is enabled', async () => {
		render(page);
		const secretInput = await screen.findByLabelText('Secret:');
		const revealToggle = await screen.findByLabelText('Reveal secret?');

		await userEvent.click(revealToggle);
		expect(secretInput).toHaveAttribute('type', 'text');

		await userEvent.click(revealToggle);
		expect(secretInput).toHaveAttribute('type', 'password');
	});
});
