# Web3 Coffee Shop

A decentralized web app for connecting to MetaMask, managing smart contract interactions, and handling ETH transactions using Viem.

## Features

- **Wallet Connection**: Connect to MetaMask wallet seamlessly
- **Balance Checking**: View contract ETH balance in real-time
- **Fund Contract**: Send ETH transactions to fund the contract (buy coffee)
- **Withdraw Funds**: Call the withdraw function on the smart contract
- **Input Validation**: Smart button states with real-time validation
- **TypeScript Support**: Full TypeScript implementation with type safety
- **Modern UI**: Responsive design with gradient styling

## Technologies

- HTML5, CSS3, JavaScript (ES6+)
- TypeScript
- Viem v2.43+ (Ethereum library via CDN)
- MetaMask
- pnpm (Package manager)

## Prerequisites

- Modern web browser
- [MetaMask](https://metamask.io/) extension installed
- Node.js and pnpm (for TypeScript compilation)
- Local Ethereum node (Anvil) running on `http://localhost:8545`

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Compile TypeScript (if using TypeScript version):
```bash
pnpm tsc
```

3. Open `index.html` in your browser

## Usage

1. Open `index.html` in your browser
2. Click "Connect Wallet" to connect MetaMask
3. Click "Get balance" to view the contract balance
4. Enter an ETH amount and click "Buy coffee" to fund the contract
5. Click "Withdraw" to withdraw funds from the contract (owner only)

## Project Structure

```
web3-course/
├── src/
│   ├── js/
│   │   ├── index.js        # Main JavaScript logic
│   │   └── constants.js    # Contract address and ABI
│   ├── ts/
│   │   ├── index.ts        # TypeScript implementation
│   │   ├── index.js        # Compiled TypeScript output
│   │   ├── constants.ts    # TypeScript constants
│   │   ├── constants.js    # Compiled constants
│   │   └── global.d.ts     # Global type declarations
│   └── css/
│       └── styles.css      # Styling with gradient buttons
├── contracts/
│   └── fundme-anvil.json   # Contract deployment data
├── index.html              # Main HTML file
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
├── .gitignore              # Git ignore rules
└── README.md               # Documentation
```

## Smart Contract Functions

- **fund()**: Send ETH to the contract (requires ETH value)
- **withdraw()**: Withdraw all funds from the contract (owner only, no ETH value)

## Development

The project supports both JavaScript and TypeScript implementations:

- **JavaScript**: Use `src/js/index.js` (works directly in browser)
- **TypeScript**: Edit `src/ts/index.ts` and compile with `pnpm tsc`

TypeScript configuration uses ES2020 modules for browser compatibility.
