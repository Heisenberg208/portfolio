import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    # Sample projects data
    projects_data = [
        {
            'title': 'Business Card OCR with Gemini AI',
            'description': 'Developed a Streamlit web app to extract, clean, and structure contact details from business card images using EasyOCR and Google Gemini (LLM).',
            'tech_stack': ['Python', 'Streamlit', 'EasyOCR', 'OpenCV', 'Gemini API'],
            'github_link': '#'
        },
        {
            'title': 'Multi-modal Fabric Search Utility',
            'description': 'Built a fabric similarity search application using CLIP-based embeddings and LanceDB vector search with image and text inputs.',
            'tech_stack': ['Python', 'CLIP', 'LanceDB', 'Streamlit'],
            'github_link': '#'
        },
        {
            'title': 'Voice-Based Form Submission App',
            'description': 'Designed and implemented a multilingual voice-enabled form system with real-time debugging and automated submission.',
            'tech_stack': ['Python', 'Streamlit', 'SpeechRecognition'],
            'github_link': '#'
        },
        {
            'title': 'NLP Chatbot',
            'description': 'Developed an intelligent chatbot with real-time response generation and web search integration for natural interactions.',
            'tech_stack': ['Python', 'TensorFlow', 'Tkinter', 'Scikit-learn'],
            'github_link': '#'
        }
    ]
    return render_template('projects.html', projects=projects_data)

@app.route('/contact')
def contact():
    return render_template('contact.html')



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # fallback for local use
    app.run(debug=True, host="0.0.0.0", port=port)
