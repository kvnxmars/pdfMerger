from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PyPDF2 import PdfMerger
import os
import tempfile
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = tempfile.mkdtemp()
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max file size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

@app.route('/api/merge', methods=['POST'])
def merge_pdfs():
    try:
        # Check if files are in the request
        if 'files' not in request.files:
            return jsonify({'error': 'No files provided'}), 400
        
        files = request.files.getlist('files')
        output_name = request.form.get('outputName', 'merged.pdf')

        
        if not files:
            return jsonify({'error': 'No files selected'}), 400
        
        # Validate and save uploaded files
        pdf_paths = []
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                pdf_paths.append(filepath)
        
        if not pdf_paths:
            return jsonify({'error': 'No valid PDF files provided'}), 400
        
        # Merge PDFs
        merger = PdfMerger()
        for pdf_path in pdf_paths:
            merger.append(pdf_path)
        
        # Ensure output name has .pdf extension
        if not output_name.endswith('.pdf'):
            output_name += '.pdf'
        
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(output_name))
        merger.write(output_path)
        merger.close()
        
        # Clean up uploaded files
        for pdf_path in pdf_paths:
            os.remove(pdf_path)
        
        # Send merged file
        return send_file(
            output_path,
            as_attachment=True,
            download_name=output_name
            print(f"File {output_name} created successfully at {output_path}")
        )
        print(f"File {output_name} created successfully at {output_path}")
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        print(f"Error during merging: {str(e)}")
if __name__ == '__main__':
    app.run(debug=True, port=5000)
