from PyPDF2 import PdfMerger, PdfReader
import os #for file handling

"""Opens multiple PDF files and merges them into a single PDF file. The program will sort the PDF files in the order they were selected by user. The merged file will be saved in the same directory as orginal files with new name typed by user."""

def merge_pdfs(pdf_files, output_file):
    merger = PdfMerger()

    for pdf in pdf_files:
        merger.append(pdf) #merges the PDF files in the order they were selected by user
    merger.write(output_file) #saves the merged PDF file with the name provided by user
    merger.close() #closes the merger object

if __name__ == "__main__":
    # Select PDF files from file dialog
    from tkinter import Tk
    from tkinter.filedialog import askopenfilenames

    root = Tk()
    root.withdraw()  # Hide the main window
    pdf_files = askopenfilenames(title="Select PDF files", filetypes=[("PDF files", "*.pdf")])
    root.destroy()

    if not pdf_files:
        print("No PDF files selected.")
        exit()

    output_file = input("Enter the name for the merged PDF file (without extension): ")
    output_file += ".pdf"

    output_dir = os.path.dirname(pdf_files[0])  # Use directory of first selected file
    output_file = os.path.join(output_dir, output_file)

    merge_pdfs(pdf_files, output_file)

    print(f"Merged PDF saved as: {output_file}")
