import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { destinations } from "../data/destinations";
import { setFavorites } from "../redux/destinationSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DestinationCard from "../components/DestinationCard";

const Favourites = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [favDestinations, setFavDestinations] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const userData = snap.data();
        const favIds = userData.favorites || [];
        dispatch(setFavorites(favIds));

        const favs = destinations.filter((d) => favIds.includes(d.id));
        setFavDestinations(favs);
      }

      setLoading(false);
    };

    loadFavorites();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Your Favorite Destinations ❤️
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : favDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                showCompareButton={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            You haven't favorited any destinations yet.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favourites;
