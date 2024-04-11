import { useState, useEffect } from "react";
import "./GalleryComponent.css";

const images = [
	"https://images8.alphacoders.com/680/680254.jpg",
	"https://i.blogs.es/be0c8f/241019-age2/1366_2000.jpg",
	"https://c4.wallpaperflare.com/wallpaper/379/318/378/age-of-empires-age-of-empires-ii-hd-wallpaper-preview.jpg",
	"https://c4.wallpaperflare.com/wallpaper/598/421/289/age-of-empires-age-of-empires-ii-hd-wallpaper-preview.jpg",
	"https://i.pinimg.com/originals/d2/15/1c/d2151caf69dca63b41955e143b3ba2bc.png",
	"https://steamuserimages-a.akamaihd.net/ugc/1252512422690044541/A17F9A446669E4B7630A4E34AFD08AE8CE20A280/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
	"https://w0.peakpx.com/wallpaper/811/15/HD-wallpaper-age-of-empires-ii-the-middle-age-siege-ultra-games-age-of-empires-game-strategy-videogame-ageofempires.jpg",
];

const loadImage = (path) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = path;
		img.onload = () => {
			resolve(img);
		};
		img.onerror = (e) => {
			reject(e);
		};
	});
};

const GalleryComponent = () => {
	const [activeLink, setActiveLink] = useState(0);
	const [skipViewTransitions, setSkipViewTransitions] = useState(false);

	const handleClick = async (index) => {
		setActiveLink(index);
		const url = images[index];
		const img = await loadImage(url);
		document.querySelector(".gallery__large img").setAttribute("src", url);
	};

	useEffect(() => {
		const galleryLinks = document.querySelectorAll(".gallery__previews a");
		galleryLinks.forEach((link, index) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				if (!document.startViewTransition || skipViewTransitions) {
					handleClick(index);
				} else {
					const curImage = document.querySelector(
						".gallery__previews a.active img"
					);
					const newImage = link.querySelector("img");
					const largeImage = document.querySelector(
						".gallery__large img"
					);

					newImage.style.viewTransitionName = "grow";
					largeImage.style.viewTransitionName = "shrink";

					const t = document.startViewTransition(async () => {
						largeImage.style.viewTransitionName = "grow";
						curImage.style.viewTransitionName = "shrink";
						newImage.style.viewTransitionName = "none";
						handleClick(index);
					});

					t.finished.then(() => {
						curImage.style.viewTransitionName = "none";
						newImage.style.viewTransitionName = "none";
						largeImage.style.viewTransitionName = "none";
					});
				}
			});
		});
	}, [skipViewTransitions]);

	return (
		<div className="gallery">
			<div className="gallery__large">
				<img
					src={images[activeLink]}
					alt=""
					title=""
					width="222"
					height="184"
					draggable="false"
				/>
			</div>
			<ul className="gallery__previews">
				{images.map((imageUrl, index) => (
					<li key={index} className="list-item">
						<a
							href="#"
							className={index === activeLink ? "active" : ""}>
							<img
								src={imageUrl}
								alt=""
								title=""
								width="222"
								height="184"
								draggable="false"
							/>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default GalleryComponent;
