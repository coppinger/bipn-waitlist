import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
	name: z.string(),
	email: z.string().email(),
	twitterHandle: z.string()
	// .max(15)
	// .regex(/^[a-zA-Z0-9_]*$/)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(schema);

	// Unless you throw, always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			console.log('fail :(');

			return fail(400, { form });
		}

		// Yep, return { form } here too
		return { form };
	}
};
