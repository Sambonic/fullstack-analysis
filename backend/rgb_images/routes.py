from b2sdk.v2 import *
from flask import Blueprint, request, jsonify
from .utils import *

rgb_images_bp = Blueprint('rgb_images', __name__)


@rgb_images_bp.route('/upload', methods=['POST'])
def upload() -> jsonify:
    """
    Handle file uploads, generate histograms, and return file URLs and histograms.
    """
    if 'files' not in request.files:
        return jsonify({'message': 'No files part'}), 400
    
    files = request.files.getlist('files')
    if not files:
        return jsonify({'message': 'No selected files'}), 400
    
    file_urls = []
    histograms = []
    
    for file in files:
        file_name = file.filename
        file_object = file.read()
        
        file_url = upload_file_to_b2(file_object, file_name)
        file_urls.append(file_url)
        
        file.seek(0)
        # Generate histogram logic goes here
    
    return jsonify({
        'message': 'Files uploaded successfully',
        'urls': file_urls,
        'histograms': histograms
    }), 200
