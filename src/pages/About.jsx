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
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Carlos Rodríguez",
            position: "Director de Marketing",
            description: "Especialista en marketing digital y estrategias de crecimiento para empresas tecnológicas.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Ana López",
            position: "Jefa de Ventas",
            description: "Amplia experiencia en ventas B2B y relaciones con clientes en el sector tecnológico.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
        }
    ];

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>Sobre Nosotros</h1>
                    <p>
                        En TechStore, nos apasiona la tecnología y creemos en su poder para transformar 
                        vidas. Desde 2020, nos dedicamos a ofrecer los mejores productos tecnológicos 
                        con un servicio excepcional.
                    </p>
                </div>
            </section>

            <section className="mission-vision">
                <div className="container">
                    <div className="mission-vision-grid">
                        <div className="mission-card">
                            <h3>Nuestra Misión</h3>
                            <p>
                                Hacer la tecnología accesible para todos, ofreciendo productos de calidad 
                                con el mejor servicio al cliente y precios competitivos.
                            </p>
                        </div>
                        <div className="vision-card">
                            <h3>Nuestra Visión</h3>
                            <p>
                                Ser la tienda de tecnología de referencia en Latinoamérica, reconocida 
                                por nuestra innovación, calidad y compromiso con los clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-section">
                <div className="container">
                    <h2>Nuestro Equipo</h2>
                    <p className="team-subtitle">
                        Conoce al equipo detrás de TechStore
                    </p>
                    
                    <div className="team-grid">
                        {teamMembers.map(member => (
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