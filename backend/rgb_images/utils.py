from b2sdk.v2 import *
from flask import Blueprint, request, jsonify

# Configuration constants (should be in .env, but keeping it here for demo runs)
BUCKET_NAME = 'image-storage-37'
KEY_ID = '0057320aef546a50000000001'
APP_KEY = 'K005nA+EfnhNpd5DHQbeFwRCIYLndlQ'


def get_b2_client() -> B2Api:
    """
    Initialize, configure and return a Backblaze B2 client.
    """
    info = InMemoryAccountInfo()
    b2_api = B2Api(info)
    b2_api.authorize_account(
        "production",
        KEY_ID,
        APP_KEY
    )
    return b2_api

def get_bucket() -> Bucket:
    """
    Retrieve the Backblaze B2 bucket by name.
    """
    b2_api = get_b2_client()
    bucket = b2_api.get_bucket_by_name(BUCKET_NAME)
    return bucket

def upload_file_to_b2(file_object: bytes, file_name: str) -> str:
    """
    Upload a file to Backblaze B2 and return the file URL.
    """
    bucket = get_bucket()
    
    content_type = 'image/jpeg'  # Adjust if necessary
    bucket.upload_bytes(file_object, file_name, content_type=content_type)
    file_url = f"https://f000.backblazeb2.com/file/{BUCKET_NAME}/{file_name}"
    return file_url
