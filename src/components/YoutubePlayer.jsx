import { useState, useEffect } from "react";

export function Youtube() {
	const [videoInfo, setVideoInfo] = useState(null);
	const [isLive, setIsLive] = useState(false);

	useEffect(() => {
		// ID del video en el enlace proporcionado
		const videoId = "jF2R-DS6ApI";

		// Clave de API de YouTube (debes obtenerla en la consola de desarrolladores de Google)
		const apiKey = "TU_CLAVE_DE_API_DE_YOUTUBE";

		// URL para obtener información del video
		const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,liveStreamingDetails`;

		// Hacer la solicitud a la API de YouTube
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				const videoData = data.items[0];
				setVideoInfo(videoData);

				// Verificar si el video está transmitiendo en vivo
				if (
					videoData &&
					videoData.liveStreamingDetails &&
					videoData.liveStreamingDetails.concurrentViewers > 0
				) {
					setIsLive(true);
				}
			})
			.catch((error) =>
				console.error("Error fetching YouTube data", error)
			);
	}, []); // Se ejecuta solo cuando el componente se monta

	return (
		<article className="youtube relative flex flex-col items-center h-full w-full">
			{isLive ? (
				<span className="absolute text-sm font-medium text-red-500">
					En Vivo
				</span>
			) : (
				<span className="absolute text-sm font-medium text-yellow-500">
					Nicov Best Highlights
				</span>
			)}
			<iframe
				style={{ borderRadius: "8px", height: "100%", width: "100%" }}
				src={`https://www.youtube.com/embed/${
					videoInfo ? videoInfo.id : "jF2R-DS6ApI"
				}?si=1x1CkZ4cci5ibE93&amp;controls=0&amp;start=10&mute=1&autoplay=1`}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen></iframe>
		</article>
	);
}
