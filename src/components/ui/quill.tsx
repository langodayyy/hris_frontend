'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { pdfExporter } from 'quill-to-pdf';
import { saveAs } from 'file-saver';

interface QuillEditorProps {
  template?: string;
}

export interface QuillEditorHandle {
  getPdfBlob: () => Promise<Blob | null>;
}

const QuillEditor = forwardRef<QuillEditorHandle, QuillEditorProps>(({ template = '' }: QuillEditorProps, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write document...',
        modules: {
          toolbar: {
            container: toolbarRef.current!,
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.setText(template);
    }
  }, [template]);

  useImperativeHandle(ref, () => ({
    async getPdfBlob() {
      if (quillRef.current) {
        const delta = quillRef.current.getContents();
        const blob = await pdfExporter.generatePdf(delta);
        return blob;
      }
      return null;
    },
  }));

  const exportToPdf = async () => {
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      const blob = await pdfExporter.generatePdf(delta);

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const minute = String(now.getMinutes()).padStart(2, '0');

      const timestamp = `${year}${month}${day}${hour}${minute}`;

      saveAs(blob, `document${timestamp}.pdf`);
    }
  };

  useEffect(() => {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', exportToPdf);
    }
    return () => {
      if (downloadBtn) {
        downloadBtn.removeEventListener('click', exportToPdf);
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={toolbarRef}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Toolbar bagian kiri */}
        <div className="ql-toolbar-group" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <span className="ql-formats">
            <select title="Font" className="ql-font" />
            <select title="Font Size" className="ql-size" />
          </span>
          <span className="ql-formats">
            <button title="Bold" className="ql-bold" />
            <button title="Italic" className="ql-italic" />
            <button title="Underline" className="ql-underline" />
            <button title="Strikethrough" className="ql-strike" />
          </span>
          <span className="ql-formats">
            <button title="Numbering" className="ql-list" value="ordered" />
            <button title="Bullets" className="ql-list" value="bullet" />
          </span>
          <span className="ql-formats">
            <select title="Font Color" className="ql-color" />
            <select title="Text Highlight Color" className="ql-background" />
          </span>
          <span className="ql-formats">
            <button title="Insert Picture" className="ql-image" />
            <button title="Insert Link" className="ql-link" />
          </span>
        </div>

        {/* Tombol Download di kanan */}
        <div style={{ marginLeft: 'auto' }}>
          <button id="download-btn" title="Download PDF" style={{ padding: '4px 8px', fontSize: '18px' }}>
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_462_2148)">
            <path d="M6.17401 11.3263C6.34814 11.5005 6.55489 11.6387 6.78245 11.733C7.01002 11.8273 7.25393 11.8759 7.50026 11.8759C7.74659 11.8759 7.99051 11.8273 8.21807 11.733C8.44564 11.6387 8.65239 11.5005 8.82651 11.3263L10.8334 9.31938C10.941 9.20037 10.9987 9.04455 10.9946 8.88416C10.9905 8.72378 10.9248 8.57112 10.8113 8.45779C10.6977 8.34447 10.5449 8.27916 10.3845 8.27538C10.2241 8.2716 10.0684 8.32965 9.94964 8.4375L8.12089 10.2669L8.12526 0.625C8.12526 0.45924 8.05941 0.300269 7.9422 0.183058C7.82499 0.065848 7.66602 0 7.50026 0V0C7.3345 0 7.17553 0.065848 7.05832 0.183058C6.94111 0.300269 6.87526 0.45924 6.87526 0.625L6.86964 10.255L5.05089 8.4375C4.93361 8.32031 4.77459 8.2545 4.60879 8.25456C4.443 8.25462 4.28402 8.32054 4.16683 8.43781C4.04963 8.55509 3.98383 8.71412 3.98389 8.87991C3.98395 9.0457 4.04986 9.20468 4.16714 9.32188L6.17401 11.3263Z" fill="currentColor"/>
            <path d="M14.375 9.99991C14.2092 9.99991 14.0503 10.0658 13.9331 10.183C13.8158 10.3002 13.75 10.4591 13.75 10.6249V13.1249C13.75 13.2907 13.6842 13.4496 13.5669 13.5668C13.4497 13.6841 13.2908 13.7499 13.125 13.7499H1.875C1.70924 13.7499 1.55027 13.6841 1.43306 13.5668C1.31585 13.4496 1.25 13.2907 1.25 13.1249V10.6249C1.25 10.4591 1.18415 10.3002 1.06694 10.183C0.949732 10.0658 0.79076 9.99991 0.625 9.99991C0.45924 9.99991 0.300269 10.0658 0.183058 10.183C0.065848 10.3002 0 10.4591 0 10.6249L0 13.1249C0 13.6222 0.197544 14.0991 0.549175 14.4507C0.900805 14.8024 1.37772 14.9999 1.875 14.9999H13.125C13.6223 14.9999 14.0992 14.8024 14.4508 14.4507C14.8025 14.0991 15 13.6222 15 13.1249V10.6249C15 10.4591 14.9342 10.3002 14.8169 10.183C14.6997 10.0658 14.5408 9.99991 14.375 9.99991Z" fill="currentColor"/>
            </g>
            <defs>
            <clipPath id="clip0_462_2148">
            <rect width="15" height="15" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        style={{
          maxHeight: '1200px',
          minHeight: '300px',
          overflowY: 'auto',
          marginBottom: '1rem',
        }}
      />
    </div>
  );

});

QuillEditor.displayName = 'QuillEditor';
export default QuillEditor;
