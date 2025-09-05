import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const BreakingNews = () => {
    const breakingNews = [
        "Breaking: Major technological breakthrough announced in renewable energy sector",
        "Election Updates: Latest polling results show significant changes in voter sentiment",
        "Economy: Stock markets reach new heights amid positive economic indicators",
        "Sports: Championship finals set for this weekend with record-breaking attendance expected"
    ];

    return (
        <div className="bg-red-600 text-white overflow-hidden">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="flex items-center space-x-2 flex-shrink-0 mr-4"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-bold text-sm">BREAKING</span>
                    </motion.div>
                    <div className="flex-1 overflow-hidden">
                        <motion.div
                            animate={{ x: ["100%", "-100%"] }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="whitespace-nowrap"
                        >
                            {breakingNews.map((news, index) => (
                                <span key={index} className="inline-block mx-8 text-sm">
                                    {news}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;