import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "./redux/authSlice";
import {
  setFavorites,
  setItineraryList,
  setComparisonList,
} from "./redux/destinationSlice";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Route, Routes, Navigate } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import { auth, db } from "./firebase";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Survey from "./pages/Survey";
import Recommendations from "./pages/Recommendations";
import Favourites from "./pages/Favourites";
import Trending from "./pages/Trending";
import DestinationDetails from "./pages/DestinationDetails";
import Comparison from "./pages/Comparision";
import Itineraries from "./pages/Itineraries";

function App() {
  const dispatch = useDispatch();
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));

        // ✅ Fetch user-specific data from Firestore
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          dispatch(setFavorites(data.favorites || []));
          dispatch(setItineraryList(data.itinerary || []));
          dispatch(setComparisonList(data.comparison || []));
        }
      } else {
        dispatch(logoutUser());
        dispatch(setFavorites([]));
        dispatch(setItineraryList([]));
        dispatch(setComparisonList([]));
      }
      setAuthResolved(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!authResolved) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/survey"
        element={
          <ProtectedRoute>
            <Survey />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favourites"
        element={
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trending"
        element={
          <ProtectedRoute>
            <Trending />
          </ProtectedRoute>
        }
      />
      <Route
        path="/comparision"
        element={
          <ProtectedRoute>
            <Comparison />
          </ProtectedRoute>
        }
      />
      <Route
        path="/itineraries"
        element={
          <ProtectedRoute>
            <Itineraries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/destination/:id"
        element={
          <ProtectedRoute>
            <DestinationDetails />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
