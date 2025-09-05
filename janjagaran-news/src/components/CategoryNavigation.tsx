import { motion } from "framer-motion";
import { 
    Briefcase, 
    Globe, 
    Zap, 
    TrendingUp, 
    Users, 
    Gamepad2, 
    Heart,
    Car
} from "lucide-react";

const CategoryNavigation = () => {
    const categories = [
        { name: "Politics", icon: Users, color: "from-red-500 to-pink-500", count: "1.2k" },
        { name: "Business", icon: Briefcase, color: "from-green-500 to-emerald-500", count: "856" },
        { name: "Technology", icon: Zap, color: "from-blue-500 to-cyan-500", count: "2.1k" },
        { name: "Sports", icon: Gamepad2, color: "from-orange-500 to-yellow-500", count: "934" },
        { name: "World", icon: Globe, color: "from-purple-500 to-violet-500", count: "1.5k" },
        { name: "Health", icon: Heart, color: "from-pink-500 to-rose-500", count: "678" },
        { name: "Markets", icon: TrendingUp, color: "from-indigo-500 to-blue-500", count: "1.1k" },
        { name: "Automotive", icon: Car, color: "from-gray-500 to-slate-500", count: "432" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore News Categories</h2>
                    <p className="text-gray-600">Stay informed across all topics that matter to you</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
                >
                    {categories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <motion.div
                                key={category.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="group cursor-pointer"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                                    >
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </motion.div>
                                    
                                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        {category.name}
                                    </h3>
                                    
                                    <p className="text-sm text-gray-500">
                                        {category.count} articles
                                    </p>

                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 mx-auto"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Quick stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="text-3xl font-bold mb-1"
                            >
                                12.5K+
                            </motion.div>
                            <p className="text-blue-100">Articles Published</p>
                        </div>
                        <div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.1, duration: 0.5 }}
                                className="text-3xl font-bold mb-1"
                            >
                                2.8M
                            </motion.div>
                            <p className="text-blue-100">Monthly Readers</p>
                        </div>
                        <div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                                className="text-3xl font-bold mb-1"
                            >
                                150+
                            </motion.div>
                            <p className="text-blue-100">Expert Journalists</p>
                        </div>
                        <div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.3, duration: 0.5 }}
                                className="text-3xl font-bold mb-1"
                            >
                                24/7
                            </motion.div>
                            <p className="text-blue-100">Breaking News</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CategoryNavigation;