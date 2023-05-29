import { NextPage } from "next";
import React, { useState, useEffect } from "react";

import { getFavorites } from "../../utils";
import Layout from "../../components/layouts";
import { FavoritePokemonList, NoFavorites } from "../../components/pokemon";

const FavoritesPage: NextPage = () => {
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

	useEffect(() => {
		setFavoriteIds(getFavorites());
	}, []);

	return (
		<Layout title="favorites">
			{favoriteIds.length === 0 ? (
				<NoFavorites />
			) : (
				<FavoritePokemonList favoriteIds={favoriteIds} />
			)}
		</Layout>
	);
};

export default FavoritesPage;
