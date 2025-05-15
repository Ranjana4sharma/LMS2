import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-semibold">About Us</h2>
          <p className="text-sm mt-2">
            LMS is a platform that empowers learners and educators with high-quality courses and interactive learning experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="text-sm mt-2">Email: support@lms.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-xl hover:text-blue-400"><FaFacebook /></a>
            <a href="#" className="text-xl hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="text-xl hover:text-blue-400"><FaInstagram /></a>
            <a href="#" className="text-xl hover:text-blue-400"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} LMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
