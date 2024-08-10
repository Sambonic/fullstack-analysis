import PyPDF2
import google.generativeai as genai

# Gemini API key that should be in the .env folder but leaving it for demo purposes
GOOGLE_API_KEY = 'AIzaSyA3JzRCK2rY-qPZDJNaS2sX52qR5zO6TDE'
genai.configure(api_key=GOOGLE_API_KEY)

# Gemini settings
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize the Gemini model
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
  ]
)


def extract_text(pdf_path: str) -> str:
    """
    Extracts text from a PDF file.
    """
    text = ""
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text

def summarize_text(text: str) -> str:
    """
    Summarizes the provided text using the Gemini API.
    """
    try:
        response = chat_session.send_message(f"Please summarize the following text." 
                                             f"Provide a concise summary that captures the main points and key information."
                                              f"Avoid adding unnecessary details and ensure the summary is clear and coherent. {text}")
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"