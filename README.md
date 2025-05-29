# Multi-Step Application Wizard

A React + TypeScript + Vite app featuring:
- Multi-step form wizard (3 steps)
- Context API for state management
- Material UI for UI components
- React Hook Form for form handling and validation
- React-i18next for English/Arabic (RTL) language support
- React Router for routing
- Persistent local storage for form data
- Accessibility and responsive design
- Unit tests with Jest
- OpenAI-powered AI suggestions (Step 3)

---

## How to Run the Project

1. **Install dependencies:**
   ```zsh
   npm install
   ```
2. **Start the backend (OpenAI proxy):**
   ```zsh
   cd backend
   npm install
   npm start
   ```
   The backend will run on [http://localhost:4000](http://localhost:4000).

3. **Start the frontend app:**
   ```zsh
   cd .. # if you are in backend/
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

4. **Run tests:**
   ```zsh
   npm test
   ```

---

## Setting up the OpenAI API Key

1. **Frontend:**
   - The frontend does not require the OpenAI key directly. It communicates with the backend proxy.

2. **Backend:**
   - In `backend/.env`, set your OpenAI API key and endpoint:
     ```env
     OPENAI_API_KEY="sk-..."
     OPENAI_API_ENDPOINT="https://api.openai.com/v1/chat/completions"
     ```
   - The backend will use these values to call OpenAI securely.

---

## Architecture & Design Decisions

- **Frontend:**
  - Built with React + TypeScript using Vite for fast development.
  - State is managed via Context API and persisted to localStorage for resilience.
  - Multi-step wizard is implemented with React Router and a simple step state.
  - Material UI is used for accessible, responsive UI components.
  - React Hook Form provides robust form validation and integration.
  - React-i18next enables seamless English/Arabic (RTL) support and language toggle.
  - Accessibility is considered (ARIA labels, keyboard navigation, color contrast).
  - Step 3 features an AI-powered "Help Me Write" dialog, calling the backend for OpenAI suggestions, with language-specific support.

- **Backend:**
  - Node.js/Express server acts as a proxy to OpenAI, keeping the API key secure.
  - CORS is enabled for local development.
  - The backend endpoint `/api/ai-suggestion` receives a field and language, and returns AI-generated suggestions for the form.

- **Testing:**
  - Jest and React Testing Library are used for unit tests on all form steps.
  - Tests cover rendering, validation, and AI dialog interactions.

- **Improvements & Notes:**
  - All code is formatted with Prettier and documented with JSDoc.
  - The app is mobile-friendly and accessible.
  - You can expand the backend to support more advanced OpenAI prompts or add authentication as needed.

---

## Project Structure
- `src/components/` — Form steps, header, progress bar
- `src/context/` — Form context provider
- `src/locales/` — i18n translation files
- `backend/` — Node.js/Express OpenAI proxy

---

## Customization
- Update fields, validation, and translations as needed.
- Adjust OpenAI prompt logic in `backend/server.cjs` for different suggestion styles.

---

Generated on: 2025-05-29
