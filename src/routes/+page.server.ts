import type { Actions } from './$types';

import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { supabase } from '$lib/index';

const schema = z.object({
	name: z.string(),
	email: z.string().email(),
	twitterHandle: z.string(),
	refQueryParam: z.string(),
	// .max(15)
	// .regex(/^[a-zA-Z0-9_]*$/)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(schema);

	// Unless you throw, always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		console.log(form.data.refQueryParam);
		

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			console.log('fail :(');

			return fail(400, { form });
		}

		const { data: duplicateCheckData, error: duplicateCheckError } = await supabase
			.from('waitlist')
			.select('email')
			.eq('email', form.data.email);

		// if (duplicateCheckData && duplicateCheckError?.code != 'PGRST116') {
		// 	return fail(400, { form, message: 'Error from Supabase, something went wrong' });
		// }

		// The request works, and thus the email already exists

		console.log('errror:', duplicateCheckData);

		if (!duplicateCheckError && duplicateCheckData.length != 0) {
			console.log('duplicate');

			return message(form, "It looks like you're already on the waitlist!");
		}

		const { data, error } = await supabase.from('waitlist').insert({
			name: form.data.name,
			twitter_handle: form.data.twitterHandle,
			email: form.data.email,
			referred_by: form.data.refQueryParam ? form.data.refQueryParam : '',
		}).select();

		if (error) {
			return console.log(error);
		}

		const refId = data[0].referral_id
		console.log(refId);
		

		// Yep, return { form } here too
	return message(form, { refId: refId });	}
};
