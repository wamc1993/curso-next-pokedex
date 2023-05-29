import React from "react";
import { Grid } from "@nextui-org/react";

import { PokemonCard } from "..";
import { PokemonSimple } from "../../../interfaces";

interface Properties {
	favoriteIds: number[];
}

export const FavoritePokemonList: React.FC<Properties> = ({
	favoriteIds,
}: Properties) => {
	return (
		<Grid.Container gap={2} direction="row" justify="flex-start">
			{favoriteIds.map((id) => {
				const pokemon: PokemonSimple = {
					id,
					url: "",
					name: "",
					img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
				};

				return (
					<Grid key={id} xs={6} sm={3} md={2} xl={1}>
						<PokemonCard pokemon={pokemon} showsName={false} />
					</Grid>
				);
			})}
		</Grid.Container>
	);
};
