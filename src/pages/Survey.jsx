import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPreferences } from "../redux/preferenceSlice";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import {
  Mountain,
  Waves,
  Building,
  TreePine,
  Camera,
  Utensils,
  Heart,
  Users,
  DollarSign,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Footer from "../components/Footer";

const Survey = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferencesState] = useState({
    interests: [],
    activities: [],
    budget: "",
  });

  const steps = [
    {
      title: "What interests you most?",
      subtitle: "Select all that apply",
      key: "interests",
      multiple: true,
      options: [
        { value: "adventure", label: "Adventure", icon: Mountain },
        { value: "beach", label: "Beach", icon: Waves },
        { value: "culture", label: "Culture", icon: Building },
        { value: "nature", label: "Nature", icon: TreePine },
        { value: "photography", label: "Photography", icon: Camera },
        { value: "food", label: "Food", icon: Utensils },
        { value: "romantic", label: "Romantic", icon: Heart },
        { value: "nightlife", label: "Nightlife", icon: Users },
      ],
    },
    {
      title: "What activities excite you?",
      subtitle: "Select your favorite activities",
      key: "activities",
      multiple: true,
      options: [
        { value: "hiking", label: "Hiking", icon: Mountain },
        { value: "diving", label: "Diving", icon: Waves },
        { value: "sightseeing", label: "Sightseeing", icon: Camera },
        { value: "wellness", label: "Wellness", icon: Heart },
        { value: "wildlife", label: "Wildlife", icon: TreePine },
        { value: "architecture", label: "Architecture", icon: Building },
        { value: "history", label: "History", icon: Building },
        { value: "scenic", label: "Scenic", icon: Camera },
      ],
    },
    {
      title: "What's your travel budget?",
      subtitle: "Estimate per person",
      key: "budget",
      multiple: false,
      options: [
        { value: "budget", label: "Budget ($)", icon: DollarSign },
        { value: "mid-range", label: "Mid-range ($$)", icon: DollarSign },
        { value: "luxury", label: "Luxury ($$$)", icon: DollarSign },
        {
          value: "ultra-luxury",
          label: "Ultra Luxury ($$$$)",
          icon: DollarSign,
        },
      ],
    },
  ];

  const currentStepData = steps[currentStep];
  const isMultiple = currentStepData.multiple;
  const currentValue = preferences[currentStepData.key];

  const handleOptionSelect = (value) => {
    if (isMultiple) {
      const currentArray = currentValue || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      setPreferencesState({
        ...preferences,
        [currentStepData.key]: newArray,
      });
    } else {
      setPreferencesState({
        ...preferences,
        [currentStepData.key]: value,
      });
    }
  };

  const isOptionSelected = (value) => {
    if (isMultiple) {
      return (currentValue || []).includes(value);
    }
    return currentValue === value;
  };

  const canProceed = () => {
    if (isMultiple) {
      return (currentValue || []).length > 0;
    }
    return currentValue !== "";
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          await setDoc(
            userRef,
            {
              preferences,
              updatedAt: new Date(),
            },
            { merge: true }
          );

          dispatch(setPreferences(preferences));
          navigate("/dashboard");
        } else {
          alert("User not logged in");
        }
      } catch (error) {
        console.error("Error saving preferences:", error);
        alert("Failed to save preferences. Please try again.");
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Travel Preferences Survey
            </h1>
            <span className="text-sm text-gray-600">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 text-lg">{currentStepData.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {currentStepData.options.map((option) => {
              const Icon = option.icon;
              const isSelected = isOptionSelected(option.value);

              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-center hover:scale-105 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mx-auto mb-3 ${
                      isSelected ? "text-blue-600" : "text-gray-500"
                    }`}
                  />
                  <p className="font-medium text-sm">{option.label}</p>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
            >
              <span>
                {currentStep === steps.length - 1 ? "Complete Survey" : "Next"}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            Skip survey and explore destinations
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Survey;
