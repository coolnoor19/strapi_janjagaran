import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, User, Share2 } from "lucide-react";

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="w-full h-full"
                />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Main story */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center space-x-4">
                            <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                TRENDING
                            </span>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">2 hours ago</span>
                            </div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl lg:text-5xl font-bold leading-tight"
                        >
                            Revolutionary AI Technology Transforms Global Healthcare Industry
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xl text-gray-300 leading-relaxed"
                        >
                            Breakthrough artificial intelligence system shows promising results in early diagnosis 
                            and treatment recommendations, potentially saving millions of lives worldwide.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex items-center space-x-6"
                        >
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-300">Dr. Sarah Johnson</span>
                            </div>
                            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="flex space-x-4"
                        >
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                Read Full Story
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                                Watch Video
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Featured image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative overflow-hidden rounded-2xl shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1631563020941-c0c6bc534b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwaGlnaC1xdWFsaXR5JTIwaW1hZ2UlMjBkZXBpY3RpbmclMjBhZHZhbmNlZCUyMEFJJTIwaGVhbHRoY2FyZSUyMHRlY2hub2xvZ3klMkMlMjBzaG93Y2FzaW5nJTIwYSUyMGZ1dHVyaXN0aWMlMjBhbmQlMjBpbm5vdmF0aXZlJTIwdGhlbWUufGVufDB8fHx8MTc1NzA1MDk2OXww&ixlib=rb-4.1.0&q=80&w=200$w=2070"
                                alt="AI Healthcare Technology"
                                className="w-full h-80 lg:h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            
                            {/* Play button overlay */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer">
                                    <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Floating stats */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">2.5M</div>
                                    <div className="text-xs text-gray-300">Readers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">845</div>
                                    <div className="text-xs text-gray-300">Shares</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;