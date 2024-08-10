from flask import Blueprint, Response, request, jsonify
import uuid
import numpy as np
import statistics
import pandas as pd
from .utils import *

tabular_data_bp = Blueprint('tabular_data', __name__)

@tabular_data_bp.route("/upload", methods=["POST"])
def upload_data() -> Response:
    """
    Handle CSV file uploads and insert data into the database.
    """
    file = request.files.get('file')
    if file:
        try:
            create_table(file, file.filename)
            return jsonify({"message": "Upload successful"}), 200
        except Exception as e:
            return jsonify({"message": f"Upload failed: {str(e)}"}), 500
    else:
        return jsonify({"message": "Invalid file format"}), 400

@tabular_data_bp.route("/insert", methods=["POST"])
def create_row() -> Response:
    """
    Adds a new row to the database.
    """
    table_name = get_table_name()
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No JSON data received'}), 400

    columns = [key for key in data.keys()]
    values = [data[key] for key in columns]

    columns.insert(0, 'uuid')
    values.insert(0, str(uuid.uuid4()))

    value_placeholders = ', '.join(['?'] * len(values))

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(f"INSERT INTO {table_name}{tuple(columns)} VALUES ({value_placeholders})", tuple(values))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Row added successfully'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to add row: {e}'}), 500

@tabular_data_bp.route("/columns", methods=['GET'])
def get_columns() -> Response:
    """
    Retrieves column names from the database, excluding the 'uuid' column.
    """
    table_name = get_table_name()
    column_names, _ = fetch_cols(table_name)
    if column_names is None:
        return jsonify({'error': 'An error occurred while fetching column information'}), 500

    filtered_columns = [col for col in column_names if col != 'uuid']
    return jsonify({'column_names': filtered_columns})

@tabular_data_bp.route("/range", methods=['GET'])
def get_range() -> Response:
    """
    Provides the start and end range for data retrieval.
    """
    start_range = request.args.get('start', 0, type=int)
    end_range = request.args.get('end', 5, type=int)
    return jsonify({'start': start_range, 'end': end_range})

@tabular_data_bp.route("/display", methods=['GET'])
def display_data() -> Response:
    """
    Displays a range of rows from the database, defaulting to the first 5 rows.
    """
    try:
        table_name = get_table_name()
        start = int(request.args.get('start', 0))
        end = int(request.args.get('end', 5))
        rows = fetch_rows(table_name, start, end)
        row_count = get_row_count()
        response_data = {
            'rows': rows,
            'table_name': table_name,
            'row_count': row_count
        }
        return jsonify(response_data)
    except Exception as e:
        return jsonify({'error': f"Error displaying data: {e}"}), 500

@tabular_data_bp.route('/delete/<uuid>', methods=['DELETE'])
def delete_row(uuid: str) -> Response:
    """
    Deletes a row from the database based on the provided UUID.
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        table_name = get_table_name()
        cursor.execute(f'DELETE FROM {table_name} WHERE uuid = ?', (uuid,))
        conn.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Row not found'}), 404
        
        return jsonify({'message': 'Row deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': 'An error occurred during deletion'}), 500

    finally:
        conn.close()

@tabular_data_bp.route('/update', methods=['PUT'])
def update_row() -> Response:
    """
    Updates a row in the database based on the provided JSON data.
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        table_name = get_table_name()
        updated_data = request.json

        set_clause = ', '.join([f'"{key}" = ?' for key in updated_data.keys() if key != 'uuid'])
        values = list(updated_data.values())

        cursor.execute(f'UPDATE {table_name} SET {set_clause} WHERE uuid = ?', values)
        conn.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Row not found'}), 404
        
        return jsonify({'message': 'Row updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': 'An error occurred during update'}), 500

    finally:
        conn.close()

@tabular_data_bp.route('/stats/<column_name>', methods=['GET'])
def get_statistics(column_name: str) -> Response:
    """
    Retrieves statistical data for a specified column.
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    table_name = get_table_name()
    cursor.execute(f'SELECT "{column_name}" FROM {table_name}')
    data = [row[0] for row in cursor.fetchall() if isinstance(row[0], (int, float))]

    if not data:
        return jsonify({
            'mean': '-',
            'median': '-',
            'mode': '-',
            'q1': '-',
            'q2': '-',
            'q3': '-',
            'outliers': '-',
        })
    else:
        mean = round(np.mean(data), 3)
        median = round(np.median(data), 3)
        mode = round(statistics.mode(data), 3)

        data_array = np.array(data)
        q1 = round(np.percentile(data_array, 25), 3)
        q3 = round(np.percentile(data_array, 75), 3)

        dif = q3 - q1
        lower_bound = q1 - 1.5 * dif
        upper_bound = q3 + 1.5 * dif

        outliers = ', '.join([str(round(x, 3)) for x in data if x < lower_bound or x > upper_bound][:5])

        return jsonify({
            'mean': mean,
            'median': median,
            'mode': mode,
            'q1': q1,
            'q3': q3,
            'outliers': outliers,
        })

@tabular_data_bp.route('/export', methods=['GET'])
def export_csv() -> Response:
    """
    Exports the data from the database as a CSV file.
    """
    conn = get_connection()
    table_name = get_table_name()
    query = f"SELECT * FROM {table_name};"
    
    df = pd.read_sql_query(query, conn)
    csv_data = df.to_csv(index=False)
    conn.close()
    
    return Response(
        csv_data,
        mimetype='text/csv'
    )
