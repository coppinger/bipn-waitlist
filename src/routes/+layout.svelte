<script>
	import '../app.pcss';
	import '@fontsource-variable/manrope';
</script>

<svelte:head>
	<title>Build in Public Network</title>
	<meta name="title" content="Build in Public Network" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
	/>
	<meta
		name="description"
		content="Discover creators who are sharing their journey with the world—a curated list & community of indie hackers and founders who are building in public"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://buildinpublic.network" />
	<meta property="og:title" content="Build in Public Network" />
	<meta
		property="og:description"
		content="Discover creators who are sharing their journey with the world—a curated list & community of indie hackers and founders who are building in public"
	/>
	<meta property="og:image" content="/images/meta-cover.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://buildinpublic.network" />
	<meta property="twitter:title" content="Build in Public Network" />
	<meta
		property="twitter:description"
		content="Discover creators who are sharing their journey with the world—a curated list & community of indie hackers and founders who are building in public"
	/>
	<meta property="twitter:image" content="/images/meta-cover.jpg" />
</svelte:head>

<slot />
