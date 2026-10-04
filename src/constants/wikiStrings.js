// Text for the encyclopaedia (Wiki) page. Names for the language menu are in each language.
export const wikiLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
];

const en = {
    siteTitle: 'K.AI OS Encyclopaedia', siteSubtitle: 'The free-ish profile page', back: 'Back to OS',
    toolsLabel: 'Article tools', contentsLabel: 'Contents', tabsLabel: 'Article actions', languages: 'Languages',
    navArticle: 'Article', career: 'Career', research: 'Research', teaching: 'Teaching', topics: 'Selected topics', links: 'External links',
    tabs: ['Article', 'Talk', 'Read', 'View source', 'View history'],
    from: 'From K.AI OS Encyclopaedia, the personal academic website namespace.',
    notice: 'This article is part of an experimental personal website interface. For formal institutional details, see the University of Bath profile and ORCID record.',
    photoAlt: 'Karim Anaya-Izquierdo in front of a blackboard covered in equations',
    photoCaption: 'Anaya-Izquierdo at the blackboard',
    info: [['Occupation', 'Senior Lecturer in Statistics'], ['Institution', 'University of Bath'], ['Department', 'Mathematical Sciences'], ['Fields', 'Statistics, Bayesian methods, survival analysis'], ['Tools', 'R, Python, Quarto, LaTeX']],
    orcid: 'ORCID',
    lead1: ' is a Senior Lecturer in Statistics in the Department of Mathematical Sciences at the University of Bath. His work spans information geometry, uncertainty quantification in mechanical engineering, survival analysis, spatial methods in epidemiology, and applications of Bayesian methods.',
    lead2: 'His teaching includes probability for data science, introductory data science, and design of experiments.',
    careerText: 'Anaya-Izquierdo is based at the University of Bath, where he works in mathematical sciences and statistics. The site presents his academic work through several fictional interfaces: a GitHub-style research repository, a Moodle-style teaching page, a VS Code-style academic workspace, and this encyclopaedia article.',
    researchText: ['His research interests include statistical geometry, Bayesian modelling, uncertainty quantification, survival analysis, and spatial epidemiology. In the K.AI OS site, research material is organised through the fake repository interface under ', '.'],
    teachingText: ['His teaching profile includes introductory probability and statistics, data science, and design of experiments. Teaching content is represented as a package-style page under ', '.'],
    topicList: ['Information geometry and statistical manifolds.', 'Bayesian methods for applied scientific problems.', 'Spatial and epidemiological modelling.', 'Uncertainty quantification for engineering applications.', 'AI-assisted academic workflows and reproducible research.'],
    linkList: ['ORCID record', 'GitHub profile', 'University of Bath research profile'],
    mode: ['Switch to dark theme', 'Switch to light theme'],
};

const es = {
    siteTitle: 'Enciclopedia K.AI OS', siteSubtitle: 'La página de perfil casi libre', back: 'Volver al OS',
    toolsLabel: 'Herramientas del artículo', contentsLabel: 'Contenidos', tabsLabel: 'Acciones del artículo', languages: 'Idiomas',
    navArticle: 'Artículo', career: 'Trayectoria', research: 'Investigación', teaching: 'Docencia', topics: 'Temas seleccionados', links: 'Enlaces externos',
    tabs: ['Artículo', 'Discusión', 'Leer', 'Ver código', 'Ver historial'],
    from: 'De la Enciclopedia K.AI OS, el espacio de nombres del sitio web académico personal.',
    notice: 'Este artículo forma parte de una interfaz experimental de sitio web personal. Para datos institucionales formales, consulte el perfil de la Universidad de Bath y el registro ORCID.',
    photoAlt: 'Karim Anaya-Izquierdo frente a una pizarra llena de ecuaciones',
    photoCaption: 'Anaya-Izquierdo frente a la pizarra',
    info: [['Ocupación', 'Profesor titular de Estadística (Senior Lecturer)'], ['Institución', 'Universidad de Bath'], ['Departamento', 'Ciencias Matemáticas'], ['Campos', 'Estadística, métodos bayesianos, análisis de supervivencia'], ['Herramientas', 'R, Python, Quarto, LaTeX']],
    orcid: 'ORCID',
    lead1: ' es profesor titular (Senior Lecturer) de Estadística en el Departamento de Ciencias Matemáticas de la Universidad de Bath. Su trabajo abarca la geometría de la información, la cuantificación de la incertidumbre en ingeniería mecánica, el análisis de supervivencia, los métodos espaciales en epidemiología y las aplicaciones de los métodos bayesianos.',
    lead2: 'Su docencia incluye probabilidad para ciencia de datos, introducción a la ciencia de datos y diseño de experimentos.',
    careerText: 'Anaya-Izquierdo trabaja en la Universidad de Bath, en ciencias matemáticas y estadística. El sitio presenta su trabajo académico mediante varias interfaces ficticias: un repositorio de investigación al estilo de GitHub, una página docente al estilo de Moodle, un espacio de trabajo académico al estilo de VS Code y este artículo enciclopédico.',
    researchText: ['Sus intereses de investigación incluyen la geometría estadística, el modelado bayesiano, la cuantificación de la incertidumbre, el análisis de supervivencia y la epidemiología espacial. En el sitio K.AI OS, el material de investigación se organiza mediante la interfaz de repositorio ficticio en ', '.'],
    teachingText: ['Su perfil docente incluye probabilidad y estadística introductorias, ciencia de datos y diseño de experimentos. El contenido docente se presenta como una página al estilo de un paquete en ', '.'],
    topicList: ['Geometría de la información y variedades estadísticas.', 'Métodos bayesianos para problemas científicos aplicados.', 'Modelado espacial y epidemiológico.', 'Cuantificación de la incertidumbre para aplicaciones de ingeniería.', 'Flujos de trabajo académicos asistidos por IA e investigación reproducible.'],
    linkList: ['Registro ORCID', 'Perfil de GitHub', 'Perfil de investigación de la Universidad de Bath'],
    mode: ['Cambiar a tema oscuro', 'Cambiar a tema claro'],
};

export const wikiStrings = { en, es };

// Bio language: saved choice, else the browser's language, else English.
export const WIKI_LANG_KEY = 'wiki-lang';
export const initialWikiLang = () => {
    try {
        const saved = localStorage.getItem(WIKI_LANG_KEY);
        if (wikiStrings[saved]) return saved;
    } catch { /* storage blocked */ }
    const nav = (typeof navigator !== 'undefined' ? navigator.language : 'en').slice(0, 2);
    return wikiStrings[nav] ? nav : 'en';
};
