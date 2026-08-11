# 🥗 Thermidor

**AI-augmented calorie tracker — PWA, offline-first, modular.**

Κατέγραψε θερμίδες, μίλα με AI για να καταγράφει αυτόματα, συγχρόνισε σε όλες τις συσκευές σου — ή απλά χρησιμοποίησέ το local χωρίς λογαριασμό.

---

## Features

| Category | Capability |
|----------|------------|
| **Core** | Καταγραφή θερμίδων, BMR/TDEE (Mifflin‑St Jeor), βάρους |
| **Charts** | 30‑day calorie trend, weight history, monthly overview |
| **AI Chat** | Floating assistant — λες τι έφαγες, το καταγράφει<br>Multi‑provider: OpenAI, Anthropic, Google AI, Ollama (auto‑detect), Custom endpoint |
| **Modules** | Opt‑in: μακροθρεπτικά, μικροθρεπτικά, γεύματα, νερό, άσκηση |
| **PWA** | Installable σε κινητό/desktop, offline‑first, dark theme |
| **Sync** | Supabase (auth + PostgreSQL + realtime) — optional |
| **Food DB** | Αναζήτηση τροφίμων μέσω Open Food Facts |

---

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · Zustand · Dexie.js · Supabase · Chart.js · OpenAI / Anthropic / Ollama / Google AI SDKs · Workbox (PWA)

---

## Quick Start

```bash
git clone https://github.com/Frezzaroukos/thermidor.git
cd thermidor
npm install
npm run dev
```

Δουλεύει αμέσως — **δεν χρειάζεται backend**. Όλα αποθηκεύονται στο IndexedDB του browser.

### Supabase (για cross‑device sync)

```bash
cp .env.example .env
# Συμπλήρωσε VITE_SUPABASE_URL και VITE_SUPABASE_ANON_KEY
npm run dev
```

Πλήρης οδηγός setup στο [SUPABASE.md](./SUPABASE.md).

---

## Project Structure

```
src/
├── components/        # React components ανά feature
│   ├── ai/            # Floating chat, provider setup
│   ├── dashboard/     # KPIs, quick entry, charts
│   ├── layout/        # App shell, bottom navigation
│   ├── log/           # Καταγραφή + ιστορικό
│   ├── settings/      # Προφίλ, modules, backup
│   ├── shared/        # Card, Toast, Modal, FoodSearch
│   ├── stats/         # Στατιστικά + monthly overview
│   └── weight/        # Ζύγιση + ιστορικό
├── modules/           # Pluggable feature modules
│   ├── core/          # Κλειδωμένο, πάντα ενεργό
│   ├── macros/        # Πρωτεΐνες, carbs, λιπαρά, φυτικές ίνες
│   ├── micros/        # Βιταμίνες, μέταλλα (17)
│   ├── meals/         # Κατηγορία γεύματος + ώρα
│   ├── water/         # Water tracker με progress bar
│   └── exercise/      # Άσκηση + burned calories
├── stores/            # Zustand stores
│   ├── profileStore   # Προφίλ, BMR, TDEE
│   ├── entriesStore   # Καταγραφές θερμίδων
│   ├── weightStore    # Ιστορικό βάρους
│   ├── settingsStore  # Προτιμήσεις, active modules
│   ├── aiStore        # AI providers, chat history
│   └── toastStore     # Toast notifications
├── lib/
│   ├── ai/            # Provider registry, chat engine, tools
│   ├── db/            # Dexie.js schema
│   ├── nutrition/     # BMR/TDEE calculator
│   ├── supabase/      # Client, auth, queries
│   ├── sync/          # Offline‑first sync engine
│   └── food-db/       # Open Food Facts API
├── types/             # TypeScript type definitions
└── config/            # Module registry, constants
```

---

## How the AI Works

1. Κάνεις κλικ στο floating chat button (κάτω δεξιά)
2. Auto‑detect: αν τρέχει Ollama στο δίκτυο, το βρίσκει αυτόματα
3. Διαλέγεις provider (OpenAI, Anthropic, Google, Custom endpoint)
4. Λες κάτι όπως *"Έφαγα 2 αυγά, μια φέτα ψωμί και ένα μήλο"*
5. Το AI καλεί το function `logCalories` και το καταγράφει αυτόματα
6. Μπορείς να ρωτήσεις *"Πώς πάει η εβδομάδα μου;"* ή *"Πρότεινέ μου κάτι"*

Το AI βλέπει τα δεδομένα σου (calories, weight) και δίνει γνώμη **χωρίς** να τα στέλνει εκτός της συσκευής αν χρησιμοποιείς Ollama.

---

## Module System

Κάθε module είναι opt‑in από τις ρυθμίσεις:

| Module | Default | Τι προσθέτει |
|--------|:-------:|--------------|
| `core` | 🔒 ON | Καταγραφή θερμίδων (κλειδωμένο) |
| `macros` | ✅ ON | Πρωτεΐνες · Υδατάνθρακες · Λιπαρά · Φυτικές ίνες |
| `micros` | ❌ OFF | 17 βιταμίνες & μέταλλα |
| `meals` | ❌ OFF | Πρωινό/Μεσημεριανό/Βραδινό/Σνακ + ώρα |
| `water` | ❌ OFF | Progress bar 250ml βήματα |
| `exercise` | ❌ OFF | Τύπος άσκησης, διάρκεια, burned calories |

---

## License

MIT
