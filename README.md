# Church Website

This is a modern church website built with React and Tailwind CSS.

## How to Run

To start the development server, you can use either of the following commands:

```bash
npm run dev
```

OR

```bash
npm start
```

Both commands will start the server at `http://localhost:5173/`.

## Project Structure

- `src/components`: Contains all the React components (Navbar, Hero, About, Events, Footer).
- `src/App.jsx`: The main application component where everything is assembled.
- `tailwind.config.js`: Tailwind CSS configuration.

## Features

- Responsive Navbar with mobile menu
- Hero section with CTA
- About section
- Upcoming Events section
- Footer with social links

## Running on Mobile (Local Network)

To access the website from your phone or another device on the same Wi-Fi network:

1.  **Find your computer's local IP address:**
    *   Open a terminal and run `ipconfig` (Windows) or `ifconfig` (Mac/Linux).
    *   Look for the "IPv4 Address" (e.g., `192.168.x.x`).

2.  **Run the app with host exposure:**
    ```bash
    npm run host
    ```
    *   This will start the server and expose it to your network.
    *   The terminal will show a "Network" URL, e.g., `http://192.168.1.5:5173/`.

3.  **Open on your phone:**
    *   Make sure your phone is connected to the **same Wi-Fi network** as your computer.
    *   Open your phone's browser (Chrome, Safari, etc.).
    *   Type in the Network URL shown in the terminal (e.g., `http://192.168.1.5:5173`).
