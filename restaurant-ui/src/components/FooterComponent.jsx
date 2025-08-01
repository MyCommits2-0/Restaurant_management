// src/components/FooterComponent.jsx
const FooterComponent = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-auto shadow-inner">
      <p className="text-sm">&copy; {new Date().getFullYear()} Restaurant Management System. All rights reserved.</p>
    </footer>
  );
};

export default FooterComponent;
