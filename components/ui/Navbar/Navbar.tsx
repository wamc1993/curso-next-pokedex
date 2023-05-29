import Image from "next/image";
import NextLink from "next/link";
import React, { CSSProperties } from "react";
import { useTheme, Text, Spacer } from "@nextui-org/react";

import styles from "./styles.module.scss";

export const Navbar = () => {
	const { theme } = useTheme();

	const containerStyle: CSSProperties = {
		backgroundColor: theme?.colors.gray100.value,
	};

	return (
		<div className={styles.container} style={containerStyle}>
			<Image
				src={
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png"
				}
				alt=""
				width={70}
				height={70}
			/>
			<NextLink href="/">
				<div style={{ display: "flex", alignItems: "center" }}>
					<Text color="white" h2>
						P
					</Text>
					<Text color="white" h3>
						okemon
					</Text>
				</div>
			</NextLink>

			<Spacer css={{ flex: 1 }} />

			<NextLink href="/favorites">
				<Text color="white">Favoritos</Text>
			</NextLink>
		</div>
	);
};
