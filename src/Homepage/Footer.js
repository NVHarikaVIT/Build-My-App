import React from 'react';

function Footer() {
  return (
    <div>
        <footer className="footer-content fixed-bottom"
            style={{fontWeight:"300px",fontSize:"25px", textAlign:"center",backgroundColor:"black",color: "lightgrey", position:"relative", bottom:"0"}}>
            <p> &copy; This website is developed by Harika Nune in Jul 2024.</p>
        </footer>
    </div>
  )
}

export default Footer;
