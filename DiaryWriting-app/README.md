# Dynamic Notes App

A dynamic and customizable note-taking web application built with **React**. This app allows users to manage their notes with a flexible UI, toggle between light and dark themes, adjust font sizes, export and import data, and personalize the appearance using custom colors and gradients.

## ✨ Features

- ✅ **Dark/Light Mode Toggle**
- 🎨 **Customizable Theme Colors and Font Sizes**
- 📝 **Create, Edit, and Organize Notes**
- 📥 **Import and Export Notes (JSON)**
- 📂 **Color & Gradient Custom Backgrounds for Notes**
- 🌐 **Multilingual Support (Arabic / English)...OtheSoon**
- 📦 **Local Storage Integration**
- ⚡ **Responsive UI with Tailwind CSS**

## 🧠 Tech Stack

- **React**
- **React Router**
- **Tailwind CSS**
- **Local Storage**

## 🔧 Settings Panel

The `AppSettings` component handles user preferences:

- Theme and font customization.
- Dark mode toggle.
- Language selection.
- Exporting and importing tasks using JSON files.

## 🗂 Notes Handling

The `Notes` component:

- Supports editable note cards with colors or gradients.
- Allows checkbox-mode for task-like entries.
- Syncs with localStorage and URL parameters for individual editing.
- Supports auto-close form when clicking outside.

## 📁 Export Format

The exported data is saved as `dynamic-notes-backup.json` containing user tasks in a structured array.

## 🔒 Data Persistence

- All user preferences and tasks are saved in the browser's localStorage.
- Data is preserved between sessions and can be restored via import.

## 🗣 Language Support

- English (default)
- Arabic (`rtl` support based on settings)

---

### **Future Improvements:**

1. **Adding Drag and Drop Feature**:

   - To enhance the user experience, the ability to drag and drop tasks will be added for easy reordering.

2. **Adding Task Check Feature**:

   - Add the ability to check tasks using `Checkboxes` to mark tasks as completed or to verify the actions taken for each task.

3. **Adding Scheduler**:

   - Allow users to set a due date for each task and track their tasks based on specific dates or times.

4. **Adding Task Priority Classification**:

   - Enable users to classify tasks based on priority (High, Medium, Low) for easier task management.

5. **Improving User Interface (UI)**:
   - Redesign some parts using modern libraries like `Material-UI` or `Tailwind CSS` to increase interactivity and visual appeal.

### **Technologies Used:**

- **React**
- **React Advanced**
- **JavaScript**
- **Tailwind CSS**

### **Contact Links:**

Live Demo: [Dynamic-Notes-Appl](https://react-training-zone.vercel.app/)

- [GitHub](https://github.com/Abdallah-Mushtaha)
