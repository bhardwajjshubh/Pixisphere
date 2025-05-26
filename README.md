# 📸 Photography Listing App

A responsive web application for browsing and filtering photographers by various criteria. This project demonstrates advanced front-end development skills including state management, filtering logic, and responsive UI design.

---

## 🚀 Features

* 📷 **Photographer Listing Page** with grid view of photographer cards
* 🧠 **Advanced Filtering** by price range, rating, styles, and location
* 🔍 **Search Functionality** with debounced input for performance
* ↕️ **Sorting Options** by rating, price, and recency
* 📱 **Responsive Design** for mobile, tablet, and desktop
* 👤 **Photographer Profile Pages** with portfolio gallery and reviews
* ✉️ **Inquiry Modal** for contacting photographers

---

## 🌐 Live Demo

Check out the live application: [Photography Listing App](https://pixisphere-murex.vercel.app/) <!-- Replace with actual link if available -->

---

## 🛠 Tech Stack

* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
* **HTTP Client:** Axios
* **UI Components:** `rc-slider` for range sliders, `react-icons` for icons

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

* Node.js (v14 or later)
* npm or yarn

### 📦 Installation

```bash
git clone https://github.com/your-username/photography-listing-app.git
cd photography-listing-app

# Install dependencies
npm install
# or
yarn install
```

### 🧪 Run the development server

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000`

---

## 🗄 Using with JSON Server (Optional)

To simulate a realistic API:

1. **Install JSON Server globally**

```bash
npm install -g json-server
```

2. **Create a `db.json` file** in the project root with photographer data (sample included)

3. **Run JSON Server**

```bash
json-server --watch db.json --port 3001
```

4. **Update API URL** in `services/api.js` to:

```js
http://localhost:3001/photographers
```

---

## 🧠 Implementation Notes

### 🔍 Filtering Logic

```js
const applyFilters = () => {
  let results = [...photographers];

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Price range filter
  results = results.filter(
    (item) =>
      item.price >= filters.priceRange[0] &&
      item.price <= filters.priceRange[1]
  );

  // Additional filters...

  setFilteredPhotographers(results);
};
```

### ⏳ Debouncing (Custom Hook)

```js
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

Used in:

* Search input (to delay filtering)
* Price range slider (to delay updates)

### 🔃 Sorting Implementation

```js
switch (filters.sortBy) {
  case "price-asc":
    results.sort((a, b) => a.price - b.price);
    break;
  case "rating-desc":
    results.sort((a, b) => b.rating - a.rating);
    break;
  case "recent":
    results.sort((a, b) => b.id - a.id);
    break;
  default:
    results.sort((a, b) => b.rating - a.rating);
    break;
}
```

---

## 🚀 State Management

* Local component state using `useState`
* Prop drilling for closely related components
* `useEffect` for API calls and filtering
* Could scale with Context API or libraries like Redux or Zustand

---

## 🚀 Future Enhancements

* Server-side filtering and pagination
* User authentication and saved favorites
* Real-time chat with photographers
* Booking/scheduling system
* Autocomplete and fuzzy search

---

## 👤 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 🔒 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> Developed with ❤️ as a frontend development showcase project.
