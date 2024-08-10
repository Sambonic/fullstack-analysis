import pandas as pd
import uuid
import sqlite3
import os
from flask import session
from typing import List, Any, Tuple

# Constants 
TABLE_NAME: str = None
DATABASE_FOLDER: str = str(os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/db')

def create_table(file: Any, file_name: str) -> None:
    """
    Insert CSV data into a new SQLite database table.
    """
    df = pd.read_csv(file)

    # Add a hidden id column to manage tabular data manipulation
    uuid_list = [str(uuid.uuid4()) for _ in range(len(df))]
    df.insert(0, 'uuid', uuid_list)

    table_name = os.path.splitext(file_name)[0]
    database_name = f'{table_name}.db'
    database_path = os.path.join(DATABASE_FOLDER, database_name)
    conn = sqlite3.connect(database_path)
    
    df.to_sql(table_name, conn, if_exists='replace', index=False)
    
    conn.close()

    global TABLE_NAME
    TABLE_NAME = table_name

def get_table_name() -> str:
    """
    Get the table name stored in the global variable.
    """
    global TABLE_NAME
    return TABLE_NAME

def get_connection() -> sqlite3.Connection:
    """
    Get a SQLite connection using the table name stored in the global variable.
    """
    table_name = get_table_name()
    
    database_name = f'{table_name}.db'
    database_path = os.path.join(DATABASE_FOLDER, database_name)
    conn = sqlite3.connect(database_path)
    conn.row_factory = sqlite3.Row
    return conn

def fetch_rows(table_name: str, start: int = 0, end: int = 5) -> List[dict]:
    """
    Fetch rows from the specified table within the given range.
    """
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name} LIMIT ? OFFSET ?", (end - start, start))

    rows = cursor.fetchall()
    columns, _ = fetch_cols(table_name)

    rows_as_dicts = [dict(zip(columns, row)) for row in rows]
    conn.close()
    
    return rows_as_dicts

def fetch_cols(table_name: str) -> Tuple[List[str], List[str]]:
    """
    Fetch the column names and types.
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns_info = cursor.fetchall()

        # Exclude the temporary "uuid" column
        column_names = [col[1] for col in columns_info]
        column_types = [col[2] for col in columns_info]
    except Exception as e:
        print(f"An error occurred: {e}")
        column_names, column_types = [], []

    return column_names, column_types

def get_row_count() -> int:
    """
    Get the total number of rows in the specified table from an SQLite3 database.
    """
    try:
        table_name = get_table_name()
        
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(f'SELECT COUNT(*) FROM {table_name}')
        row_count = cursor.fetchone()[0]
        conn.close()

        return row_count

    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        return None
