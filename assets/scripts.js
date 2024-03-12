const images = [
	{
		src: "./assets/images/gallery/concerts/aaron-paul.webp",
		alt: "Foule à un concert de nuit",
		category: "Concert",
		id: "1",
	},
	{
		src: "./assets/images/gallery/entreprise/ali-morshedlou.webp",
		alt: "Homme en costume regardant l'objectif",
		category: "Entreprises",
		id: "2",
	},
	{
		src: "./assets/images/gallery/entreprise/jason-goodman.webp",
		alt: "Deux femmes assisent rigolant",
		category: "Entreprises",
		id: "3",
	},
	{
		src: "./assets/images/gallery/mariage/hannah-busing.webp",
		alt: "Gros plan sur des mains",
		category: "Mariages",
		id: "4",
	},
	{
		src: "./assets/images/gallery/portraits/ade-tunji.webp",
		alt: "Portrait d'un homme fermant les yeux",
		category: "Portrait",
		id: "5",
	},
	{
		src: "./assets/images/gallery/mariage/jakob-owens.webp",
		alt: "Deux mariés marchant joyeusement",
		category: "Mariages",
		id: "6",
	},
	{
		src: "./assets/images/gallery/portraits/nino-van-prattenburg.webp",
		alt: "Portrait d'une femme regardant vers le bas",
		category: "Portrait",
		id: "7",
	},
	{
		src: "./assets/images/gallery/concerts/austin-neill.webp",
		alt: "Chanteur sur scene avec de la fumée",
		category: "Concert",
		id: "8",
	},
	{
		src: "./assets/images/gallery/entreprise/mateus-campos-felipe.webp",
		alt: "Femme joyeuse devant un ordinateur portable",
		category: "Entreprises",
		id: "9",
	},
];

const filters = [
	{
		name: "Tous",
		category: "Tous",
	},
	{
		name: "Concert",
		category: "Concert",
	},
	{
		name: "Entreprises",
		category: "Entreprises",
	},
	{
		name: "Mariages",
		category: "Mariages",
	},
	{
		name: "Portrait",
		category: "Portrait",
	},
];

// Récupération de la gallerie
const gallery = document.querySelector(".gallery");

// Creation des filtres
function createFilter(param) {
	const ulFilter = document.createElement("ul");
	ulFilter.classList.add("my-4-tags-bar", "nav", "nav-pills");

	param.forEach((element) => {
		ulFilter.innerHTML += `<li class="nav-item"><span class="nav-link active-tag" data-images-toggle="${element.category}">${element.name}</span></li>`;
	});

	gallery.appendChild(ulFilter);
}

createFilter(filters);

function activeFilter() {
	const navLink = document.querySelectorAll(".nav-link");

	document.addEventListener("DOMContentLoaded", function () {
		const defaultFilter = document.querySelector(
			'.nav-link[data-images-toggle="Tous"]'
		);
		defaultFilter.classList.add("active");
		defaultFilter.click();
	});

	navLink.forEach((element) => {
		element.addEventListener("click", () => {
			navLink.forEach((btn) => {
				btn.classList.remove("active");
			});
			element.classList.add("active");
		});
	});
}

activeFilter();

// Creation de la gallerie d'images
// function createGallery(param) {
// 	const imgGallery = document.createElement("div");
// 	imgGallery.classList.add("gallery-items-row", "row");

// 	param.forEach((element) => {
// 		imgGallery.innerHTML += `<div class="item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 modal-trigger" data-gallery-tag="${element.category}"><img class="gallery-item img-fluid ${element.category} modal-trigger" data-gallery-tag="${element.category}" src="${element.src}" alt="${element.alt}" loading="lazy"></div>`;
// 	});

// 	gallery.appendChild(imgGallery);
// }

// createGallery(images);

//test creation gallerie --------------------------------------------------------------
// Creation de la gallerie d'images
function createGallery(param) {
	const imgGallery = document.createElement("div");
	imgGallery.classList.add("gallery-items-row", "row");

	param.forEach((element) => {
		const itemColumn = document.createElement("div");
		itemColumn.classList.add(
			"item-column",
			"mb-4",
			"col-12",
			"col-sm-6",
			"col-md-4",
			"col-lg-4",
			"col-xl-4"
		);
		itemColumn.setAttribute("data-gallery-tag", element.category);

		const image = document.createElement("img");
		image.classList.add(
			"gallery-item",
			"img-fluid",
			element.category,
			"modal-trigger"
		);
		image.setAttribute("data-gallery-tag", element.category);
		image.setAttribute("src", element.src);
		image.setAttribute("alt", element.alt);
		image.setAttribute("loading", "lazy");

		// Ajout d'un gestionnaire d'événement de clic à chaque image pour ouvrir la modal
		image.addEventListener("click", function () {
			const imageSrc = this.getAttribute("src");
			const imageAlt = this.getAttribute("alt");
			const imageCategory = this.getAttribute("data-gallery-tag");
			openModal(imageSrc, imageAlt, imageCategory);
		});

		itemColumn.appendChild(image);
		imgGallery.appendChild(itemColumn);
	});

	gallery.appendChild(imgGallery);
}

createGallery(images);

// Affichage des images par rapport au filtre
function showFilter(a, b) {
	b.forEach(function (item) {
		if (a === "Tous" || item.getAttribute("data-gallery-tag").includes(a)) {
			item.style.display = "block";
			item.classList.add("fade-in");
		} else {
			item.style.display = "none";
		}
	});
}

function useFilter() {
	const filtre = document.querySelectorAll(".nav-link");

	filtre.forEach((element) => {
		const idFilter = element.getAttribute("data-images-toggle");
		element.addEventListener("click", () => {
			// Supprimer les images actuelles de la galerie
			const imgGallery = document.querySelector(".gallery-items-row");
			imgGallery.parentNode.removeChild(imgGallery);

			// Récupérer les images correspondant au filtre sélectionné
			const filteredImages = images.filter(
				(img) => img.category === idFilter || idFilter === "Tous"
			);

			// Recréer la galerie avec les images filtrées
			createGallery(filteredImages);

			// Appliquer les effets de filtre sur les nouvelles images
			const imgfilter = document.querySelectorAll(".gallery-item");
			const imgBox = document.querySelectorAll(".item-column");
			showFilter(idFilter, imgfilter);
			showFilter(idFilter, imgBox);
		});
	});
}

useFilter();

//test creation gallerie et modal ---------------------------------------------
// Fonction pour créer et ouvrir la modal
function openModal(imageSrc, imageAlt, imageCategory) {
	const customModal = document.querySelector(".custom-modal");
	const customModalContainer = document.querySelector(
		".custom-modal-container"
	);
	const body = document.querySelector("body");
	body.classList.add("modal-open");

	customModalContainer.classList.add("active");
	const modalBox = document.createElement("div");
	modalBox.classList.add("custom-modal-content");
	modalBox.innerHTML = `
                <div class="modal-body">
                    <span class="arrowModal arrowModalLeft"><</span>
                    <img class="imgModal" src="${imageSrc}" alt="${imageAlt}" data-gallery-tag="${imageCategory}">
					<span class="arrowModal arrowModalRight">></span>
                </div>
			`;
	customModal.appendChild(modalBox);

	const modal = document.querySelector(".overlayModal");
	modal.addEventListener("click", closeModal);
}

// Fonction pour fermer la modal
function closeModal() {
	const cleanModal = document.querySelector(".custom-modal-content");
	const disableModal = document.querySelector(".custom-modal-container");
	const body = document.querySelector("body");

	body.classList.remove("modal-open");

	disableModal.classList.remove("active");
	cleanModal.parentNode.removeChild(cleanModal);
}
