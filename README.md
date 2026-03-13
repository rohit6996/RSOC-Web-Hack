<h1 align="center">
  <img src="https://github.com/rohit6996/RSOC-Web-Hack/blob/main/client/src/assets/logo.svg" alt="Code-Sync Logo">
</h1>

<p align="center">
  <strong>A modern, real-time collaborative code editor and whiteboard.</strong><br>
  Seamlessly write, run, and review code together in a single shared workspace.
</p>

<p align="center">
  <img src="https://img.shields.io/github/contributors/sahilatahar/Code-Sync?style=for-the-badge&color=2ecc71" alt="GitHub contributors">
  <img src="https://img.shields.io/github/stars/sahilatahar/Code-Sync?style=for-the-badge&color=f1c40f" alt="GitHub Repo stars">
  <img src="https://img.shields.io/github/issues/sahilatahar/Code-Sync?style=for-the-badge&color=e67e22" alt="GitHub issues">
  <img src="https://img.shields.io/github/issues-pr/sahilatahar/Code-Sync?style=for-the-badge&color=e74c3c" alt="GitHub pull requests">
  <img src="https://img.shields.io/github/license/sahilatahar/Code-Sync?style=for-the-badge&color=3498db" alt="GitHub License">
</p>

---

## 🔮 Core Features

- **💻 Real-Time Collaborative Coding:** Multiple users can write code simultaneously with live cursors, selections, and presence indicators.
- **🚀 Built-in Local Code Execution:** Execute your code instantly within the IDE using a secure, custom local backend (Supports Python, C++, Java, Node.js).
- **🌿 Native Version Control (Pull Requests):** A fully custom version control system running over WebSockets. Collaborators can push code snapshots ("Pull Requests") which the room owner can review, approve, and merge instantly into the live room, all while maintaining an Update History!
- **🎨 Collaborative Whiteboard:** Built-in `tldraw` canvas allows users to brainstorm, draw system architectures, and sketch collaboratively in real-time.
- **📁 Full File System Sync:** Create, rename, delete, and organize files and directories. Download the entire codebase as a portable `.zip` file.
- **💬 Integrated Team Chat:** Real-time group chatting functionality built directly into the sidebar.
- **🤖 Copilot Integration:** An AI-powered assistant that generates code, allowing you to insert, copy, or replace content seamlessly within your files.
- **✨ Premium UI/UX:** Aesthetically modern dark modes, customizable themes, font sizes, syntax highlighting, and dynamic 3D WebGL background elements.

---

## 💻 Tech Stack

- **Frontend:** React, TypeScript, React Router, Vite, Tailwind CSS, CodeMirror, Tldraw, Frame Motion, OGL (WebGL)
- **Backend:** Node.js, Express, Socket.IO
- **Code Execution Engine:** Node `child_process` (Local Execution)

---

## ⚙️ Installation & Setup

### Manual Installation (Recommended for Development)

1. **Fork & Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/Code-Sync.git
   cd Code-Sync
   ```

2. **Install Root Dependencies (Concurrently):**
   ```bash
   npm install
   ```
   *Note: This will install dependencies for both the frontend and backend workspaces.*

3. **Configure Environment Variables:**
   Create a `.env` file in the `client/` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start the Development Servers:**
   From the root of the project, run:
   ```bash
   npm run dev
   ```
   This will simultaneously spin up the Vite Client (`localhost:5173`) and the Express Backend (`localhost:3000`).

5. **Local Network Access (Optional):**
   If you want to collaborate with other devices on your local Wi-Fi, change `VITE_BACKEND_URL` to your machine's local IP address (e.g., `http://192.168.1.5:3000`) and access the frontend via the network IP displayed in the Vite console.


## 🤝 Contribute

We welcome contributions to make Code-Sync even better! Follow the [contribution guidelines](CONTRIBUTING.md) to get started.

## 🌟 Support Us

If you find this project helpful or valuable, please consider giving it a 🌟 on GitHub! It helps us gain visibility and encourages further development.

## 🧾 License

This project is licensed under the [MIT License](LICENSE).
