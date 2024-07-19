import React from 'react';
import './Partners.css'; // Import the CSS file for styling

const Partners = () => {
    const partners = [
        { name: 'PagTurugan', logo: '/pagTurugan.png', url: 'http://192.168.10.42' },
        { name: 'CafeReyes', logo: '/CafeReyes.png', url: 'http://192.168.10.18:3000' },
        { name: 'Clickers', logo: '/CLickers.png', url: 'http://192.168.10.17' },
        { name: 'Ingco', logo: '/INGCO.png', url: 'http://192.168.10.29' },
        { name: 'KFC', logo: '/kfc.png', url: 'http://192.168.10.19' },
        { name: 'ShoePatoes', logo: '/Logo.jpg', url: 'http://192.168.10.26' },
        { name: 'MedPoint', logo: '/MedPoint.png', url: 'http://192.168.10.29' },
        { name: 'Motortrade', logo: '/Motortrade.jpg', url: 'http://192.168.10.23' },
        { name: 'National Bookstore', logo: '/NationalBookStore.jpg', url: 'http://192.168.10.24' },
        { name: 'OH MART', logo: '/OHMART.jpg', url: 'http://192.168.10.21' },
        { name: 'ParaPo', logo: '/ParaPo.png', url: 'http://192.168.10.37' },
        { name: 'SaveMore', logo: '/SavemoreLogo.png', url: 'http://192.168.10.25' },
        { name: 'TiagoShop', logo: '/TiagoShopLogo.png', url: 'http://192.168.10.13' },
        { name: 'Toyota', logo: '/Toyota.png', url: 'http://192.168.10.38' },
        { name: 'TX', logo: '/tx.png', url: 'http://192.168.10.22' },
        { name: 'UnionBank', logo: '/UnionBank.png', url: 'http://192.168.10.14' },
        { name: 'watsons', logo: '/WATSONS.png', url: 'http://192.168.10.27' },
        { name: 'WNE', logo: '/WNE.png', url: 'http://192.168.10.12' },

        { name: 'WNE', logo: '/WNE.png', url: 'http://192.168.10.43/' },
        // Add more partners as needed
    ];

    return (
        <div className="partners-container">
            <h1>Our Partners</h1>
            <div className="partners-logos">
                {partners.map((partner, index) => (
                    <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="partner-item">
                        <img src={partner.logo} alt={partner.name} className="partner-logo" />
                        <div className="partner-caption">{partner.name}</div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Partners;
