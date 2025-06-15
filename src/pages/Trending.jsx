import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrending } from "../redux/destinationSlice";
import { getTrendingDestinations } from "../utils/getTrendingDestinations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DestinationCard from "../components/DestinationCard";
import { TrendingUp } from "lucide-react";

const Trending = () => {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.destination.trending);

  useEffect(() => {
    const trendingDests = getTrendingDestinations(4);
    dispatch(setTrending(trendingDests));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Trending Destinations
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Discover what's popular among travelers right now
          </p>
        </div>

        {trending.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {trending.map((destination, index) => (
              <div key={destination.id} className="relative">
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                  <span>#{index + 1}</span>
                  <TrendingUp className="w-3 h-3" />
                </div>

                <DestinationCard
                  destination={destination}
                  showCompareButton={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Loading trending destinations...
            </h3>
            <p className="text-gray-500">
              Please wait while we fetch the latest trends
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Trending;
