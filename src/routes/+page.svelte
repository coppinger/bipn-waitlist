<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// Client API:
	const { form } = superForm(data.form);

	// Components
	import Brand from '$lib/components/Brand.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Card from '$lib/components/Card.svelte';
</script>

<div class="min-w-screen flex min-h-screen">
	<div class="relative z-10 flex min-h-full w-1/2 flex-col justify-between bg-neutral-50 p-20">
		<Brand />
		<div class="flex max-w-sm flex-col gap-8">
			<p class="text-4xl font-medium text-neutral-800">
				Discover creators who are sharing their journey with the world
			</p>
			<p class="text-lg font-medium text-neutral-600">
				A curated list & community of indie hackers and founders who are building in public
			</p>
			<form method="POST" class="flex gap-4">
				<Input
					type="email"
					name="email"
					bind:value={$form.email}
					class="w-full bg-white"
					placeholder="Your best email address"
				/>
				<Button type="submit">Join waitlist</Button>
			</form>
		</div>
		<div class="b-neutral-200 flex w-fit items-center gap-4 rounded-full border p-4">
			<img
				src="/images/charlie-pfp.png"
				class="h-8 w-8 rounded-full"
				alt="Charlie Coppinger, the sites author"
			/>
			<a
				href="https://twitter.com/thecoppinger"
				rel="nofollow"
				class="font-semibold text-neutral-600"
				>Built in public, live on X & Twitch, by <span class="underline underline-offset-2"
					>Charlie</span
				></a
			>
		</div>
	</div>
	<div class="flex w-1/2 items-center justify-center overflow-hidden bg-neutral-100">
		<img src={'/images/grid.png'} alt="" class="skew absolute max-w-[800px]" />
		<!-- <input class="hidden" type="checkbox" id="dimension" checked />
		<main>
			<article>
				<div class="window">
					<div class="scene">
						<ul class="grid">
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
							<li>
								<Card name="Pascal Pixel" handle="pascalpixel" />
							</li>
						</ul>
					</div>
				</div>
			</article>
		</main> -->
	</div>
</div>
