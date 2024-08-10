from flask import Flask, jsonify
from flask_cors import CORS
from tabular_data.routes import tabular_data_bp
from rgb_images.routes import rgb_images_bp
from textual_data.routes import textual_data_bp

def create_app():
    app = Flask(__name__)

    app.secret_key = "secret_key"
    # Enable CORS for all routes
    CORS(app)

    app.register_blueprint(tabular_data_bp, url_prefix='/tabular_data')
    app.register_blueprint(rgb_images_bp, url_prefix='/rgb_images')
    app.register_blueprint(textual_data_bp, url_prefix='/textual_data')

    @app.route('/', methods=['GET'])
    def connection_check():
        return jsonify({'status': 'ok'}), 200
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
