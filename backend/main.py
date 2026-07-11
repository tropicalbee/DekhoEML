from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import sys

# Ensure the parser module can be imported
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from parser.eml_parser import parse_eml

app = FastAPI(title="EML Viewer API")

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, lock this down to your frontend's local URL (e.g., http://localhost:5173)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/upload")
async def upload_eml(file: UploadFile = File(...)):
    if not file.filename.endswith('.eml'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only .eml files are supported.")
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    try:
        # Save file to uploads/ directory
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Parse the saved EML file
        parsed_data = parse_eml(file_path)
        return parsed_data
        
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error while processing the file.")
    finally:
        # Optional: Clean up the file after parsing to save space
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)