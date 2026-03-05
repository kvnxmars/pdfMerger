# PDF Merger

Simple command-line utility to merge multiple PDF files into one using Python and PyPDF2.

## Requirements

- Python 3.6+
- `PyPDF2` library
- `tkinter` (usually included with standard Python installations)

## Installation

1. Clone the repository or download the source files.
2. (Optional) Create a virtual environment:

   ```bash
   python -m venv .venv
   . .venv/bin/activate  # or `.venv\Scripts\Activate.ps1` on Windows
   ```

3. Install dependencies:

   ```bash
   pip install PyPDF2
   ```

## Usage

Run the `merger.py` script from the project directory:

```bash
python merger.py
```

A file dialog will open to select the PDF files you wish to combine. After selecting the files, you will be prompted to enter a name for the merged output file. The result will be saved in the same folder as the first selected PDF.

### Example

1. Execute `python merger.py`.
2. Choose two or more PDFs from the dialog.
3. When asked for a name, type `combined` (without `.pdf`).
4. The merged file `combined.pdf` appears alongside the original files.

## Notes

- Files are merged in the order they are selected.
- The script uses `tkinter` for the selection dialog; a graphical environment is required.

## License

This project is provided as-is under the MIT License. Feel free to use or modify it.
