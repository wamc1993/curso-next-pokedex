import confetti from "canvas-confetti";
import { ParsedUrlQuery } from "querystring";
import React, { useState, useEffect } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import {
	isLocalFavorite,
	setLocalFavorites,
	getPokemonDetails,
} from "../../utils";
import { pokeApi } from "../../api";
import Layout from "../../components/layouts";
import { PokedexResponse, PokemonBasicDetails } from "../../interfaces";

interface Params extends ParsedUrlQuery {
	name: string;
}

interface Properties {
	pokemon: PokemonBasicDetails;
}

const PokemonByNamePage: NextPage<Properties> = ({ pokemon }: Properties) => {
	const {
		name,
		id,
		baseImage,
		frontDefault,
		frontShiny,
		backDefault,
		backShiny,
	} = pokemon;

	const [isFavorite, setIsFavorite] = useState<Boolean>(false);

	const onToggleFavorite = () => {
		if (!isFavorite) {
			confetti({
				zIndex: 999,
				particleCount: 180,
				spread: 160,
				angle: -100,
				origin: {
					x: 1,
					y: 0,
				},
			});
		}
		setLocalFavorites(id);
		setIsFavorite((prev) => !prev);
	};

	useEffect(() => {
		setIsFavorite(isLocalFavorite(id));
	}, []);

	return (
		<Layout title={name} favicon={frontDefault}>
			<Grid.Container css={{ marginTop: "5px" }} gap={2}>
				<Grid xs={12} sm={4}>
					<Card isHoverable isPressable css={{ padding: "30px" }}>
						<Card.Body>
							<Card.Image
								src={baseImage}
								alt={name}
								width="100%"
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header>
							<Container
								display="flex"
								alignItems="center"
								css={{
									flexDirection: "column",
									justifyContent: "center",
									"@xs": {
										flexDirection: "column",
										justifyContent: "center",
									},
									"@sm": {
										flexDirection: "row",
										justifyContent: "space-between",
									},
								}}
							>
								<Text h1 transform="capitalize">
									{name}
								</Text>
								<Button
									color="gradient"
									ghost={!isFavorite}
									onClick={onToggleFavorite}
								>
									{isFavorite
										? "En favoritos"
										: "Guardar en favoritos"}
								</Button>
							</Container>
						</Card.Header>
						<Card.Body>
							<Container display="flex" direction="column">
								<Text size={30}>Sprites:</Text>
								<Container
									direction="row"
									display="flex"
									justify="space-between"
									gap={0}
								>
									<Image
										src={frontDefault}
										alt={`${name} front default`}
										width={100}
										height={100}
									/>
									<Image
										src={backDefault}
										alt={`${name} back default`}
										width={100}
										height={100}
									/>
									<Image
										src={frontShiny}
										alt={`${name} front shiny`}
										width={100}
										height={100}
									/>
									<Image
										src={backShiny}
										alt={`${name} back shiny`}
										width={100}
										height={100}
									/>
								</Container>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths<Params> = async (ctx) => {
	const {
		data: { results },
	} = await pokeApi.get<PokedexResponse>("/pokemon?limit=151");

	const paths = results.map(({ name }) => ({
		params: { name },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (cxt) => {
	const { name } = cxt.params as { name: string };

	//getPokemonDetails puede recibir como parámetro el nombre o el id(como string) de un pokemon
	const pokemon = await getPokemonDetails(name);

	return {
		props: {
			pokemon,
		},
	};
};

export default PokemonByNamePage;
