import { pokeApi } from "../api";
import { PokemonDetails, PokemonBasicDetails } from "../interfaces";

/**
 * Este método puedo obtener pokemones a partir de su nombre o id.
 * Esto se debe a que la url para obtenerlo por id y por nombre, es la misma
 *
 * https://pokeapi.co/api/v2/pokemon/ditto
 * https://pokeapi.co/api/v2/pokemon/54
 */
export const getPokemonDetails = async (
	param: string
): Promise<PokemonBasicDetails> => {
	const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${param}`);
	const { name, sprites, id } = data;

	const {
		front_default: frontDefault,
		back_default: backDefault,
		front_shiny: frontShiny,
		back_shiny: backShiny,
		other: {
			dream_world: { front_default: baseImage = "no-image.png" } = {},
		} = {},
	} = sprites;

	return {
		id,
		name,
		baseImage,
		frontDefault,
		frontShiny,
		backDefault,
		backShiny,
	};
};
