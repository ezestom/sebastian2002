export function Youtube() {
	/* add an amazing animation to the social icons and put inside const*/

	return (
		<article class="youtube relative flex flex-col items-center h-full w-full ">
			<span class="absolute text-sm font-medium text-yellow-500">
				Sebastian 2002 AOE
			</span>
			<iframe
				style={{ borderRadius: "8px", height: "100%", width: "100%" }}
				src="https://www.youtube.com/embed/3VTLwrbW_jM?si=sc6f5A9Nwi8bYIMM&autoplay=1&mute=1
"
				title="YouTube video player"
				// frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen></iframe>
		</article>
	);
}
