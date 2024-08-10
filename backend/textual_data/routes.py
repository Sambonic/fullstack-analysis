from flask import Blueprint, request, jsonify
import os
import tempfile
from .utils import extract_text, summarize_text

textual_data_bp = Blueprint('textual_data', __name__)

@textual_data_bp.route('/upload_text', methods=['POST'])
def upload_text() -> str:
    """
    Handles direct text summarization.
    """
    print("Received text summarization request")
    if request.json and 'text' in request.json:
        text: str = request.json['text']
        summary: str = summarize_text(text)
        return jsonify({'summary': summary})
    
    return jsonify({'error': 'No text provided'}), 400

@textual_data_bp.route('/upload_document', methods=['POST'])
def upload_document() -> str:
    """
    Handles document summarization.
    """
    if 'document' in request.files:
        document = request.files['document']
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(document.read())
            temp_file_path: str = temp_file.name
        
        text: str = extract_text(temp_file_path)
        summary: str = summarize_text(text)
        
        os.remove(temp_file_path)
        return jsonify({'summary': summary})
    
    return jsonify({'error': 'No document provided'}), 400
