import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BreakingNews from "@/components/BreakingNews";
import FeaturedArticles from "@/components/FeaturedArticles";
import CategoryNavigation from "@/components/CategoryNavigation";
import Footer from "@/components/Footer";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <BreakingNews />
            <Hero />
            <CategoryNavigation />
            <FeaturedArticles />
            <Footer />
        </div>
    );
};

export default HomePage; 