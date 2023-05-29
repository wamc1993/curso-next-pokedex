export const setLocalFavorites = (pokemonId: number): void => {
	let favorites: number[] = JSON.parse(
		localStorage.getItem("favorites") || "[]"
	);

	if (favorites.includes(pokemonId)) {
		favorites = favorites.filter((id) => id !== pokemonId);
	} else {
		favorites = [...favorites, pokemonId];
	}

	localStorage.setItem("favorites", JSON.stringify(favorites));
};

/**
 * Debido a que un valor que retorna esta función es usado para asignarse a una propiedad de un elemento de la UI
 * puede que NextJS intente correr esta función en el backend, y además correrá en el front end
 */
export const isLocalFavorite = (pokemonId: number): boolean => {
	if (typeof window === "undefined") {
		//Si este código corre en el servidor, retornaremos false
		return false;
	}

	const favorites: number[] = JSON.parse(
		localStorage.getItem("favorites") || "[]"
	);

	return favorites.includes(pokemonId);
};

export const getFavorites = (): number[] => {
	return JSON.parse(localStorage.getItem("favorites") || "[]");
};
