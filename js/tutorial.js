// Tutorial Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Copy button functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.parentElement.querySelector('code');
            navigator.clipboard.writeText(codeBlock.textContent);
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('btn-success');
            }, 2000);
        });
    });

    // Progress tracking
    const trackProgress = () => {
        const sections = document.querySelectorAll('.tutorial-section');
        let viewedSections = JSON.parse(localStorage.getItem('viewedSections') || '{}');
        const currentPage = window.location.pathname;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!viewedSections[currentPage]) {
                        viewedSections[currentPage] = new Set();
                    }
                    viewedSections[currentPage].add(entry.target.id);
                    localStorage.setItem('viewedSections', JSON.stringify(viewedSections));
                    updateProgress();
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    };

    // Update progress bar
    const updateProgress = () => {
        const progressBar = document.querySelector('.progress');
        const viewedSections = JSON.parse(localStorage.getItem('viewedSections') || '{}');
        const currentPage = window.location.pathname;
        
        if (viewedSections[currentPage]) {
            const progress = (Object.keys(viewedSections[currentPage]).length / document.querySelectorAll('.tutorial-section').length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    };

    // Social sharing
    document.querySelectorAll('.social-share button').forEach(button => {
        button.addEventListener('click', function() {
            const url = window.location.href;
            const text = document.title;
            
            if (this.textContent.includes('Share')) {
                navigator.share({
                    title: text,
                    url: url
                }).catch(console.error);
            } else if (this.textContent.includes('Tweet')) {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + Left Arrow: Previous tutorial
        if (e.altKey && e.key === 'ArrowLeft') {
            const prevButton = document.querySelector('.tutorial-navigation a:first-child');
            if (prevButton) prevButton.click();
        }
        // Alt + Right Arrow: Next tutorial
        if (e.altKey && e.key === 'ArrowRight') {
            const nextButton = document.querySelector('.tutorial-navigation a:last-child');
            if (nextButton) nextButton.click();
        }
    });

    // Add section IDs for progress tracking
    document.querySelectorAll('.tutorial-section').forEach((section, index) => {
        if (!section.id) {
            section.id = `section-${index + 1}`;
        }
    });

    // Initialize progress tracking
    trackProgress();
    updateProgress();

    // Theme switcher
    const addThemeSwitcher = () => {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <button class="btn btn-outline btn-sm">
                <span class="theme-icon">🌞</span>
            </button>
        `;

        document.querySelector('.nav-links').appendChild(switcher);

        switcher.querySelector('button').addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = switcher.querySelector('.theme-icon');
            icon.textContent = document.body.classList.contains('dark-theme') ? '🌙' : '🌞';
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Apply saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            switcher.querySelector('.theme-icon').textContent = '🌙';
        }
    };

    addThemeSwitcher();

    // Add keyboard shortcuts tooltip
    const addShortcutsTooltip = () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'shortcuts-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>Keyboard Shortcuts</h4>
                <ul>
                    <li><kbd>Alt</kbd> + <kbd>←</kbd> Previous lesson</li>
                    <li><kbd>Alt</kbd> + <kbd>→</kbd> Next lesson</li>
                </ul>
            </div>
        `;

        document.body.appendChild(tooltip);

        document.addEventListener('keydown', function(e) {
            if (e.key === '?') {
                tooltip.classList.toggle('show');
            }
        });

        // Close tooltip when clicking outside
        document.addEventListener('click', function(e) {
            if (!tooltip.contains(e.target)) {
                tooltip.classList.remove('show');
            }
        });
    };

    addShortcutsTooltip();

    // Add copy functionality to code blocks
    function initializeCodeBlocks() {
        document.querySelectorAll('.code-block').forEach(block => {
            const copyBtn = block.querySelector('.copy-btn');
            const codeElement = block.querySelector('code');
            
            if (copyBtn && codeElement) {
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(codeElement.textContent)
                        .then(() => {
                            copyBtn.textContent = 'Copied!';
                            setTimeout(() => {
                                copyBtn.textContent = 'Copy';
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy:', err);
                        });
                });
            }
        });
    }

    // Initialize features
    initializeCodeBlocks();

    // Add CSS for new features
    const addStyles = () => {
        const styles = document.createElement('style');
        styles.textContent = `
            .theme-switcher {
                margin-left: 1rem;
            }

            .dark-theme {
                --background-color: #1a1a1a;
                --text-color: #ffffff;
                --light-background: #2d2d2d;
                --border-color: #404040;
                --light-text: #a0a0a0;
            }

            .shortcuts-tooltip {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--background-color);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                padding: 1rem;
                box-shadow: var(--shadow-lg);
                display: none;
                z-index: 1000;
            }

            .shortcuts-tooltip.show {
                display: block;
            }

            .shortcuts-tooltip h4 {
                margin: 0 0 0.5rem 0;
            }

            .shortcuts-tooltip ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .shortcuts-tooltip li {
                margin: 0.5rem 0;
            }

            kbd {
                background: var(--light-background);
                border: 1px solid var(--border-color);
                border-radius: 3px;
                padding: 0.1rem 0.4rem;
                font-size: 0.9em;
            }

            .btn-success {
                background: #28a745;
                color: white;
            }

            .code-block {
                margin: 20px 0;
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                overflow: hidden;
            }

            .code-header {
                padding: 8px;
                background: var(--background-color);
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .copy-btn {
                padding: 4px 8px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-size: 0.9em;
                transition: background-color 0.3s;
            }

            .copy-btn:hover {
                background: var(--primary-dark);
            }

            pre {
                margin: 0;
                padding: 15px;
                background: var(--code-background);
                overflow-x: auto;
            }

            code {
                font-family: monospace;
                line-height: 1.4;
            }
        `;
        document.head.appendChild(styles);
    };

    addStyles();
});
