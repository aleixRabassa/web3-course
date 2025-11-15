# Web3 Wallet Connection App

A simple, elegant web application that demonstrates how to connect to Web3 wallets using MetaMask and the Viem library.

## 🌟 Features

- **Wallet Connection**: Connect to MetaMask wallet with a single click
- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Web3 Integration**: Built with Viem for reliable blockchain interactions
- **User-Friendly**: Clear feedback on connection status

## 🛠️ Technologies Used

- **HTML5**: Structure and layout
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: Wallet connection logic
- **Viem**: Ethereum library for wallet client creation
- **MetaMask**: Browser extension for Web3 wallet functionality

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Brave, etc.)
- [MetaMask](https://metamask.io/) browser extension installed

## 🚀 Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click the "Connect Wallet" button
4. Approve the connection request in MetaMask

## 📁 Project Structure

```
web3-course/
├── index.html      # Main HTML file
├── index-js.js     # JavaScript logic for wallet connection
├── styles.css      # Styling and animations
└── README.md       # Project documentation
```

## 💡 How It Works

1. The app checks if MetaMask is installed in the browser
2. When the user clicks "Connect Wallet", it creates a wallet client using Viem
3. The app requests access to the user's wallet addresses
4. Upon successful connection, the button text updates to "Connected"
5. If MetaMask is not installed, the user is prompted to install it

## 🔒 Security

- The app only requests wallet addresses, not private keys
- All interactions are handled through MetaMask's secure interface
- No sensitive data is stored or transmitted

## 📝 License

This project is open source and available for educational purposes.
