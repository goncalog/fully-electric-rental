import React from 'react';

function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="footer">
            <footer className="py-2 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">
                        Copyright &copy; { year } FullyElectric
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
