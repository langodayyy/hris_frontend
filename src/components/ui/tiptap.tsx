'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

type TiptapProps = {
  template: string
}

export default function Tiptap({ template }: TiptapProps) {
  const [placeholders, setPlaceholders] = useState<string[]>([])
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [pages, setPages] = useState<string[]>([])

  const editor = useEditor({
    extensions: [StarterKit],
    content: template,
  })

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ekstrak placeholder dari template
  useEffect(() => {
    const matches = Array.from(template.matchAll(/{{(.*?)}}/g)).map((m) => m[1])
    const uniqueKeys = [...new Set(matches)]
    setPlaceholders(uniqueKeys)

    const initialValues: Record<string, string> = {}
    uniqueKeys.forEach((key) => {
      initialValues[key] = ''
    })
    setFormValues(initialValues)
  }, [template])

  // Generate HTML dari template
  const generateContent = () => {
    let html = template
    Object.entries(formValues).forEach(([key, value]) => {
      html = html.replaceAll(`{{${key}}}`, value || '________')
    })
    return html
  }

  // Update editor ketika formValues berubah
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(generateContent())
    }
  }, [formValues, editor])

  // Pagination otomatis
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
    const bottomBuffer = 192
    const nodes = Array.from(tempDiv.childNodes)

    nodes.forEach((node: any) => {
      const height = node.scrollHeight || node.offsetHeight || 20
      if (currentHeight + height + bottomBuffer > maxHeight) {
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

  const params = useParams<{ id: string }>();
  const employeeId = params.id;
  return (

      <div className="flex w-3/4 gap-6 ">
        {/* Preview halaman dengan scroll */}
        <div className="flex max-h-[140vh] overflow-y-auto">
          {pages.map((html, idx) => (
            <div
              key={idx}
              className={`w-[794px] border border-neutral-200 h-[1123px] pt-24 px-24 pb-32 mx-auto shadow-sm bg-white overflow-hidden relative break-after-page font-serif text-[14px] leading-[1.75] ${idx !== pages.length - 1 ? 'mb-8' : ''}`}

              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}

        </div>
         {/* Form otomatis dari placeholder */}
    
          <div className="flex flex-col gap-[8px] flex-1">
            {placeholders.map((key) => (
              <div key={key} className="flex flex-col gap-[6px]">
                <Label className="block capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</Label>
                <Input
                  type="text"
                  value={formValues[key] || ''}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
                
              </div>
              
            ))}
             <div className="flex flex-1 gap-[10px] justify-end items-start mt-[8px]">
                <Link href={`/employee/${employeeId}`}>
                  <Button className="h-[40px]" variant="outline" size="lg">
                      Cancel
                  </Button>
                </Link>
                
                <Button className="w-[80px] h-[40px]" variant="default" type="submit">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 3V8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Save
                </Button>
            </div>
          </div>

      </div>

  )
}
