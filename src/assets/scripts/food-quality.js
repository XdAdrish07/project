const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('previewImage');
const resultContainer = document.getElementById('resultContainer');
const resultContent = document.getElementById('resultContent');
const saveQualityBtn = document.getElementById('saveQuality');
const shareQualityBtn = document.getElementById('shareQuality');

// Replace with your actual Gemini API key
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

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

// Handle save quality report
saveQualityBtn.addEventListener('click', saveQualityReport);

// Handle share with NGO
shareQualityBtn.addEventListener('click', shareWithNGO);

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
        preview.parentElement.style.display = 'block';
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
        
        // Call Gemini API
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
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const analysis = data.candidates[0].content.parts[0].text;
        displayResults(analysis);
    } catch (error) {
        console.error('Error analyzing image:', error);
        resultContent.innerHTML = `
            <div class="error-message">
                <p>Error analyzing image:</p>
                <p>${error.message}</p>
            </div>
        `;
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

async function saveQualityReport() {
    const qualityReport = {
        image: preview.src,
        analysis: resultContent.innerHTML,
        timestamp: new Date().toISOString()
    };

    try {
        // Save to local storage
        const reports = JSON.parse(localStorage.getItem('qualityReports') || '[]');
        reports.push(qualityReport);
        localStorage.setItem('qualityReports', JSON.stringify(reports));

        // Update dashboard
        updateDashboard(qualityReport);
        
        alert('Quality report saved successfully!');
    } catch (error) {
        console.error('Error saving quality report:', error);
        alert('Failed to save quality report. Please try again.');
    }
}

async function shareWithNGO() {
    const qualityReport = {
        image: preview.src,
        analysis: resultContent.innerHTML,
        timestamp: new Date().toISOString()
    };

    try {
        // Send to server
        const response = await fetch('/api/share-quality-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(qualityReport)
        });

        if (!response.ok) {
            throw new Error('Failed to share quality report');
        }

        alert('Quality report shared with NGO successfully!');
    } catch (error) {
        console.error('Error sharing quality report:', error);
        alert('Failed to share quality report. Please try again.');
    }
}

function updateDashboard(report) {
    // Update donor dashboard
    const donorDashboard = document.getElementById('donor-dashboard');
    if (donorDashboard) {
        const qualitySection = donorDashboard.querySelector('.quality-reports');
        if (qualitySection) {
            const reportElement = createReportElement(report);
            qualitySection.appendChild(reportElement);
        }
    }

    // Update receiver dashboard
    const receiverDashboard = document.getElementById('receiver-dashboard');
    if (receiverDashboard) {
        const qualitySection = receiverDashboard.querySelector('.quality-reports');
        if (qualitySection) {
            const reportElement = createReportElement(report);
            qualitySection.appendChild(reportElement);
        }
    }
}

function createReportElement(report) {
    const div = document.createElement('div');
    div.className = 'quality-report';
    div.innerHTML = `
        <div class="report-header">
            <span class="timestamp">${new Date(report.timestamp).toLocaleString()}</span>
        </div>
        <div class="report-content">
            <img src="${report.image}" alt="Food Quality Check" class="report-image">
            <div class="report-analysis">${report.analysis}</div>
        </div>
    `;
    return div;
} 