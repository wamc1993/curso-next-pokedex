import type { NextPage, GetStaticProps } from "next";

import { pokeApi } from "../api";
import Layout from "../components/layouts";
import { PokemonList } from "../components/pokemon";
import { PokedexResponse, PokemonSimple } from "../interfaces";

interface Properties {
	pokemons: PokemonSimple[];
}

const HomePage: NextPage<Properties> = ({ pokemons }) => {
	return (
		<Layout title="pokedex">
			<PokemonList pokemons={pokemons} />
		</Layout>
	);
};

/**
 *
 * getStaticProps es una función que se ejecuta en el servidor al momento de hacer
 * build del proyecto.
 *
 * Esta función es útil cuando al momento de hacer build disponemos de la información necesaria
 * par crear la página, y una vez creada, no necesitamos hacer cambios.
 * Generar la página y tenerla lista en el servidor, hace que sea muy rapido enviársela al cliente.
 *
 * Este método sólo puede ser definido para páginas
 *
 * Debido a que este método se ejecuta en el servidor, se podría acceder al file system del servidor,
 * acceder a bases de datos y demás cosas de backend
 */
export const getStaticProps: GetStaticProps = async (ctx) => {
	const {
		data: { results },
	} = await pokeApi.get<PokedexResponse>("/pokemon?limit=151");

	const pokemons = results.map((result) => {
		const matches = result.url.match(/^.*\/([0-9]+)\/$/);
		const id = Number(matches?.[1] ?? 0);
		const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

		return {
			...result,
			id,
			img,
		};
	});

	//Este console.log no se va a imprimir en el navegador del usuario,
	//En modo desarrollo, lo veremos en la terminal en donde levantamos
	//al proyecto con npm run dev
	//console.log(pokemons);

	return {
		props: {
			pokemons: pokemons,
		},
	};
};

export default HomePage;
