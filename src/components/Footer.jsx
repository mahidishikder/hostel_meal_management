import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 grid-cols-1 gap-8 pb-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-3">HostelManager</h2>
          <p className="text-sm">
            Your smart way to manage meals, rent, and hostel life. Simple, fast, and efficient.
          </p>
          <div className="flex gap-4 mt-4 text-white">
            <a href="#"><FaFacebookF className="hover:text-orange-500" /></a>
            <a href="#"><FaTwitter className="hover:text-orange-500" /></a>
            <a href="#"><FaInstagram className="hover:text-orange-500" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-orange-500" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/meals" className="hover:text-orange-400">Meals</Link></li>
            <li><Link to="/upcoming-meals" className="hover:text-orange-400">Upcoming Meals</Link></li>
            <li><Link to="/rules" className="hover:text-orange-400">Hostel Rules</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Contact</h3>
          <p className="text-sm mb-2">📍 123 Hostel Rd, Dhaka, Bangladesh</p>
          <p className="text-sm mb-2">📞 +880 1234-567890</p>
          <p className="text-sm">✉️ support@hostelmanager.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Newsletter</h3>
          <p className="text-sm mb-2">Get updates & offers in your inbox.</p>
          <form className="flex flex-col gap-3 mt-2">
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 rounded bg-gray-800 border border-gray-600 text-sm"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="text-orange-400">HostelManager</span> — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
