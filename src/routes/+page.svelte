<script lang="ts">
	// Types
	import type { PageData, ActionData } from './$types';

	import { page } from '$app/stores';

	import { copy } from 'svelte-copy';

	const url = $page.url;

	import { tick, onMount } from 'svelte';
	import { Confetti } from 'svelte-confetti';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import Countup from 'svelte-countup';

	import toast, { Toaster } from 'svelte-french-toast';
	import { mediaQuery } from 'svelte-legos';
	import { cn } from '$lib/utils';

	export let data: PageData;

	// Components
	import Brand from '$lib/components/Brand.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Card from '$lib/components/Card.svelte';

	import { ClipboardCopy } from 'lucide-svelte';

	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Label } from '$lib/components/ui/label';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

	let success: boolean = false;
	let confetti: boolean = false;
	let referralId: string = '';

	async function trigger() {
		confetti = false;
		await tick();
		confetti = true;
	}

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		resetForm: true,
		onUpdated({ form }) {
			success = true;
			referralId = form.message.refId;
			trigger();
			toast.success(`Success, you're on the waitlist!`, { position: 'bottom-center' });
		}
	});

	let waitlistCount: number | null = 0;

	onMount(() => {
		waitlistCount = data.count;
	});
</script>

<!-- <div class="absolute left-0 top-0 z-50 h-full w-full">
	<SuperDebug data={$form} />
</div> -->

{#if confetti}
	<div
		style="position: fixed; top: -50px; left: 0; height: 100vh; width: 100vw; display: flex; justify-content: center; overflow: hidden;"
		class="pointer-events-none z-50"
	>
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			delay={[500, 2000]}
			infinite
			duration={7500}
			amount={200}
			fallDistance="100vh"
			size={10}
			colorArray={['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']}
		/>
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			delay={[500, 2000]}
			infinite
			duration={7500}
			amount={50}
			fallDistance="100vh"
			size={25}
			colorArray={['url(/images/salute.png)']}
		/>
	</div>
{/if}

<div class="min-w-screen max-w-screen relative flex min-h-screen max-h-none xl:max-h-screen">
	<div
		class="relative z-10 flex min-h-full w-full flex-col justify-between bg-neutral-50 p-6 md:p-20 lg:w-2/3 xl:w-1/2 gap-8"
	>
		<div class="flex items-center justify-between">
			<Brand />
			<a
				href="https://twitter.com/buildpubnetwork"
				target="_blank"
				class="group flex items-center justify-center gap-4 font-semibold text-neutral-600"
			>
				<div
					class="flex items-center justify-center rounded-lg border border-neutral-200 p-2 transition-all delay-100 ease-linear group-hover:bg-[#1DA1F2]"
				>
					<svg
						width="21"
						height="20"
						viewBox="0 0 21 20"
						fill="none"
						class=" fill-neutral-500 transition-all delay-100 ease-linear group-hover:fill-white"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19.9851 4.11417C19.2893 4.4225 18.5418 4.63083 17.756 4.725C18.5576 4.245 19.1726 3.48333 19.4626 2.57667C18.7126 3.02167 17.8818 3.345 16.9976 3.51833C16.2893 2.765 15.281 2.29333 14.1643 2.29333C12.021 2.29333 10.2826 4.03167 10.2826 6.17667C10.2826 6.48 10.3176 6.775 10.3826 7.06C7.15514 6.8975 4.29598 5.35167 2.38098 3.00333C2.04764 3.57833 1.85598 4.245 1.85598 4.955C1.85598 6.30167 2.54181 7.49084 3.58264 8.18667C2.94598 8.16584 2.34764 7.99167 1.82431 7.70084V7.75083C1.82431 9.63167 3.16181 11.2008 4.93848 11.5575C4.61181 11.6458 4.26931 11.6925 3.91598 11.6925C3.66598 11.6925 3.42181 11.6692 3.18514 11.6242C3.67931 13.1658 5.11264 14.2892 6.81181 14.3192C5.48264 15.3608 3.80848 15.9817 1.99014 15.9817C1.67681 15.9817 1.36764 15.9633 1.06348 15.9275C2.78181 17.03 4.82181 17.6717 7.01348 17.6717C14.1551 17.6717 18.0593 11.7567 18.0593 6.62667C18.0593 6.46 18.0551 6.29167 18.0476 6.125C18.806 5.57667 19.4643 4.89417 19.9835 4.11667L19.9851 4.11417Z"
						/>
					</svg>
				</div>
				<span class="hidden sm:block">@buildpubnetwork</span>
				<svg
					width="9"
					height="10"
					viewBox="0 0 9 10"
					fill="none"
					class="hidden sm:block"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.23307 9.35299L0.282715 8.40264L6.87295 1.81241H3.6146L3.60329 0.647095L8.99993 0.647095V6.04373L7.83462 6.03242L7.83462 2.75144L1.23307 9.35299Z"
						fill="#525252"
					/>
				</svg>
			</a>
		</div>
		<div class="flex max-w-lg flex-col gap-8">
			<p class="text-4xl font-medium text-neutral-800">
				Discover creators who are sharing their journey with the world
			</p>
			<p class="text-lg font-medium text-neutral-600">
				A curated list & community of indie hackers and founders who are building in public
			</p>
			{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
			{#if $errors.twitterHandle}<span class="invalid">{$errors.name}</span>{/if}
			{#if $errors.email}<span class="invalid">{$errors.name}</span>{/if}
			{#if !success}
				<div class="flex max-w-sm flex-col gap-4 md:max-w-none md:flex-row">
					<Input
						type="email"
						bind:value={$form.email}
						class="text-md h-full w-full bg-white"
						placeholder="Your best email address"
						aria-invalid={$errors.email ? 'true' : undefined}
						{...$constraints.email}
					/>
					{#if $errors.email}<span class="text-red-700">{$errors.email}</span>{/if}
					<div>
						{#if $isDesktop}
							<Dialog.Root bind:open>
								<Dialog.Trigger asChild let:builder>
									<Button
										type="submit"
										variant="default"
										builders={[builder]}
										class="text-md group flex w-full shrink-0 gap-2 md:w-fit"
										size="lg"
									>
										Join the waitlist <div class="relative block">
											<img
												src="/images/salute.png"
												class="absolute h-4 min-h-4 w-4 min-w-4 group-hover:animate-ping"
												alt="A salute emoji"
											/>
											<img
												src="/images/salute.png"
												class="h-4 min-h-4 w-4 min-w-4"
												alt="A salute emoji"
											/>
										</div></Button
									>
								</Dialog.Trigger>
								<Dialog.Content class="sm:max-w-[425px]">
									<Dialog.Header>
										<Dialog.Title>Join the waitlist</Dialog.Title>
										<Dialog.Description>
											You're almost in, we need a couple more details.
										</Dialog.Description>
									</Dialog.Header>
									<form class="grid items-start gap-4" use:enhance method="POST">
										<div class="grid gap-2">
											<Label for="name">Name<span class="text-red-600"> *</span></Label>
											<Input
												class="text-md"
												id="name"
												name="name"
												bind:value={$form.name}
												placeholder="Charlie Coppinger"
												required={true}
											/>
										</div>
										<div class="grid gap-2">
											<Label for="twitterHandle">Twitter/X Username</Label>
											<Input
												class="text-md"
												id="twitterHandle"
												name="twitterHandle"
												bind:value={$form.twitterHandle}
												placeholder="TheCoppinger"
												required={false}
											/>
										</div>
										<div class="grid gap-2">
											<Label for="email">Email<span class="text-red-600"> *</span></Label>
											<Input
												class="text-md"
												type="email"
												id="email"
												name="email"
												bind:value={$form.email}
											/>
										</div>
										<Input
											class="text-md hidden"
											aria-hidden
											id="refQueryParam"
											name="refQueryParam"
											value={url.searchParams.get('inv')}
										/>
										<Button
											type="submit"
											variant="default"
											class="text-md group flex w-full shrink-0 gap-2"
											size="lg"
										>
											Submit
											<div class="relative block">
												<img
													src="/images/salute.png"
													class="absolute h-4 min-h-4 w-4 min-w-4 group-hover:animate-ping"
													alt="A salute emoji"
												/>
												<img
													src="/images/salute.png"
													class="h-4 min-h-4 w-4 min-w-4"
													alt="A salute emoji"
												/>
											</div></Button
										>
									</form>
								</Dialog.Content>
							</Dialog.Root>
						{:else}
							<Drawer.Root bind:open>
								<Drawer.Trigger asChild let:builder>
									<Button
										type="submit"
										variant="default"
										builders={[builder]}
										class="text-md group flex w-full shrink-0 gap-2 md:w-fit"
										size="lg"
									>
										Join the waitlist <div class="block group-hover:animate-ping">
											<img
												src="/images/salute.png"
												class="h-4 min-h-4 w-4 min-w-4"
												alt="A salute emoji"
											/>
										</div></Button
									>
								</Drawer.Trigger>
								<Drawer.Content>
									<Drawer.Header class="text-left">
										<Drawer.Title>Join the waitlist</Drawer.Title>
										<Drawer.Description>
											Almost there, we need a couple more details.
										</Drawer.Description>
									</Drawer.Header>
									<form class="grid items-start gap-4 px-4" use:enhance method="POST">
										<div class="grid gap-2">
											<Label for="name">Name<span class="text-red-600"> *</span></Label>
											<Input
												class="text-md"
												id="name"
												name="name"
												bind:value={$form.name}
												placeholder="Charlie Coppinger"
												required={true}
											/>
										</div>
										<div class="grid gap-2">
											<Label for="twitterHandle">Twitter/X Username</Label>
											<Input
												class="text-md"
												id="twitterHandle"
												name="twitterHandle"
												bind:value={$form.twitterHandle}
												placeholder="TheCoppinger"
												required={false}
											/>
										</div>
										<div class="grid gap-2">
											<Label for="email">Email<span class="text-red-600"> *</span></Label>
											<Input
												class="text-md"
												type="email"
												id="email"
												name="email"
												bind:value={$form.email}
											/>
										</div>
										<Input
											class="text-md hidden"
											aria-hidden
											id="refQueryParam"
											name="refQueryParam"
											value={url.searchParams.get('inv')}
										/>
										<Button
											type="submit"
											variant="default"
											class="text-md group flex w-full shrink-0 gap-2"
											size="lg"
										>
											Submit
											<div class="relative block">
												<img
													src="/images/salute.png"
													class="absolute h-4 min-h-4 w-4 min-w-4 group-hover:animate-ping"
													alt="A salute emoji"
												/>
												<img
													src="/images/salute.png"
													class="h-4 min-h-4 w-4 min-w-4"
													alt="A salute emoji"
												/>
											</div></Button
										>
									</form>
									<Drawer.Footer class="pt-2">
										<Drawer.Close asChild let:builder>
											<Button variant="outline" class="text-md" builders={[builder]}>Cancel</Button>
										</Drawer.Close>
									</Drawer.Footer>
								</Drawer.Content>
							</Drawer.Root>
						{/if}
						{#if confetti}
							<Confetti
								y={[-1, 1]}
								x={[-1, 1]}
								noGravity
								duration={750}
								amount={20}
								size={25}
								colorArray={['url(/images/salute.png)']}
							/>
						{/if}
					</div>
				</div>
				<div class="w-full max-w-sm md:max-w-none">
					<div
						class="ml-auto flex w-fit items-center justify-center gap-4 rounded-full border border-neutral-200 px-4 py-3"
					>
						<div class="h-4 w-4">
							<img src="/images/salute.png" alt="" />
						</div>

						<p class="text-sm font-semibold text-neutral-500">Already enlisted:</p>
						<ul class="flex -space-x-2">
							{#each { length: 5 } as _, i}
								<li
									class="box-content h-6 w-6 overflow-hidden rounded-full border-2 border-neutral-50"
								>
									<img class="h-full w-full" src={`/images/pfp-0${i + 1}.png`} alt="" />
								</li>
							{/each}
						</ul>
						{#if waitlistCount}
							<p class="text-sm font-semibold text-neutral-500">
								+<span class="tabular-nums"
									><Countup
										value={waitlistCount}
										initial={0}
										duration={1500}
										step={1}
										format={true}
									/></span
								>
							</p>
						{/if}
					</div>
				</div>
			{:else}
				<div class="inline-flex gap-2 items-center">
					<p>You're in!</p>
					<div class="h-4 w-4"><img src="/images/salute.png" alt="An emoji salute" /></div>
				</div>
				<p>
					Use the invite link below, and anyone who joins using it will show up in a lil' family
					tree on your profile card. Pretty cute!
				</p>

				<div class="flex gap-2">
					<input
						value={`https://buildinpublic.network/?inv=${referralId}`}
						class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 !cursor-copy"
						use:copy={`https://buildinpublic.network/?inv=${referralId}`}
						on:click={() => {
							toast.success('Copied to clipboard!', { position: 'bottom-center' });
						}}
					/>

					<button
						class="inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 items-center justify-center gap-2 py-2"
						use:copy={`https://buildinpublic.network/?inv=${referralId}`}
						on:click={() => {
							toast.success('Copied to clipboard!', { position: 'bottom-center' });
						}}>Copy invite <ClipboardCopy size="16" /></button
					>
				</div>
				<div class="shadow-lg border border-neutral-200 rounded-md overflow-hidden max-w-md">
					<img
						src="/images/referrals.png"
						alt="A screenshot of the UI showing a profile card with a number next to the username, which indicates how many other users have joined under this users referral ID."
					/>
				</div>
			{/if}
		</div>
		<div class="b-neutral-200 flex w-fit items-center gap-4 rounded-full border p-4 pr-5">
			<img
				src="/images/charlie-pfp.png"
				class="h-8 w-8 rounded-full"
				alt="Charlie Coppinger, the sites author"
			/>
			<a
				href="https://clips.twitch.tv/TenderTenaciousOrangeTinyFace-viSaxu39fnga-uxb"
				target="_blank"
				class="flex items-center justify-center gap-2 text-sm font-semibold text-neutral-500"
				>Built in public, live on X & Twitch, by <span class="underline underline-offset-2"
					>Charlie</span
				>
				<svg
					width="9"
					height="10"
					viewBox="0 0 9 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.950351 9.35293L0 8.40258L6.59024 1.81235H3.33189L3.32057 0.647034L8.71721 0.647034V6.04367L7.5519 6.03236L7.5519 2.75138L0.950351 9.35293Z"
						fill="#737373"
					/>
				</svg>
			</a>
		</div>
	</div>
	<div
		class="lg:1/3 hidden items-center justify-center overflow-hidden bg-neutral-100 lg:flex xl:w-1/2"
	>
		<div class="skew grid max-w-[4000px] grid-cols-2 gap-8">
			{#each { length: 8 } as _, i}
				<!-- <div
					class="border-1 box-border h-full w-full rounded-lg border-2 border-dashed border-neutral-200 shadow-lg transition-all delay-100 ease-linear hover:scale-105 hover:shadow-2xl"
				></div> -->
				<img
					class="rounded-lg shadow-lg transition-all delay-100 ease-linear hover:scale-105 hover:shadow-2xl"
					src={`/images/profile-card-stripped-${i + 1}.png`}
					alt=""
				/>
				<!-- <div
					class="border-1 box-border h-full w-full rounded-lg border-2 border-dashed border-neutral-200 shadow-lg transition-all delay-100 ease-linear hover:scale-105 hover:shadow-2xl"
				></div> -->
			{/each}
		</div>
	</div>
</div>

<Toaster />
