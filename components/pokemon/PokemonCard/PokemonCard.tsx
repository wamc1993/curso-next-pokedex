import React from "react";
import { useRouter } from "next/router";
import { Card, Row, Text } from "@nextui-org/react";

import { PokemonSimple } from "../../../interfaces";

interface Properties {
	pokemon: PokemonSimple;
	showsName?: boolean;
}

export const PokemonCard: React.FC<Properties> = ({
	pokemon,
	showsName = true,
}: Properties) => {
	const { img, id, name } = pokemon;

	const router = useRouter();

	const onClick = () => {
		router.push(`/pokemon/${pokemon.id}`);
	};

	return (
		<Card isHoverable isPressable onClick={onClick}>
			<Card.Body css={{ p: 1 }}>
				<Card.Image src={img} width="100%" height={140} />
			</Card.Body>
			{showsName && (
				<Card.Footer>
					<Row justify="space-between">
						<Text transform="capitalize">{name}</Text>
						<Text>#{id}</Text>
					</Row>
				</Card.Footer>
			)}
		</Card>
	);
};
