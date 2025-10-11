# Phonebook App

A simple React application for managing a phonebook.  
You can add new contacts, update contacts, filter them by name, and view all saved entries.

## 📦 Features
- Get contacts from JSON database
- Add new contacts with name and phone number
- Update a contact with new phone number
- Prevent adding duplicate names
- Filter contacts by name
- Modular component structure (`Filter`, `PersonForm`, `Persons`)

## 🧠 Components
- **App** – Main component that handles state and logic  
- **Filter** – Input field for filtering contacts  
- **PersonForm** – Form for adding new contacts  
- **Persons** – Displays the list of contacts

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com//Bilal11123/FullStackOpen-Solutions.git
cd FullStackOpen-Solutions/part3/phonebook/phonebook
```
2. Install dependencies:

   ```bash
   npm install
   npm install axios
   ```

3. Run the development server:

   ```bash
   npm run dev
   npm run server
   ```

4. Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

   (or the port shown in your terminal)

---

## 🧩 Project Structure
```css
db.json
src/
  components/
    Filter.jsx
    PersonForm.jsx
    Persons.jsx
  App.jsx
  main.jsx
```
## Output
![Phonebook App Screenshot](Screenshot.png)