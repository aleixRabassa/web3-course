import { createWalletClient, custom } from "https:/esm.sh/viem"

const connectButton = document.getElementById('ConnectButton')

let walletClient 

/**
 * Connect function - Handles wallet connection logic
 * Checks if MetaMask is installed and creates a wallet client
 */
async function Connect() {
    // Check if MetaMask (ethereum provider) is available in the browser
    if (typeof window.ethereum !== 'undefined') {      

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

connectButton.onclick = Connect