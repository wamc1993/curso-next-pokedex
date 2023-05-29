import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

import { CssBaseline } from "@nextui-org/react";

/**
 * Este archivo tiene por principal finalidad definir la estructura HTML raiz de todas las páginas que entregamos
 * (al igual cque _app.tsx, que es llamado para todas las páginas).
 * Aquí podemos definir el orden y las propiedades de las etiquetas <body> y <head>, que serpan comunes en todas
 * las páginas de la aplicación.
 * No es buena idea añadir en este archivo importación de CSSs o custom components (para esto, usar el _app.tsx)
 */

class MyDocument extends Document {
	// Por defecto, el método getInitialProps en su forma más sencilla, se vería así
	// static async getInitialProps(ctx: DocumentContext) {
	// 	const initialProps = await Document.getInitialProps(ctx);
	// 	return { ...initialProps };
	// }

	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps, styles: <>{initialProps.styles}</> };
	}

	/**
	 * El Head de next/document es diferente al Head de next/Head. El primero se usa para definir valores dentro del <head></head>
	 * que se desean retornar en todas las páginas consumibles de la aplicación.
	 * El segundo Head, se usa dentro de cada página en particular, para definir variables o elementos propios de la página como
	 * el <title></title>
	 */

	/**
	 * Para esta aplicación, implementamos el _document.tsx porque debemos incluir una configuración común en el <head></head>
	 * para que la librería de NextUi funcione.
	 */

	render() {
		return (
			<Html lang="es">
				<Head>{CssBaseline.flush()}</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
