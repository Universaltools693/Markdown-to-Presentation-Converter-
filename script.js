document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const convertBtn = document.getElementById('convert-btn');
    const preview = document.getElementById('preview');

    // Simple Markdown to HTML parser
    function parseMarkdown(markdown) {
        let html = markdown
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gm, '<em>$1</em>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/\n/gm, '<br>');

        // Wrap lists
        html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
        return html;
    }

    // Generate presentation slides
    function generatePresentation(markdown) {
        const slides = markdown.split('\n\n---\n\n'); // Split by slide separator
        let presentationHtml = '<div class="slides">';

        slides.forEach((slide, index) => {
            const slideContent = parseMarkdown(slide);
            presentationHtml += `
                <div class="slide">
                    <h2>Slide ${index + 1}</h2>
                    ${slideContent}
                </div>
            `;
        });

        presentationHtml += '</div>';
        return presentationHtml;
    }

    // Handle conversion
    convertBtn.addEventListener('click', () => {
        const markdown = markdownInput.value.trim();
        if (!markdown) {
            preview.innerHTML = '<p>Please enter some Markdown text.</p>';
            return;
        }

        const presentation = generatePresentation(markdown);
        preview.innerHTML = presentation;

        // Add basic slide styling
        const style = document.createElement('style');
        style.textContent = `
            .slides {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .slide {
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #00d4ff;
            }
            .slide h2 {
                color: #00d4ff;
                margin-bottom: 10px;
            }
        `;
        preview.appendChild(style);
    });

    // Simulate ad triggers on scroll
    window.addEventListener('scroll', () => {
        const adTop = document.getElementById('ad-top');
        const adMiddle = document.getElementById('ad-middle');
        const adBottom = document.getElementById('ad-bottom');

        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Trigger ads when user scrolls past certain points
        if (scrollPosition > documentHeight * 0.2) {
            adTop.style.background = 'rgba(0, 212, 255, 0.2)'; // Simulate ad trigger
        }
        if (scrollPosition > documentHeight * 0.5) {
            adMiddle.style.background = 'rgba(0, 212, 255, 0.2)';
        }
        if (scrollPosition > documentHeight * 0.8) {
            adBottom.style.background = 'rgba(0, 212, 255, 0.2)';
        }
    });
});
