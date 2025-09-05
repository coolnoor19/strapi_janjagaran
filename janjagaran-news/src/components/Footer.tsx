import { motion } from "framer-motion";
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Youtube, 
    Mail, 
    Phone, 
    MapPin,
    ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
    const footerSections = [
        {
            title: "News Categories",
            links: ["Politics", "Business", "Technology", "Sports", "World News", "Health", "Opinion", "Entertainment"]
        },
        {
            title: "Company",
            links: ["About Us", "Our Team", "Careers", "Press Kit", "Contact", "Advertise", "Ethics Policy", "Corrections"]
        },
        {
            title: "Services",
            links: ["Newsletter", "Mobile App", "RSS Feeds", "Podcasts", "Live TV", "Archives", "Newsletters", "Events"]
        },
        {
            title: "Support",
            links: ["Help Center", "Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Feedback", "Report Error", "Subscriptions"]
        }
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", color: "hover:text-blue-600" },
        { icon: Twitter, href: "#", color: "hover:text-blue-400" },
        { icon: Instagram, href: "#", color: "hover:text-pink-500" },
        { icon: Youtube, href: "#", color: "hover:text-red-500" }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main footer content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">J</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Janjagaran
                                    </h3>
                                    <p className="text-gray-400 text-sm">Truth in Every Story</p>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Your trusted source for breaking news, in-depth analysis, and 
                                comprehensive coverage of events that shape our world.
                            </p>

                            {/* Social links */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            whileHover={{ scale: 1.2, y: -2 }}
                                            className={`text-gray-400 ${social.color} transition-all duration-200`}
                                        >
                                            <IconComponent className="w-6 h-6" />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer sections */}
                    {footerSections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (index + 1), duration: 0.6 }}
                        >
                            <h4 className="font-bold text-lg mb-4 text-white">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Contact info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-12 pt-8 border-t border-gray-800"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Email</p>
                                <p className="text-white">contact@janjagaran.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Phone</p>
                                <p className="text-white">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Address</p>
                                <p className="text-white">123 News Street, Media City</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom footer */}
            <div className="bg-gray-950 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} Janjagaran. All rights reserved. 
                            Trusted news since 2024.
                        </p>
                        
                        <div className="flex items-center space-x-6">
                            <div className="flex space-x-4 text-sm">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Terms
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Cookies
                                </a>
                            </div>

                            <Button
                                onClick={scrollToTop}
                                size="sm"
                                variant="outline"
                                className="border-gray-700 text-gray-400 hover:text-white hover:border-white"
                            >
                                <ArrowUp className="w-4 h-4 mr-2" />
                                Back to Top
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;