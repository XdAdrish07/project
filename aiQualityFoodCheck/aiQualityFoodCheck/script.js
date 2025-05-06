const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const resultContainer = document.getElementById('resultContainer');
const resultContent = document.getElementById('resultContent');

// Replace with your actual Gemini API key
const GEMINI_API_KEY = 'AIzaSyBDXQjt7WoswwFt6OvyITMQAa3sqrd_-Yo';

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop zone when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropZone.addEventListener('drop', handleDrop, false);

// Handle file input change
fileInput.addEventListener('change', handleFiles, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropZone.classList.add('dragover');
}

function unhighlight(e) {
    dropZone.classList.remove('dragover');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles({ target: { files } });
}

function handleFiles(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        displayPreview(file);
        analyzeImage(file);
    }
}

function displayPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

async function analyzeImage(file) {
    try {
        // Show loading state
        resultContent.innerHTML = '<p class="loading">Analyzing image...</p>';
        resultContainer.style.display = 'block';

        // Check if API key is set
        if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
            throw new Error('Please set your Gemini API key in the script.js file');
        }

        // Convert file to base64
        const base64Image = await fileToBase64(file);
        
        // Call Gemini API with the new model
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            text: "Analyze this food image and provide a detailed quality assessment. Consider factors like freshness, spoilage indicators, and overall quality. Rate the food quality on a scale of 0-100% and explain your rating. Also list any specific issues or positive aspects you notice. Format your response with the quality score first, followed by a detailed explanation."
                        },
                        {
                            inline_data: {
                                mime_type: "image/jpeg",
                                data: base64Image
                            }
                        }
                    ]
                }],
                generationConfig: {
                    temperature: 0.4,
                    topK: 32,
                    topP: 1,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_NONE"
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        
        // Check if the response has the expected format
        if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error('Invalid API response format');
        }

        const analysis = data.candidates[0].content.parts[0].text;
        displayResults(analysis);
    } catch (error) {
        console.error('Error analyzing image:', error);
        resultContent.innerHTML = `
            <div class="error-message">
                <p>Error analyzing image:</p>
                <p>${error.message}</p>
                <p>Please make sure:</p>
                <ul>
                    <li>You have a valid Gemini API key</li>
                    <li>The image is clear and well-lit</li>
                    <li>The image shows the food item clearly</li>
                    <li>You have access to the Gemini 1.5 Flash model</li>
                </ul>
            </div>
        `;
        resultContainer.style.display = 'block';
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

function displayResults(analysis) {
    resultContainer.style.display = 'block';
    
    // Extract quality score from the analysis
    const qualityMatch = analysis.match(/(\d+)%/);
    const qualityScore = qualityMatch ? parseInt(qualityMatch[1]) : null;
    
    // Create quality indicator with color coding
    let qualityColor = '#4CAF50'; // Green for good quality
    if (qualityScore !== null) {
        if (qualityScore < 50) {
            qualityColor = '#f44336'; // Red for poor quality
        } else if (qualityScore < 75) {
            qualityColor = '#ff9800'; // Orange for moderate quality
        }
    }

    let resultsHTML = '';
    
    if (qualityScore !== null) {
        resultsHTML = `
            <div class="quality-score" style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: ${qualityColor};">Food Quality Score</h3>
                <div style="font-size: 2.5em; font-weight: bold; color: ${qualityColor};">${qualityScore}%</div>
            </div>
        `;
    }
    
    resultsHTML += `
        <div class="analysis-details">
            <h4>Detailed Analysis:</h4>
            <div class="analysis-text">${analysis.replace(/\n/g, '<br>')}</div>
        </div>
    `;
    
    resultContent.innerHTML = resultsHTML;
} 