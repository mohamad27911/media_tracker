
# 🎥 Media Collection Tracker

![Demo Screenshot](./public/screenshot.png) <!-- Replace with your actual image path -->

A personal media collection app with an AI-powered assistant. Track your movies, books, games, and music — all in one place.

---

## 🚀 Features

- ✅ **Catalog Media** — Organize movies, books, games, music with details like genre, year, rating
- 🤖 **AI Assistant** — Gemini-powered chatbot to recommend and query your collection
- 🎯 **Status Tracking** — Mark media as owned, wishlisted, or completed
- 🌗 **Dark/Light Mode** — Adaptive UI with custom color themes
- 📱 **Responsive Design** — Seamlessly works on desktop, tablet, and mobile

---

## 🛠 Tech Stack

| Category        | Tools                              |
|----------------|-------------------------------------|
| **Frontend**    | React + TypeScript                  |
| **Styling**     | Tailwind CSS                        |
| **AI Assistant**| Google Gemini API                   |
| **State Mgmt.** | React Hooks                         |
| **Build Tool**  | Vite                                |

---

## 📦 Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yourusername/media-collection-tracker.git
   cd media-collection-tracker
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure API key**  
   Create a `.env` file and add your Gemini key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

---

## 🚦 Usage

### 1. Start the app
```bash
npm run dev
```

### 2. Add media items (for demo/testing)
In `App.tsx`:
```tsx
const mediaItems = [
  { id: '1', title: 'Inception', type: 'movie', genre: 'Sci-Fi', year: 2010, status: 'owned', rating: 9 },
  { id: '2', title: 'The Hobbit', type: 'book', genre: 'Fantasy', year: 1937, status: 'completed', rating: 8 },
  // Add more...
];
```

### 3. Use the AI Chatbot
Located in the bottom-right corner, it allows you to:
- Ask for media recommendations
- Query titles by type or genre
- Check your wishlist or owned items

---

## 🎨 Customization

### 🎨 Color Themes
Default color scheme:

| Mode       | Gradient                              |
|------------|----------------------------------------|
| Light Mode | `#29b093` (Teal) → `#1f67f1` (Blue)    |
| Dark Mode  | `#e0f11f` (Yellow) → `#29b093` (Teal)   |

Edit color classes in:
- `Chatbot.tsx`
- `HomePage.tsx`

### 🎭 Supported Media Types

```ts
type MediaType = 'movie' | 'book' | 'game' | 'music' | 'other';
```

---

## 🔌 AI Integration

AI features use **Google's Gemini API**. To disable AI temporarily:

1. Remove `VITE_GEMINI_API_KEY` from `.env`
2. In `Chatbot.tsx`, replace the `handleSubmit()` logic with static/mock responses

---

## 🌍 Deployment
 
[Vercel Link](https://media-tracker-vert.vercel.app/)

Simply connect your GitHub repo and set the environment variable `VITE_GEMINI_API_KEY`.

---

## 📁 Recommended Structure

```
media-collection-tracker/
├── public/
│   └── screenshot.png
├── src/
│   ├── components/
│   │   ├── Chatbot.tsx
│   │   └── HomePage.tsx
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── README.md
├── package.json
└── tailwind.config.ts
```

---

## 🤝 Contributing

Contributions welcome!  
If you find a bug or have an idea for a feature:

- Create an issue
- Open a pull request

---

## 📜 License

MIT License — see [`LICENSE`](LICENSE) for full details.

---

## 🙋 Need Help?

Feel free to open an issue or contact [mohamad.mar72@gmail.com.com].
