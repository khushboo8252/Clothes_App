const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p>&copy; {new Date().getFullYear()} Digital Clothing Store. All rights reserved.</p>
        <p>
          <a href="/about" className="text-blue-400 hover:underline mx-2">About</a> |
          <a href="/contact" className="text-blue-400 hover:underline mx-2">Contact</a> |
          <a href="/privacy" className="text-blue-400 hover:underline mx-2">Privacy Policy</a>
        </p>
      </footer>
    );
  };
  
  export default Footer;
  