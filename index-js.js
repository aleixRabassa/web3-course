import { createWalletClient, custom, createPublicClient, parseEther, defineChain } from "https:/esm.sh/viem"
import { contractAddress, abi } from "./constants-js.js"

// Elements
const connectButton = document.getElementById('connectButton')
const fundButton = document.getElementById('fundButton')
const ethAmountInput = document.getElementById('ethAmount')

// Globals
let walletClient
let publicClient
const isMetaMaskInstalled = typeof window.ethereum !== 'undefined'

/**
 * Connect function - Handles wallet connection logic
 * Checks if MetaMask is installed and creates a wallet client
 */
async function connect() {
    if (isMetaMaskInstalled) {

        // Create a wallet client instance using the browser's ethereum provider
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });

        // Request user's wallet addresses from MetaMask
        await walletClient.requestAddresses()

        // Update button text to indicate successful connection
        connectButton.innerText = 'Connected'
    } else {
        // If MetaMask is not installed, update button text to prompt installation
        connectButton.innerText = 'Please install MetaMask'
    }
}

/**
 * Fund function - Sends ETH transaction to buy coffee
 * Connects to wallet if not already connected, retrieves user's address,
 * creates a public client for blockchain interaction, and initiates the ETH transfer
 */
async function fund() {
    // Get the ETH amount entered by the user
    const ethAmount = ethAmountInput.value
    console.log(`Funding with ${ethAmount} ETH...`)

    if (isMetaMaskInstalled) {

        // Create a wallet client instance using the browser's ethereum provider
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });
        
        const [connectedAccount] = await walletClient.requestAddresses()
        const currentChain = await getCurrentChain(walletClient)

        // Create a public client for reading blockchain data
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });

        // Simulate the contract call before executing to check for errors
        await publicClient.simulateContract({
            address: contractAddress,           // Smart contract address
            abi: abi,                           // Contract ABI (interface)
            functionName: 'fund',               // Function to call on the contract
            account: connectedAccount,        // User's wallet address
            chain: currentChain,                // Network chain configuration
            value: parseEther(ethAmount)        // Convert ETH amount to wei
        })

        // Update button text to indicate successful connection
        connectButton.innerText = 'Connected'
    } else {
        // If MetaMask is not installed, update button text to prompt installation
        connectButton.innerText = 'Please install MetaMask'
    }
}

// Enable/disable fund button based on input value
function updateFundButtonState() {
    const hasValue = ethAmountInput.value.trim() !== '' && parseFloat(ethAmountInput.value) > 0
    fundButton.disabled = !hasValue
}

/**
 * Get the current blockchain chain configuration
 * Retrieves the chain ID from the client and creates a custom chain definition
 * with the appropriate network parameters for local development
 * @param {Object} client - The public client to query for chain information
 * @returns {Object} Custom chain configuration object
 */
async function getCurrentChain(client) {
    // Retrieve the chain ID from the connected network
    const chainId = await client.getChainId()

    // Define a custom chain configuration with the retrieved chain ID
    const currentChain = defineChain({
        id: chainId,                    // Network chain ID (e.g., 1 for mainnet, 31337 for local)
        name: "Custom Chain",
        nativeCurrency: {               // Native currency details for the chain
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {                      // RPC endpoint configuration
            default: {
                http: ["http://localhost:8545"],  // Local development node URL
            },
        },
    })

    return currentChain
}

connectButton.onclick = connect
fundButton.onclick = fund

// Initial state: button disabled
fundButton.disabled = true

// Listen for input changes
ethAmountInput.addEventListener('input', updateFundButtonState)
ethAmountInput.addEventListener('change', updateFundButtonState)