# 🚩 CTF Mentor - AI Cybersecurity Assistant

**CTF Mentor** is an advanced, AI-powered web application designed to assist Capture The Flag (CTF) players. It provides progressive hints, tool recommendations, and conceptual explanations for various cybersecurity domains including Cryptography, Web Security, Reverse Engineering, and Forensics.

Built with **React**, **Tailwind CSS**, and powered by the **Google Gemini API**.

---

## ✨ Features

- **🤖 AI-Powered Guidance:** Uses Google's Gemini 2.5 Flash model to provide context-aware hints without spoiling flags.
- **🛡️ 7 Specialized Modules:** Dedicated modes for General, Cryptography, Web, Reverse Engineering, Pwn, Forensics, and OSINT.
- **💬 Interactive Chat:** Real-time streaming responses with a typewriter effect.
- **📝 Rich Markdown Support:** Renders code blocks with syntax highlighting and copy functionality.
- **🛠️ Smart Tool Recommendations:** Suggests relevant tools (e.g., Ghidra, Burp Suite, Wireshark) based on the selected category.
- **🎨 Modern UI:** A dark-themed, hacker-aesthetic interface built with Tailwind CSS.

---

## 🚀 Getting Started

### Prerequisites

1.  **Google Gemini API Key:** You need an API key from [Google AI Studio](https://aistudio.google.com/).
2.  **Node.js** (optional, for running a local server).

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ctf-mentor.git
cd ctf-mentor
```

### 2. Run Locally

Since this project uses ES Modules and Import Maps (via CDN), you don't need a complex build step. You just need to serve the files.

**Using Python:**
```bash
# Python 3
python -m http.server 3000
```

**Using Node.js (serve):**
```bash
npx serve .
```

Open `http://localhost:3000` in your browser.

> **Note:** For local development, you may need to hardcode your API key temporarily in `services/geminiService.ts` or set up a local proxy, as accessing `process.env` directly in the browser only works with specific bundlers or Vercel's environment injection.

---

## ☁️ Deployment on Vercel

This project is optimized for Vercel.

1.  **Push to GitHub:** Upload your code to a GitHub repository.
2.  **Import to Vercel:** Go to Vercel and import the project.
3.  **Configure Environment Variables:**
    *   Go to **Settings** > **Environment Variables**.
    *   Add a new variable:
        *   **Key:** `API_KEY`
        *   **Value:** `Your_Google_Gemini_API_Key` (starts with `AIza...`)
4.  **Deploy:** Click Deploy.

If you see a blank page or an error, ensure you have redeployed *after* setting the Environment Variable.

---

## ⚠️ Ethical Disclaimer

**CTF Mentor is for Educational Purposes Only.**

This tool is designed to help users learn cybersecurity concepts in simulated environments (CTFs, HackTheBox, TryHackMe, local labs).

*   **Do not** use the advice provided by this AI to target real-world systems without authorization.
*   **Do not** ask the AI to generate malicious payloads for illegal activities.
*   The AI is programmed to refuse requests that involve attacking live, non-consensual targets.

---

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS (CDN), Lucide React (Icons)
*   **AI Model:** Google Gemini 2.5 Flash via `@google/genai` SDK
*   **Markdown:** `react-markdown`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
