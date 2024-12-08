// Load content from JSON file
async function loadContent() {
    try {
        const response = await fetch('../scraped_content/content.json');
        const content = await response.json();
        
        // Get the content section
        const contentSection = document.querySelector('.content-section');
        
        // Process and display content
        content.forEach(item => {
            if (item.tag && item.text) {
                const element = document.createElement(item.tag);
                element.textContent = item.text;
                contentSection.appendChild(element);
            }
        });
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});
