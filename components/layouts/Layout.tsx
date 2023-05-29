import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

import { Navbar } from "../ui";
import styles from "./styles.module.scss";

interface Properties {
	title?: string;
	favicon?: string;
	children: ReactNode;
}

/**
 * Esta constante se inicializa como '' en el backend, pero en el front end
 * se inicializa con la url base de la página (http://localhost:3000) para nuestro entorno de desarrollo
 */
const origin = typeof window === "undefined" ? "" : window.location.origin;

const Layout: React.FC<Properties> = ({
	children,
	title,
	favicon = "/favicon.ico",
}: Properties) => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>{title ?? "Pokemon app"}</title>

				{/**Metatags básicos */}
				<meta name="author" content="William Montañez" />
				<meta
					name="description"
					content="Información sobre el pokemon"
				/>
				<meta name="keywords" content="pokemon, pokedex" />

				{/**Open graph Metatags */}
				<meta
					property="og:title"
					content="Ejemplo de pokedex con NextJs"
				/>
				<meta
					property="og:description"
					content="Una página creada con ReactJS y NextJS para enlistar los pokemones de la primera generación"
				/>
				<meta
					property="og:image"
					content={`${origin}/images/psyduck.png`}
				/>

				<link rel="icon" type="image/x-icon" href={favicon} />
			</Head>
			<Navbar />
			<main className={styles.main}>{children}</main>
		</>
	);
};

export default Layout;
