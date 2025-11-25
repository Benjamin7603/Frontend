import React from 'react';
import '../styles/About.css';

const About = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Juan Pérez",
            position: "CEO & Fundador",
            description: "Más de 10 años de experiencia en el sector tecnológico. Apasionado por la innovación y el emprendimiento.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Maria González",
            position: "Directora de Tecnología",
            description: "Ingeniera en Computación con especialización en desarrollo de software y arquitectura de sistemas.",
            // CAMBIO: Imagen nueva y segura de Pexels
            image: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 3,
            name: "Carlos Rodríguez",
            position: "Director de Marketing",
            description: "Especialista en marketing digital y estrategias de crecimiento para empresas tecnológicas.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        }
    ];

    return (
        <div className="about-page">
            <section className="about-hero">
                <h1>Sobre Nosotros</h1>
                <p>Conoce al equipo detrás de TechStore</p>
            </section>

            <section className="team-section">
                <div className="container">
                    <h2>Nuestro Equipo</h2>
                    <div className="team-grid">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="team-card">
                                <div className="team-image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="team-info">
                                    <h3>{member.name}</h3>
                                    <p className="position">{member.position}</p>
                                    <p className="description">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="values-section">
                <div className="container">
                    <h2>Nuestros Valores</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <h4>💡 Innovación</h4>
                            <p>Siempre buscamos las últimas tendencias y tecnologías.</p>
                        </div>
                        <div className="value-card">
                            <h4>🤝 Confianza</h4>
                            <p>Construimos relaciones duraderas basadas en la transparencia.</p>
                        </div>
                        <div className="value-card">
                            <h4>⭐ Calidad</h4>
                            <p>Solo ofrecemos productos de la más alta calidad.</p>
                        </div>
                        <div className="value-card">
                            <h4>🚀 Crecimiento</h4>
                            <p>Nos adaptamos y evolucionamos con el mercado.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;