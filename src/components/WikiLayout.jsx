import React from 'react';
import { VscArrowLeft } from 'react-icons/vsc';
import './WikiLayout.css';

const WikiLayout = ({ setActiveFile }) => {
    return (
        <div className="wiki-layout-wrapper">
            <header className="wiki-site-header">
                <div className="wiki-wordmark" onClick={() => setActiveFile('Welcome')}>
                    <span className="wiki-mark">W</span>
                    <div>
                        <div className="wiki-title-small">K.AI OS Encyclopaedia</div>
                        <div className="wiki-subtitle-small">The free-ish profile page</div>
                    </div>
                </div>
                <button type="button" className="wiki-back-button" onClick={() => setActiveFile('Welcome')}>
                    <VscArrowLeft size={16} />
                    Back to OS
                </button>
            </header>

            <main className="wiki-page">
                <aside className="wiki-left-rail" aria-label="Article tools">
                    <nav>
                        <a href="#overview">Article</a>
                        <a href="#career">Career</a>
                        <a href="#research">Research</a>
                        <a href="#teaching">Teaching</a>
                        <a href="#links">External links</a>
                    </nav>
                </aside>

                <article className="wiki-article">
                    <div className="wiki-article-tabs" aria-label="Article actions">
                        <span className="active">Article</span>
                        <span>Talk</span>
                        <span>Read</span>
                        <span>View source</span>
                        <span>View history</span>
                    </div>

                    <h1 id="overview">Karim Anaya-Izquierdo</h1>
                    <p className="wiki-disambiguation">
                        From K.AI OS Encyclopaedia, the personal academic website namespace.
                    </p>

                    <div className="wiki-notice">
                        This article is part of an experimental personal website interface. For formal institutional details, see the University of Bath profile and ORCID record.
                    </div>

                    <aside className="wiki-infobox">
                        <div className="wiki-infobox-title">Karim Anaya-Izquierdo</div>
                        <img src="/images/Bath_Crest.png" alt="University of Bath crest" />
                        <table>
                            <tbody>
                                <tr><th>Occupation</th><td>Senior Lecturer in Statistics</td></tr>
                                <tr><th>Institution</th><td>University of Bath</td></tr>
                                <tr><th>Department</th><td>Mathematical Sciences</td></tr>
                                <tr><th>Fields</th><td>Statistics, Bayesian methods, survival analysis</td></tr>
                                <tr><th>Tools</th><td>R, Python, Quarto, LaTeX</td></tr>
                                <tr><th>ORCID</th><td><a href="https://orcid.org/0000-0001-9718-5256" target="_blank" rel="noreferrer">0000-0001-9718-5256</a></td></tr>
                            </tbody>
                        </table>
                    </aside>

                    <p>
                        <strong>Karim Anaya-Izquierdo</strong> is a Senior Lecturer in Statistics in the Department of Mathematical Sciences at the University of Bath. His work spans information geometry, uncertainty quantification in mechanical engineering, survival analysis, spatial methods in epidemiology, and applications of Bayesian methods.
                    </p>
                    <p>
                        His teaching includes probability for data science, introductory data science, and design of experiments. This page presents a deliberately encyclopaedic version of the site: factual, compact, and less playful than the terminal, GitHub, and PyPI views.
                    </p>

                    <nav className="wiki-contents" aria-label="Contents">
                        <div className="wiki-contents-title">Contents</div>
                        <ol>
                            <li><a href="#career">Career</a></li>
                            <li><a href="#research">Research</a></li>
                            <li><a href="#teaching">Teaching</a></li>
                            <li><a href="#selected-topics">Selected topics</a></li>
                            <li><a href="#links">External links</a></li>
                        </ol>
                    </nav>

                    <h2 id="career">Career</h2>
                    <p>
                        Anaya-Izquierdo is based at the University of Bath, where he works in mathematical sciences and statistics. The site presents his academic work through several fictional interfaces: a GitHub-style research repository, a PyPI-style teaching package, a VS Code-style profile workspace, and this encyclopaedia article.
                    </p>

                    <h2 id="research">Research</h2>
                    <p>
                        His research interests include statistical geometry, Bayesian modelling, uncertainty quantification, survival analysis, and spatial epidemiology. In the K.AI OS site, research material is organised through the fake repository interface under <button type="button" className="wiki-inline-link" onClick={() => setActiveFile('projects.html')}>Research</button>.
                    </p>

                    <h2 id="teaching">Teaching</h2>
                    <p>
                        His teaching profile includes introductory probability and statistics, data science, and design of experiments. Teaching content is represented as a package-style page under <button type="button" className="wiki-inline-link" onClick={() => setActiveFile('current_courses.ipynb')}>Teaching</button>.
                    </p>

                    <h2 id="selected-topics">Selected topics</h2>
                    <ul>
                        <li>Information geometry and statistical manifolds.</li>
                        <li>Bayesian methods for applied scientific problems.</li>
                        <li>Spatial and epidemiological modelling.</li>
                        <li>Uncertainty quantification for engineering applications.</li>
                        <li>AI-assisted academic workflows and reproducible research.</li>
                    </ul>

                    <h2 id="links">External links</h2>
                    <ul>
                        <li><a href="https://orcid.org/0000-0001-9718-5256" target="_blank" rel="noreferrer">ORCID record</a></li>
                        <li><a href="https://github.com/kanayai" target="_blank" rel="noreferrer">GitHub profile</a></li>
                        <li><a href="https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo" target="_blank" rel="noreferrer">University of Bath research profile</a></li>
                    </ul>
                </article>
            </main>
        </div>
    );
};

export default WikiLayout;
