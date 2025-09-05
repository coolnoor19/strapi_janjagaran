import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Articles", path: "/articles" },
        { name: "Politics", path: "/articles?category=politics" },
        { name: "Business", path: "/articles?category=business" },
        { name: "Sports", path: "/articles?category=sports" },
        { name: "Technology", path: "/articles?category=technology" },
        { name: "World", path: "/articles?category=world" }
    ];

    return (
        <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-md sticky top-0 z-50"
        >
            <div className="container mx-auto px-4">
                {/* Top bar with logo and search */}
                <div className="flex items-center justify-between py-4 border-b">
                    <Link to="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">J</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Janjagaran
                                </h1>
                                <p className="text-xs text-gray-500">Truth in Every Story</p>
                            </div>
                        </motion.div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search news..."
                                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Subscribe
                        </Button>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="hidden md:block py-4">
                    <div className="flex items-center justify-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.div key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group ${
                                        location.pathname === item.path || (item.path === '/' && location.pathname === '/') 
                                            ? 'text-blue-600' 
                                            : ''
                                    }`}
                                >
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                                        location.pathname === item.path || (item.path === '/' && location.pathname === '/') 
                                            ? 'w-full' 
                                            : 'w-0 group-hover:w-full'
                                    }`}></span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </nav>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t"
                    >
                        <div className="flex flex-col space-y-4">
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search news..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                                        location.pathname === item.path || (item.path === '/' && location.pathname === '/') 
                                            ? 'text-blue-600' 
                                            : ''
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4">
                                Subscribe
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.header>
    );
};

export default Header;