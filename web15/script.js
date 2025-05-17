

// Copy wallet address with feedback
const walletAddress = document.querySelector('#wallet-address');
if (walletAddress) {
    walletAddress.addEventListener('click', async () => {
        const address = walletAddress.querySelector('p').textContent.trim();
        try {
            await navigator.clipboard.writeText(address);
            
            // Create and show success message
            const feedback = document.createElement('div');
            feedback.className = 'fixed bottom-4 right-4 bg-green-500 text-black px-4 py-2 rounded-full transform translate-y-full opacity-0 transition-all duration-300';
            feedback.textContent = 'Address copied! 🔥';
            document.body.appendChild(feedback);
            
            // Animate in
            setTimeout(() => {
                feedback.classList.remove('translate-y-full', 'opacity-0');
            }, 100);
            
            // Animate out and remove
            setTimeout(() => {
                feedback.classList.add('translate-y-full', 'opacity-0');
                setTimeout(() => feedback.remove(), 300);
            }, 2000);
            
            // Add temporary highlight effect
            walletAddress.classList.add('bg-green-500/20');
            setTimeout(() => {
                walletAddress.classList.remove('bg-green-500/20');
            }, 500);
        } catch (err) {
            console.error('Failed to copy address:', err);
        }
    });
}



// Add scroll reveal animation with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay based on index
            setTimeout(() => {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
            }, index * 100);
        }
    });
}, observerOptions);









// Show presale popup
function showPresalePopup() {
    presalePopup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close presale popup
function closePresalePopup() {
    presalePopup.classList.add('hidden');
    document.body.style.overflow = '';
}

// Close button event listener
closePresaleBtn.addEventListener('click', closePresalePopup);

// Open button event listeners
openPresaleBtn.addEventListener('click', showPresalePopup);
if (openPresaleBtn2) {
    openPresaleBtn2.addEventListener('click', showPresalePopup);
}

// Close popup when clicking outside
presalePopup.addEventListener('click', (e) => {
    if (e.target === presalePopup) {
        closePresalePopup();
    }
});

// Enhanced Wallet Address Copy functionality
function copyAddressWithFeedback(address, element) {
    navigator.clipboard.writeText(address).then(() => {
        // Visual feedback on the element
        element.classList.add('bg-green-500/20');
        setTimeout(() => {
            element.classList.remove('bg-green-500/20');
        }, 500);
        
        // Create and show success message
        const feedback = document.createElement('div');
        feedback.className = 'fixed bottom-4 right-4 bg-green-500 text-black px-4 py-2 rounded-full transform translate-y-full opacity-0 transition-all duration-300';
        feedback.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Address copied! 🔥';
        document.body.appendChild(feedback);
        

        
        // Animate out and remove
        setTimeout(() => {
            feedback.classList.add('translate-y-full', 'opacity-0');
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy address:', err);
        alert('Failed to copy address. Please try again.');
    });
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Add classes to progress bars for easy targeting
    ensureProgressElementsHaveClasses();
    
    // Fetch presale data
    fetchPresaleData();
    
    // Initialize wallet copy functionality
    initWalletCopy();
    
    // Refresh data every 3 minutes
    setInterval(fetchPresaleData, 180000);
    
    // Initialize static wallet address copy
    const staticWalletAddress = document.getElementById('static-wallet-address');
    if (staticWalletAddress) {
        const address = '6bL72EWb2X3DUq2CfhEoQwuaqvRSTYz5kDqJ1zXz5iua';
        const copyButton = staticWalletAddress.querySelector('button');
        
        copyButton.addEventListener('click', () => {
            copyAddressWithFeedback(address, staticWalletAddress);
            
            // Additional button feedback
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check mr-2"></i> Copied!';
            copyButton.classList.add('bg-green-600');
            
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.classList.remove('bg-green-600');
            }, 2000);
        });
    }
    
    // Update popup wallet address to use the enhanced feedback
    if (popupWalletAddress) {
        const address = '6bL72EWb2X3DUq2CfhEoQwuaqvRSTYz5kDqJ1zXz5iua';
        const copyButton = popupWalletAddress.querySelector('button');
        
        if (copyButton) {
            copyButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                copyAddressWithFeedback(address, popupWalletAddress);
                
                // Additional button feedback
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check mr-2"></i> Copied!';
                copyButton.classList.add('bg-green-600');
                
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.classList.remove('bg-green-600');
                }, 2000);
            });
        }
        
        // Also allow clicking anywhere in the container to copy
        popupWalletAddress.addEventListener('click', (e) => {
            if (e.target !== copyButton && !copyButton.contains(e.target)) {
                copyAddressWithFeedback(address, popupWalletAddress);
            }
        });
    }
});

// Make sure all progress elements have the right classes
function ensureProgressElementsHaveClasses() {
 

    
    // Check all raised amount elements
    document.querySelectorAll('p').forEach(p => {
        if (p.textContent.includes('SOL') && p.textContent.trim().endsWith('SOL') && !p.classList.contains('raised-amount')) {
            p.classList.add('raised-amount');
        }
    });
}

// API Integration for Presale Progress
async function fetchPresaleData() {
    try {
        // Show loading state
        const raisedAmountElements = document.querySelectorAll('.raised-amount');
        raisedAmountElements.forEach(el => {
            // Replace any existing refresh button with loading text
            el.innerHTML = '';
        });

        const response = await fetch('https://admin.pepesolana.net/api/fromAdmin');
        const data = await response.json();
        
        if (data) {
            // Check if progress exists and is valid
            if (data.progress !== undefined) {
                updatePresaleData(data);
            } else {
                console.error('API response missing progress data:', data);
                // Show error state with refresh button
                showErrorWithRefreshButton(raisedAmountElements);
            }
        }
    } catch (error) {
        console.error('Error fetching presale data:', error);
        // Show error state with refresh button
        const raisedAmountElements = document.querySelectorAll('.raised-amount');
        showErrorWithRefreshButton(raisedAmountElements);
    }
}






// Initialize wallet address copying
function initWalletCopy() {
    const mainWalletAddress = document.getElementById('wallet-address');
    if (mainWalletAddress) {
        mainWalletAddress.addEventListener('click', () => {
            const address = mainWalletAddress.querySelector('p').textContent.trim();
            navigator.clipboard.writeText(address).then(() => {
                // Show feedback
                const feedback = document.createElement('div');
                feedback.className = 'fixed bottom-4 right-4 bg-green-500 text-black px-4 py-2 rounded-full transform translate-y-full opacity-0 transition-all duration-300';
                feedback.textContent = 'Address copied! 🔥';
                document.body.appendChild(feedback);
                
                // Animate in
                setTimeout(() => {
                    feedback.classList.remove('translate-y-full', 'opacity-0');
                }, 100);
                
                // Animate out and remove
                setTimeout(() => {
                    feedback.classList.add('translate-y-full', 'opacity-0');
                    setTimeout(() => feedback.remove(), 300);
                }, 2000);
            });
        });
    }
}

// Show presale popup after 3 seconds
setTimeout(showPresalePopup, 3000);

// Add "moon soon" Easter egg
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {

            
            // Show moon soon message
            const message = document.createElement('div');
            message.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-yellow-400 z-50 text-center';
            message.innerHTML = '<i class="fas fa-moon mr-2"></i>MOON SOON!<br>🌕';
            message.style.textShadow = '0 0 10px rgba(234, 179, 8, 0.8)';
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
                moon.remove();
                document.body.classList.remove('moon-mode');
            }, 3000);
            
            // Reset
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
}); 