'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'

const contractTemplate = `
<p>This Employment Contract is made and entered into on <strong>{{contractDate}}</strong> between <strong>{{companyName}}</strong> ("Company") and <strong>{{employeeName}}</strong> ("Employee").</p>

<p>1. <strong>Position:</strong> The Employee will be employed as a <strong>{{jobTitle}}</strong> starting from <strong>{{startDate}}</strong>.</p>

<p>2. <strong>Salary:</strong> The Employee will be paid a salary of <strong>{{salary}}</strong> per month.</p>

<p>3. <strong>Working Hours:</strong> Working hours shall be from <strong>{{workingHours}}</strong> on weekdays.</p>

<p>4. <strong>Termination:</strong> Either party may terminate this contract with a written notice of <strong>{{noticePeriod}}</strong>.</p>

<p>IN WITNESS WHEREOF, the parties have executed this Employment Contract on the date first written above.</p>

<p>__________________________<br /><strong>{{employeeName}}</strong></p>

<p>__________________________<br /><strong>{{companyName}}</strong></p>
`

export default function Tiptap() {
  const [formValues, setFormValues] = useState({
    employeeName: '',
    companyName: '',
    contractDate: '',
    startDate: '',
    jobTitle: '',
    salary: '',
    workingHours: '',
    noticePeriod: '',
  })

  const editor = useEditor({
    extensions: [StarterKit],
    content: contractTemplate,
  })

  const [pages, setPages] = useState<string[]>([])

  // Ganti placeholder template dengan form values
  const generateContent = () => {
    let html = contractTemplate
    Object.entries(formValues).forEach(([key, value]) => {
      html = html.replaceAll(`{{${key}}}`, value || '________')
    })
    return html
  }

  // Update editor content ketika form berubah
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(generateContent())
    }
  }, [formValues, editor])

  // Auto pagination untuk preview
  useEffect(() => {
    if (!editor) return

    const html = editor.getHTML()
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    tempDiv.style.width = '794px'
    tempDiv.style.padding = '96px'
    tempDiv.style.position = 'absolute'
    tempDiv.style.visibility = 'hidden'
    tempDiv.style.lineHeight = '1.75'
    tempDiv.style.fontFamily = 'serif'
    tempDiv.style.fontSize = '14px'
    document.body.appendChild(tempDiv)

    const maxHeight = 1123 - 192
    let currentHeight = 0
    let pageContent: string[] = []
    const resultPages: string[][] = []

    const nodes = Array.from(tempDiv.childNodes)

    nodes.forEach((node: any) => {
      const height = node.scrollHeight || node.offsetHeight || 20
      if (currentHeight + height > maxHeight) {
        resultPages.push([...pageContent])
        pageContent = []
        currentHeight = 0
      }
      pageContent.push(node.outerHTML)
      currentHeight += height
    })

    if (pageContent.length) resultPages.push(pageContent)

    setPages(resultPages.map((p) => p.join('')))
    document.body.removeChild(tempDiv)
  }, [editor?.getHTML()])

  return (
    <div className="flex gap-6">
      {/* Form Input */}
      <div className="flex-1 space-y-2 text-sm">
        {Object.keys(formValues).map((key) => (
          <div key={key}>
            <label className="block capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full"
              value={formValues[key as keyof typeof formValues]}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
            />
          </div>
        ))}
      </div>

      {/* Editor & Preview */}
      <div className="flex-1">
        {/* <EditorContent editor={editor} className="border mb-4 rounded p-2 bg-white" /> */}

        {pages.map((html, idx) => (
          <div
            key={idx}
            className="w-[794px] h-[1123px] p-24 my-4 mx-auto shadow-sm bg-white overflow-hidden relative break-after-page font-serif text-[14px] leading-[1.75]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </div>
    </div>
  )
}
