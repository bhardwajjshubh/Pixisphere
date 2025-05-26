import axios from "axios";

const API_URL = "http://localhost:3001";

// Mock data with placeholder images
const MOCK_PHOTOGRAPHERS = [
  {
    id: 1,
    name: "Ravi Studio",
    location: "Bengaluru",
    price: 10000,
    rating: 4.6,
    styles: ["Outdoor", "Studio"],
    tags: ["Candid", "Maternity"],
    bio: "Award-winning studio specializing in maternity and newborn shoots.",
    profilePic:
      "https://images.unsplash.com/photo-1603425013520-e0b30e6e37dc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Ananya",
        rating: 5,
        comment: "Truly amazing photos and experience!",
        date: "2024-12-15",
      },
    ],
  },
  {
    id: 2,
    name: "Lens Queen Photography",
    location: "Delhi",
    price: 15000,
    rating: 4.2,
    styles: ["Candid", "Indoor"],
    tags: ["Newborn", "Birthday"],
    bio: "Delhi-based candid specialist for kids and birthday parties.",
    profilePic:
      "https://plus.unsplash.com/premium_photo-1661954400491-41d29414d354?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Priya",
        rating: 4,
        comment: "Very professional and punctual!",
        date: "2024-10-01",
      },
    ],
  },
  {
    id: 3,
    name: "Click Factory",
    location: "Mumbai",
    price: 8000,
    rating: 4.8,
    styles: ["Studio", "Outdoor", "Traditional"],
    tags: ["Wedding", "Pre-wedding"],
    bio: "Capturing timeless wedding stories across India.",
    profilePic:
      "https://images.unsplash.com/photo-1637250067262-758c5b8fb18c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Rahul",
        rating: 5,
        comment: "We loved every single moment they captured.",
        date: "2025-01-22",
      },
    ],
  },
  {
    id: 4,
    name: "Moments by Neha",
    location: "Bengaluru",
    price: 12000,
    rating: 4.3,
    styles: ["Outdoor", "Candid"],
    tags: ["Maternity", "Couple"],
    bio: "Natural light specialist focusing on emotional storytelling.",
    profilePic:
      "https://images.unsplash.com/photo-1632582204758-5ac65783517a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Sneha",
        rating: 4.5,
        comment: "Captured our maternity journey so beautifully.",
        date: "2024-11-05",
      },
    ],
  },
  {
    id: 5,
    name: "Snapshot Studio",
    location: "Hyderabad",
    price: 7000,
    rating: 3.9,
    styles: ["Studio"],
    tags: ["Birthday", "Family"],
    bio: "Affordable indoor shoots with creative themes.",
    profilePic:
      "https://images.unsplash.com/photo-1463421585849-6b0acf2c9257?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://placekitten.com/800/600?image=14",
      "https://placekitten.com/800/600?image=15",
    ],
    reviews: [
      {
        name: "Vikram",
        rating: 3.5,
        comment: "Decent service, could improve on punctuality.",
        date: "2024-09-10",
      },
    ],
  },
  {
    id: 6,
    name: "Pixel Perfect",
    location: "Chennai",
    price: 9500,
    rating: 4.7,
    styles: ["Candid", "Traditional", "Studio"],
    tags: ["Wedding", "Corporate", "Fashion"],
    bio: "Versatile photography team specializing in multiple genres with a unique style.",
    profilePic:
      "https://images.unsplash.com/photo-1602261320832-b087fc36979a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Karthik",
        rating: 5,
        comment: "Exceptional attention to detail and very accommodating.",
        date: "2024-08-15",
      },
      {
        name: "Meera",
        rating: 4.5,
        comment: "Professional service and stunning photos!",
        date: "2024-07-22",
      },
    ],
  },
  {
    id: 7,
    name: "Frame Stories",
    location: "Kolkata",
    price: 11000,
    rating: 4.4,
    styles: ["Documentary", "Candid"],
    tags: ["Wedding", "Travel", "Street"],
    bio: "Storytelling through frames - capturing authentic moments as they unfold.",
    profilePic:
      "https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Abhijit",
        rating: 4,
        comment: "Great documentary style photography, very natural results.",
        date: "2024-09-05",
      },
    ],
  },
  {
    id: 8,
    name: "Shutter Dreams",
    location: "Pune",
    price: 13500,
    rating: 4.9,
    styles: ["Fine Art", "Portrait", "Outdoor"],
    tags: ["Pre-wedding", "Fashion", "Portfolio"],
    bio: "Award-winning fine art photography creating dreamy, artistic portraits.",
    profilePic:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Sheetal",
        rating: 5,
        comment:
          "Absolutely stunning work! They turned our simple shoot into art.",
        date: "2024-11-18",
      },
      {
        name: "Rohan",
        rating: 5,
        comment:
          "Worth every penny! The photographs look like magazine covers.",
        date: "2024-10-30",
      },
    ],
  },
  {
    id: 9,
    name: "Light Chasers",
    location: "Jaipur",
    price: 8500,
    rating: 4.1,
    styles: ["Traditional", "Architectural"],
    tags: ["Wedding", "Heritage", "Commercial"],
    bio: "Specializing in heritage photography that captures the rich culture of Rajasthan.",
    profilePic:
      "https://plus.unsplash.com/premium_photo-1679634977413-5eeaab88c298?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Deepak",
        rating: 4,
        comment: "They captured our palace wedding beautifully.",
        date: "2024-12-01",
      },
    ],
  },
  {
    id: 10,
    name: "Focus Fusion",
    location: "Bengaluru",
    price: 9000,
    rating: 4.5,
    styles: ["Outdoor", "Candid", "Aerial"],
    tags: ["Maternity", "Family", "Drone"],
    bio: "Modern photography studio incorporating latest tech including drone photography.",
    profilePic:
      "https://images.unsplash.com/photo-1598006640672-f0cc33c40702?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    portfolio: [
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572892990013-3ca8406d9ba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      {
        name: "Aditi",
        rating: 4.5,
        comment: "The aerial shots of our maternity shoot were breathtaking!",
        date: "2024-08-22",
      },
    ],
  },
];

// Use the mock data directly
export const getPhotographers = async (params = {}) => {
  console.log("Using mock photographers data");
  try {
    // For demonstration, you can simulate filtering here
    let filteredData = [...MOCK_PHOTOGRAPHERS];

    // Example: Simple name filtering if search param is provided
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredData = filteredData.filter(
        (photographer) =>
          photographer.name.toLowerCase().includes(searchLower) ||
          photographer.location.toLowerCase().includes(searchLower) ||
          photographer.tags.some((tag) =>
            tag.toLowerCase().includes(searchLower)
          )
      );
    }

    return filteredData;
  } catch (error) {
    console.error("Error handling mock photographers:", error);
    return MOCK_PHOTOGRAPHERS;
  }
};

export const getPhotographerById = async (id) => {
  console.log(`Getting photographer with ID: ${id}`);
  // Convert id to number if it's passed as a string
  const photographerId = typeof id === "string" ? parseInt(id, 10) : id;
  const photographer = MOCK_PHOTOGRAPHERS.find((p) => p.id === photographerId);

  if (!photographer) {
    console.error(`Photographer with ID ${id} not found`);
    return null;
  }

  return photographer;
};

// Optional: Add a function to get featured photographers
export const getFeaturedPhotographers = async () => {
  // Return photographers with rating above 4.5
  return MOCK_PHOTOGRAPHERS.filter((p) => p.rating >= 4.5);
};

// Optional: Add a function to get popular styles
export const getPopularStyles = async () => {
  // Extract all styles and count their frequency
  const allStyles = MOCK_PHOTOGRAPHERS.flatMap((p) => p.styles);
  const styleCounts = allStyles.reduce((acc, style) => {
    acc[style] = (acc[style] || 0) + 1;
    return acc;
  }, {});

  // Convert to array and sort by frequency
  return Object.entries(styleCounts)
    .map(([style, count]) => ({ style, count }))
    .sort((a, b) => b.count - a.count);
};
