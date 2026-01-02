import { createWalletClient, custom, createPublicClient, parseEther, defineChain, formatEther } from "https:/esm.sh/viem"
import { contractAddress, abi } from "./constants.js"

// Elements
const connectButton = document.getElementById('connectButton')
const fundButton = document.getElementById('fundButton')
const ethAmountInput = document.getElementById('ethAmount')
const balanceButton = document.getElementById('balanceButton')
const withdrawButton = document.getElementById('withdrawButton')

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
        connectButton.innerText = 'Disconnect'

        balanceButton.disabled = false
        withdrawButton.disabled = false
    } else {
        // If MetaMask is not installed, update button text to prompt installation
        connectButton.innerText = 'Please install MetaMask'

        balanceButton.disabled = true
        withdrawButton.disabled = true
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
        const { request } = await publicClient.simulateContract({
            address: contractAddress,           // Smart contract address
            abi: abi,                           // Contract ABI (interface)
            functionName: 'fund',               // Function to call on the contract
            account: connectedAccount,          // User's wallet address
            chain: currentChain,                // Network chain configuration
            value: parseEther(ethAmount)        // Convert ETH amount to wei
        })

        const hash = await walletClient.writeContract(request)

        console.log(hash)
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

/**
 * Get Balance function - Retrieves the contract balance
 * Creates a public client and queries the blockchain for the contract's ETH balance,
 * then logs it to the console in ETH units (converted from wei)
 */
async function getBalance() {
    if (isMetaMaskInstalled) {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });

        const balance = await publicClient.getBalance({
            address: contractAddress
        })

        console.log(formatEther(balance))
    }
}

/**
 * Withdraw function - Calls the withdraw function on the contract
 * Connects to wallet if not already connected, retrieves user's address,
 * creates a public client for blockchain interaction, and initiates the withdrawal
 */
async function withdraw() {
    console.log('Withdrawing...')

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
        const { request } = await publicClient.simulateContract({
            address: contractAddress,           // Smart contract address
            abi: abi,                           // Contract ABI (interface)
            functionName: 'withdraw',           // Function to call on the contract
            account: connectedAccount,          // User's wallet address
            chain: currentChain,                // Network chain configuration
            // value: parseEther('0')              // Send 0 ETH (default is 0 if omitted)
        })

        const hash = await walletClient.writeContract(request)

        console.log(hash)
    }
}

// Initial states
fundButton.disabled = true
balanceButton.disabled = true
withdrawButton.disabled = true

// Event listeners
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw

ethAmountInput.addEventListener('input', updateFundButtonState)
ethAmountInput.addEventListener('change', updateFundButtonState)