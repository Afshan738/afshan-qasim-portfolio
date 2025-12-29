import React, { useEffect, useState } from 'react';
import "./About.css";
import { API_URL } from '../config';
const About = () => {
    const [aboutContent, setAboutContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


useEffect(() => {
    fetch(`${ API_URL }/api/sitecontent`)
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                const contentObject = Array.isArray(data) ? data[0] : data;
                setAboutContent(contentObject);
            }
        
        })
        .catch((error) => {
            console.error("Error fetching about content:", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
}, []);

    if (isLoading || !aboutContent) {
        return <section id="about" className="about-section"><div>Loading...</div></section>;
    }

    return (
        <>
            <section id="about" className="about-section">
                <div className="about-grid">
                    <div className="text-content">
                        <h2>{aboutContent.aboutHeadline}</h2>
                        <p>{aboutContent.aboutDescription}</p>
                    </div>
                    <div className="image-content">
                        <img src={aboutContent.aboutImageUrl} alt="Afshan Qasim" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;