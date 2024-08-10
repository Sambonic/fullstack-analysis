from flask import Blueprint

app = Blueprint('tabular_data', __name__)

from . import routes
