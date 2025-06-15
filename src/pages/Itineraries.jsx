import { useSelector, useDispatch } from "react-redux";
import { destinations } from "../data/destinations";
import { removeFromItinerary, clearItinerary } from "../redux/destinationSlice";
import Navbar from "../components/Navbar";
import { Trash2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Itineraries = () => {
  const dispatch = useDispatch();
  const itineraryList = useSelector((state) => state.destination.itineraryList);

  const itineraryDestinations = destinations.filter((dest) =>
    itineraryList.includes(dest.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          🗺 Your Itinerary
        </h2>

        {itineraryDestinations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {itineraryDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-xl shadow-md p-4 relative"
                >
                  <button
                    onClick={() => dispatch(removeFromItinerary(dest.id))}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{dest.country}</p>
                  <Link
                    to={`/destination/${dest.id}`}
                    className="text-blue-600 font-medium text-sm mt-2 inline-block"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
            <button
              onClick={() => dispatch(clearItinerary())}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Clear All Itinerary
            </button>
          </>
        ) : (
          <div className="text-center py-24">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-600">
              No destinations in your itinerary yet.
            </p>
            <Link
              to="/recommendations"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Browse Destinations
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Itineraries;
