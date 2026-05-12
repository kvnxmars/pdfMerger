# PDF Merger - Full Stack Setup

This project consists of:
- **Backend**: Flask API (Python) in the root directory
- **Frontend**: React app in the `pdf-merger/` directory

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm

## Backend Setup

1. Navigate to the root directory:

   ```bash
   cd d:\Projects\Python\pdfMerge
   ```

2. Activate the virtual environment (if not already activated):

   ```bash
   .venv\Scripts\Activate.ps1
   ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask backend:

   ```bash
   python app.py
   ```

   The API will run on `http://localhost:5000`

## Frontend Setup

1. Open a new PowerShell terminal and navigate to the frontend directory:

   ```bash
   cd d:\Projects\Python\pdfMerge\pdf-merger
   ```

2. Install dependencies (if not already done):

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## How to Use

1. Ensure both the backend (Flask) and frontend (React) are running
2. Open the frontend at `http://localhost:3000`
3. Select 2 or more PDF files using the file picker
4. Enter a name for the merged PDF (without the .pdf extension)
5. Click "Merge PDFs"
6. The merged PDF will download automatically

## API Endpoints

- **GET** `/api/health` - Check if the backend is running
- **POST** `/api/merge` - Merge PDF files
  - Parameters:
    - `files`: FormData with multiple PDF files
    - `outputName`: Name of the output PDF file (without extension)

## Troubleshooting

### CORS Error
If you get a CORS error, ensure the Flask backend is running on port 5000.

### Files Not Uploading
Check that the PDF files are valid and not too large (max 100MB per upload).

### Port Already in Use
- For Flask: Change the port in `app.py` (edit the last line)
- For React: Set `PORT=3001` before running `npm start`
