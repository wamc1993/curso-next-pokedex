import confetti from "canvas-confetti";
import { ParsedUrlQuery } from "querystring";
import React, { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import {
	isLocalFavorite,
	setLocalFavorites,
	getPokemonDetails,
} from "../../utils";
import Layout from "../../components/layouts";
import { PokemonBasicDetails } from "../../interfaces";

interface Properties {
	pokemon: PokemonBasicDetails;
}

interface Params extends ParsedUrlQuery {
	id: string;
}

const PokemonDetailsPage: NextPage<Properties> = ({ pokemon }: Properties) => {
	const {
		name,
		id,
		baseImage,
		frontDefault,
		frontShiny,
		backDefault,
		backShiny,
	} = pokemon;

	/**
	 * La instrucción comentada puede inducir errores de compilación en NextJS D:
	 * Esto se debe a que estamos inicializando el useState con una función que usa localStorage
	 *
	 * Next comprueba si renderizar esta página en backend y en frontend (sin correr los useEffects) da el
	 * mismo resultado. Si inicializamos a este state con isLocalFavorite(id), pasará lo siguiente:
	 *
	 * En backend, isLocalFavorite(id) siempre retorna false, ya que pusimos un condicional en esta función
	 * para que retorne false si se ejecuta en el backend
	 *
	 * En frontend, isLocalFavorite(id) puede retornar true o false, dependiendo de si el id del pokemon
	 * está guardado en el localstorage.
	 *
	 * Esto puede generar diferencias entre los renderizados de backend y frontend que NextJs percibirá como errores
	 *
	 * La solución es inicializar el useState en false (esta inicialización se hace en backend y frontend)
	 * y con un useEffect (que solo corre en el frontend), revisamos el localstorage
	 */
	// const [isFavorite, setIsFavorite] = useState<Boolean>(isLocalFavorite(id));
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

	/**
	 * Lo que está adentro de este useEffecto sólo se ejecutará en el navegador de los clientes
	 */
	useEffect(() => {
		setIsFavorite(isLocalFavorite(id));
	}, []);

	/**
	 * IMPORTANTE!
	 * El siguiente console.log() se ejecuta en el servidor y en el cliente o:
	 * Por ello, siempre pensemos en qué parte va a correr todo el código que hagamos.
	 * En este caso, el typeof window retornará 'Object' en el navegador, y
	 * 'undefined' en el servidor
	 */
	console.log(
		"Hola, soy una instrucción que se ejecuta en el backend y en el frontend",
		typeof window
	);

	/**
	 * Si quisieramos obtener el id del pokemon apartir de la URL
	 * en el LADO DEL CLIENTE, haríamos lo siguiente
	 * const router = useRouter()
	 * const {query} = router;
	 */

	/**
	 * IMPORTANTE
	 * la asignación de propiedades a los componentes que se renderizan aquí, se hace en el backend
	 * debido a que esta página la generamos con SSG (static site generation)
	 *
	 * Por ejemplo, el Button de favoritos tiene un texto que varía en función de la propiedad isFavorites.
	 * Este condicional se ejecuta en el backend, para generar el HTML
	 */
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

/**
 * getStaticPaths se especifica en páginas cuyo nombre de página es dinámico.
 * Se ejecuta antes de getStaticProps y su objetivo es generar en tiempo de build
 * las páginas con una ruta específica.
 * En nuestro ejemplo, tenemos la página [id].tsx, que en tiempo de build será
 * usada como plantilla para crear 151 páginas: pokemon/1, pokemon/2 etc
 *
 * Tiene 2 parámetros:
 * paths: es un array con todas las rutas que queremos generar
 * fallback: es el plan de acción en el caso que el cliente pida una página que encaje con la ruta dinámica pero
 * que no hemos generado en tiempo de ejecución. En este caso sería si el cliente pide el pokemon pokemon/200
 *
 * Definir fallback: false, hace que al especificar una ruta como pokemon/200 se haga una redirección a la página 404
 * Definir fallback: "blocking" permite cargar la página en el cliente, sólo que sin props (hay que definir en la interface
 * Properties que sus atributos pueden ser undefined). Esto es útil si ponemos un useEffect en el cliente, para que haga
 * manualmente el cargue del pokemon # 200
 *
 * de forma implícita, este método es quie define cuántas páginas se van a generar de esta plantilla/page
 */
export const getStaticPaths: GetStaticPaths<Params> = async (ctx) => {
	const pokemon151: string[] = [...Array(151)].map(
		(_, index) => `${index + 1}`
	);

	// Queremos generar 151 páginas, donde cada página tenga como parámetro en su url, al id del pokemon
	const paths = pokemon151.map((id) => ({
		params: { id },
	}));

	return {
		paths,
		fallback: false,
	};
};

/**
 * getStaticProps recibe el resultado de getStaticPaths a través del contexto
 */
export const getStaticProps: GetStaticProps = async (cxt) => {
	const { id } = cxt.params as { id: string };

	//getPokemonDetails puede recibir como parámetro el nombre o el id(como string) de un pokemon
	const pokemon = await getPokemonDetails(id);

	return {
		props: {
			pokemon,
		},
	};
};

export default PokemonDetailsPage;
