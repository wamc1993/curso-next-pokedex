## Pokedex en NextJS

Este proyecto fue el resultado de trabajo hecho en las secciones 3 y 4 del curso de NextJs de Fernando Herrera.
Fue un proyecto de muchos aprendizajes, y seguramente, una fuente de consulta para futuros momentos.

De todo lo realizado, resalto los siguientes conceptos que aprendí y que considero de interés:

-   NextJS por defecto no permitirá usar urls de imágenes de dominios "desconocidos". Previamente, hay que editar el archivo next.config.js (apartado de domains), con los dominios de los sitios de donde obtendremos las imángenes.
-   Un archivo muy interesante es el `_document.tsx`. En caso de querer implementarlo, lo debemos crear en la carpeta `pages`, al mismo nivel que el archivo `_app.tsx`.

    -   El objetivo de `_document.tsx` es permitir definir la estructura de los tags básicos de HTML: <head> y <body>.
    -   Podemos usar `_document.tsx` para definir propiedades en el <head> que queremos que estén presentes y constantes en todas las páginas que entregemos al cliente (si queremos personalizar una propiedad en el head en una página particular, usemos el <Head> de `next/head`).

-   Vimos la diferencia entre una página estática y una página generada con la técnica de static site generation (SSG).

    -   Las páginas generadas con SSG implementan el método `getStaticProps`, y opcionalmente, el método `getStaticPaths`.
    -   `getStaticProps` se ejecuta en tiempo de build, y define las propiedades que va a recibir la página.
    -   `getStaticPaths` se ejecuta en tiempo de build, y se usa para páginas cuyo nombre es parametrizable (en este proyecto tenemos 2 páginas así: [id].tsx y [name].tsx). con `getStaticPaths` podemos definir las posibles rutas que esperamos que coincidan para la página.
    -   Con NextJS podemos ver la versión productiva de una forma muy sencilla, corriendo el comando `npm run start`. Es muy recomendable ejecutar anets un `npm run build`.

    -   Con NextJS, es muy común que gran parte del código que hagamos se ejecute en backend y en frontend.

        -   En general, todas las constantes calculadas que definamos dentro de los componentes, la inicialización de constantes y useStates, y los fragmentos de código que se usa directa e indirectamente para setear propiedades de componentes que se renderizan, se ejecutarán tanto en back como en front.
        -   Una forma de distinguir si estamos en backend o en frontend, es hacer la validación `typeof window === 'undefined'`. En frontend, window es de tipo Object y por ende la validación retornará false, mientras que en backend retornaría true.
        -   Siempre que hagamos código en NextJS, vale la pena preguntarnos si esto se ejecutará en front, back o en ambos. Importante para evitar errores como por ejemplo, instrucciones en donde se accede al localstorage.

    -   Cuando creeemos páginas o componentes, garantizemos que el render incial generado en backend sea el mismo que en el frontend. Para lograr esto, es importante que la inicialización de las variables en front y en backend sea igual.
        -   En este proyecto se presentó un error con un componente que tenía un useState interno que se inicializaba con el localStorage. Internamente se puso un condicional para que si el backend intentaba "consumir al local storage" obtubiera un false. Esto lo detectó NextJS como un error, ya que en el backend, el state siempre se inicializaba con false, pero en el frontend, podría inicializarse con false o true, en función de localstorage. Debido a que este state interno lo usábamos para definir el label de un botón, obviamente el render generado por backend podía ser diferente al de frontend.
        -   La solución fue hacer la inicialización de este state interno con un false (de esa forma, backend y frontend generaban el mismo renderizado). Luego, definimos un useEffect en donde seteabamos el state interno con el valor persistido en el localStorage.
    -   Consejos de SEO:
        -   Definimos etiquetas básicas en el <head></head> del layout de las páginas, que mejoran el SEO del sitio web:
            -   <meta name="author">
            -   <meta name="description">
            -   <meta name="keywords">
        -   Definirmos algunas etiquetas de Open Graph. Open Graph es un protocolo/estandar de metatags que podemos poner en el head de nuestros sitios, y que son usadas por las aplicaciones y las redes sociales al momento de enviar o compartir un enlace de nuestra página (podemos definir el preview y la descripción):
            -   <meta name="og:title">
            -   <meta name="og:description">
            -   <meta name="og:image">
            -   Si quieres leer más sobre Open Graph, revisa este enlace: [https://ahrefs.com/blog/open-graph-meta-tags/](https://ahrefs.com/blog/open-graph-meta-tags/)
            -   Algo muy recomendable en sitios de ventas de productos, es hacer que las páginas de los detalles de cada producto, tengan el nombre del producto.
                -   En este proyecto por ejemplo, implementamos la ruta [http://localhost:3000/name/pikachu](http://localhost:3000/name/pikachu) para acceder a la página de detalles de pikachu. A nivel de SEO esto es muy bueno.
                -   Este consejo se aplica en sitios web como Amazon y mercadolibre, donde la url incluye al nombre comercial del producto, por ejemplo mira este enlace: https://articulo.mercadolibre.com.co/MCO-1021671915-combo-2-ventiladores-samurai-air-maxx-blanco-con-azul-_JM?variation=175598250230#reco_item_pos=3&reco_backend=machinalis-p2p&reco_backend_type=function&reco_client=home_navigation-related-recommendations&reco_id=9d919317-942b-4eb0-ae32-c30efed4b51c&c_id=/home/navigation-related-recommendations/element&c_element_order=4&c_uid=1b355cfb-c759-4c59-b4b1-7c5f7cfb2eae
