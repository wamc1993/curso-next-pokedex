import React from "react";
import { Grid } from "@nextui-org/react";

import { PokemonCard } from "..";
import { PokemonSimple } from "../../../interfaces";

interface Properties {
	pokemons: PokemonSimple[];
}

export const PokemonList: React.FC<Properties> = ({ pokemons }: Properties) => {
	return (
		<Grid.Container gap={2} justify="flex-start">
			{pokemons.map((pokemon) => (
				<Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
					<PokemonCard pokemon={pokemon} />
				</Grid>
			))}
		</Grid.Container>
	);
};
