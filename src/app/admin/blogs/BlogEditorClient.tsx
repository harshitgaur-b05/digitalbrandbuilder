'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import UnderlineExt from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import ImageExt from '@tiptap/extension-image';
import LinkExt from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQ {
  question: string;
  answer: string;
  tag?: string;
}

interface BlogData {
  id?: string;
  title: string;
  slug: string;
  intro?: string;
  excerpt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  priority?: number;
  heroImage?: { url: string; alt: string; filename: string };
  content?: string; // Rich HTML content from Tiptap
  faqs?: FAQ[];
}

interface BlogEditorClientProps {
  mode: 'create' | 'edit';
  initialData?: BlogData;
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────

function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg text-sm transition-smooth cursor-pointer ${
        active
          ? 'bg-primary text-white'
          : 'text-muted-foreground hover:bg-background hover:text-foreground'
      } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

// ─── Rich Text Toolbar ────────────────────────────────────────────────────────

function RichToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const addImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url && editor) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Error uploading image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter link URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-muted bg-card sticky top-0 z-10 rounded-t-2xl">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
      {/* History */}
      <div className="flex gap-0.5 pr-2 border-r border-muted mr-2">
        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
        </ToolbarButton>
      </div>

      {/* Headings */}
      <div className="flex gap-0.5 pr-2 border-r border-muted mr-2">
        <ToolbarButton title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <span className="font-bold text-xs">H1</span>
        </ToolbarButton>
        <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <span className="font-bold text-xs">H2</span>
        </ToolbarButton>
        <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <span className="font-bold text-xs">H3</span>
        </ToolbarButton>
        <ToolbarButton title="Paragraph" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M13 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/></svg>
        </ToolbarButton>
      </div>

      {/* Text Styles */}
      <div className="flex gap-0.5 pr-2 border-r border-muted mr-2">
        <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </ToolbarButton>
      </div>

      {/* Alignment */}
      <div className="flex gap-0.5 pr-2 border-r border-muted mr-2">
        <ToolbarButton title="Align Left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Align Center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="12" x2="7" y2="12"/><line x1="19" y1="18" x2="5" y2="18"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Align Right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
        </ToolbarButton>
      </div>

      {/* Lists & Blocks */}
      <div className="flex gap-0.5 pr-2 border-r border-muted mr-2">
        <ToolbarButton title="Bullet List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Ordered List" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3.691 6.292C5.094 4.771 7.217 4 10 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 6.925 10H10a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2H3a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789zM20 20h-6a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789C16.094 4.771 18.217 4 21 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 17.925 10H21a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2z"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Code Block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="m10 9-3 3 3 3"/><path d="m14 15 3-3-3-3"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="3" y1="12" x2="21" y2="12"/></svg>
        </ToolbarButton>
      </div>

      {/* Link & Image */}
      <div className="flex gap-0.5">
        <ToolbarButton title="Insert Link" active={editor.isActive('link')} onClick={setLink}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </ToolbarButton>
        <ToolbarButton title="Insert Image" onClick={addImage} disabled={uploading}>
          {uploading ? (
            <span className="w-4 h-4 border-2 border-[var(--muted-foreground)]/20 border-t-muted-foreground rounded-full animate-spin"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          )}
        </ToolbarButton>
      </div>

      {/* Word Count */}
      <div className="ml-auto text-[10px] font-medium text-muted-foreground/60 pr-1 hidden sm:block">
        {editor.storage.characterCount.words()} words
      </div>
    </div>
  );
}

// ─── Main Editor Component ────────────────────────────────────────────────────

export default function BlogEditorClient({ mode, initialData }: BlogEditorClientProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'write' | 'meta' | 'seo' | 'faqs'>('write');

  // Meta fields
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [author, setAuthor] = useState(initialData?.author || 'Admin');
  const [category, setCategory] = useState(initialData?.category || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [priority, setPriority] = useState(initialData?.priority?.toString() || '0');
  const [isActive, setIsActive] = useState(initialData?.isActive !== false);
  const [heroUrl, setHeroUrl] = useState(initialData?.heroImage?.url || '');
  const [heroAlt, setHeroAlt] = useState(initialData?.heroImage?.alt || '');
  const [heroFilename, setHeroFilename] = useState(initialData?.heroImage?.filename || '');

  // SEO fields
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');

  // FAQs
  const [faqs, setFaqs] = useState<FAQ[]>(initialData?.faqs || []);

  // Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExt,
      Typography,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ImageExt.configure({ inline: false, allowBase64: false }),
      LinkExt.configure({ openOnClick: false, HTMLAttributes: { class: 'text-primary underline' } }),
      Placeholder.configure({ placeholder: 'Start writing your blog post here... Use the toolbar above to format your content.' }),
      CharacterCount,
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[500px] p-8 focus:outline-none font-sans text-foreground leading-relaxed',
      },
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (mode === 'create') {
      setSlug(slugify(val, { lower: true, strict: true }));
    }
  };

  const addFAQ = () => setFaqs(prev => [...prev, { question: '', answer: '' }]);
  const removeFAQ = (i: number) => setFaqs(prev => prev.filter((_, idx) => idx !== i));
  const updateFAQ = (i: number, field: keyof FAQ, value: string) => {
    setFaqs(prev => prev.map((faq, idx) => idx === i ? { ...faq, [field]: value } : faq));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      title,
      slug,
      intro: excerpt,
      excerpt,
      author,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      seoTitle,
      seoDescription,
      isActive,
      priority: parseInt(priority, 10) || 0,
      heroImage: heroUrl ? { url: heroUrl, alt: heroAlt, filename: heroFilename } : undefined,
      content: editor?.getHTML() || '',
      faqs,
    };

    try {
      const endpoint = mode === 'create' ? '/api/admin/blogs' : `/api/admin/blogs/${initialData?.id}`;
      const res = await fetch(endpoint, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save blog post.');
      router.push('/admin/blogs');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Tiptap Prose Styles */}
      <style jsx global>{`
        .tiptap p.is-editor-empty:first-child::before {
          color: #a0ad91;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .tiptap h1 { font-size: 2.25rem; font-weight: 800; line-height: 1.15; margin-bottom: 1rem; color: var(--foreground); }
        .tiptap h2 { font-size: 1.75rem; font-weight: 700; line-height: 1.2; margin-bottom: 0.85rem; color: var(--foreground); border-bottom: 2px solid var(--muted); padding-bottom: 0.4rem; margin-top: 1.8rem; }
        .tiptap h3 { font-size: 1.35rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--foreground); margin-top: 1.5rem; }
        .tiptap p { margin-bottom: 1.1rem; color: var(--foreground); }
        .tiptap ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .tiptap ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .tiptap li { margin-bottom: 0.4rem; color: var(--foreground); }
        .tiptap blockquote { border-left: 4px solid oklch(0.65 0.15 250 / 70%); padding-left: 1.25rem; color: var(--muted-foreground); font-style: italic; margin: 1.5rem 0; background: var(--background); padding: 1rem 1.25rem; border-radius: 0 0.75rem 0.75rem 0; }
        .tiptap code { background: var(--background); color: var(--primary); padding: 0.15rem 0.4rem; border-radius: 0.35rem; font-family: 'Fira Code', monospace; font-size: 0.88em; }
        .tiptap pre { background: var(--foreground); color: var(--background); padding: 1.25rem; border-radius: 0.85rem; overflow-x: auto; margin: 1.5rem 0; }
        .tiptap pre code { background: transparent; color: inherit; padding: 0; }
        .tiptap hr { border: none; border-top: 2px solid var(--muted); margin: 2rem 0; }
        .tiptap img { max-width: 100%; border-radius: 0.75rem; margin: 1.5rem 0; }
        .tiptap a { color: var(--primary); text-decoration: underline; }
        .tiptap a:hover { color: var(--muted-foreground); }
        .tiptap .ProseMirror-selectednode { outline: 2px solid oklch(0.65 0.15 250 / 70%); outline-offset: 2px; border-radius: 4px; }
        .bubble-menu { background: var(--foreground); border-radius: 0.6rem; box-shadow: 0 4px 20px rgba(0,0,0,0.2); display: flex; overflow: hidden; }
        .bubble-menu button { color: var(--background); padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .bubble-menu button:hover { background: rgba(255,255,255,0.1); }
        .bubble-menu button.is-active { background: var(--primary); }
      `}</style>

      <div className="min-h-screen bg-background p-0 md:p-6 font-sans selection:bg-primary/20/30">
        <form onSubmit={handleSubmit}>
          <div className="max-w-6xl mx-auto">

            {/* Top Action Bar */}
            <div className="flex items-center justify-between mb-4 px-4 md:px-0 pt-4 md:pt-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/admin/blogs')}
                  className="text-muted-foreground hover:text-foreground transition-smooth text-sm font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Blog Posts
                </button>
                <span className="text-muted">/</span>
                <span className="text-sm font-semibold text-foreground">
                  {mode === 'create' ? 'New Post' : 'Editing'}
                </span>
              </div>
              <div className="flex gap-2">
                {mode === 'edit' && slug && (
                  <a
                    href={`/blog/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-sm font-semibold border border-muted bg-card text-muted-foreground hover:bg-background hover:text-emerald-600 hover:border-emerald-200 transition-smooth flex items-center gap-1.5 cursor-pointer"
                    title="View this post on the public blog"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    View Post
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setIsActive(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-smooth cursor-pointer ${
                    !isActive ? 'bg-foreground text-white border-foreground' : 'bg-card text-muted-foreground border-muted hover:bg-background'
                  }`}
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={() => setIsActive(true)}
                  className="px-5 py-2 bg-primary text-white hover:bg-primary/90 font-semibold rounded-xl text-sm transition-smooth shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-60 flex items-center gap-2 min-w-32 justify-center"
                >
                  {submitting ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                      </svg>
                      {mode === 'create' ? 'Publish' : 'Update'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 mx-4 md:mx-0 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Main Layout: Editor + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

              {/* Left: Editor Panel */}
              <div className="space-y-4">
                {/* Title Input */}
                <div className="bg-card border border-muted rounded-2xl px-8 py-6 shadow-sm">
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full text-3xl md:text-4xl font-bold text-foreground placeholder-[oklch(0.65 0.15 250 / 70%)] focus:outline-none bg-transparent"
                    placeholder="Post title..."
                  />
                  {slug && (
                    <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
                      slug: /{slug}
                    </p>
                  )}
                </div>

                {/* Rich Text Editor */}
                <div className="bg-card border border-muted rounded-2xl overflow-hidden shadow-sm">
                  <RichToolbar editor={editor} />

                  {editor && (
                    <BubbleMenu editor={editor}>
                      <div className="bubble-menu">
                        <button type="button" className={editor.isActive('bold') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
                        <button type="button" className={editor.isActive('italic') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
                        <button type="button" className={editor.isActive('underline') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
                        <button type="button" className={editor.isActive('link') ? 'is-active' : ''} onClick={() => { const url = prompt('URL:'); if (url) editor.chain().focus().setLink({ href: url }).run(); }}>Link</button>
                      </div>
                    </BubbleMenu>
                  )}

                  <EditorContent editor={editor} />
                </div>
              </div>

              {/* Right: Sidebar Settings */}
              <div className="space-y-4">

                {/* Tab Nav */}
                <div className="bg-card border border-muted rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex border-b border-muted">
                    {(['meta', 'seo', 'faqs'] as const).map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-smooth cursor-pointer ${
                          activeTab === tab
                            ? 'text-primary border-b-2 border-primary bg-background/30'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab === 'faqs' ? 'FAQ' : tab}
                      </button>
                    ))}
                  </div>

                  {/* Meta Tab */}
                  {activeTab === 'meta' && (
                    <div className="p-5 space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Slug</label>
                        <input
                          type="text"
                          required
                          value={slug}
                          onChange={e => setSlug(e.target.value)}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Excerpt</label>
                        <textarea
                          value={excerpt}
                          onChange={e => setExcerpt(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                          placeholder="Short summary for cards..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Author</label>
                        <input
                          type="text"
                          value={author}
                          onChange={e => setAuthor(e.target.value)}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Category</label>
                        <input
                          type="text"
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Marketing, Growth..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Tags</label>
                        <input
                          type="text"
                          value={tags}
                          onChange={e => setTags(e.target.value)}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="seo, branding, ads"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Priority</label>
                        <input
                          type="number"
                          value={priority}
                          onChange={e => setPriority(e.target.value)}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="border-t border-muted pt-4 space-y-3">
                        <div className="flex justify-between items-center mb-1.5">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0">Hero Banner</p>
                          <label className="text-[10px] font-bold text-primary uppercase tracking-wider cursor-pointer hover:underline">
                            Upload Image
                            <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const formData = new FormData();
                              formData.append('file', file);
                              try {
                                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                const data = await res.json();
                                if (data.url) setHeroUrl(data.url);
                                else alert(data.error || 'Upload failed');
                              } catch(err) {
                                alert('Upload failed');
                              }
                            }} />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={heroUrl}
                          onChange={e => setHeroUrl(e.target.value)}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="https://... (image URL)"
                        />
                        <input
                          type="text"
                          value={heroAlt}
                          onChange={e => setHeroAlt(e.target.value)}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Alt text"
                        />
                        {heroUrl && (
                          <img src={heroUrl} alt="preview" className="w-full rounded-xl border border-muted object-cover max-h-40" onError={e => (e.currentTarget.style.display = 'none')} />
                        )}
                      </div>
                    </div>
                  )}

                  {/* SEO Tab */}
                  {activeTab === 'seo' && (
                    <div className="p-5 space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">SEO Title</label>
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={e => setSeoTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Google search title"
                        />
                        <p className={`text-[10px] mt-1 ${seoTitle.length > 60 ? 'text-red-500' : 'text-muted-foreground/60'}`}>
                          {seoTitle.length}/60 chars
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Meta Description</label>
                        <textarea
                          value={seoDescription}
                          onChange={e => setSeoDescription(e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 bg-background/40 border border-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                          placeholder="Compelling description for search results..."
                        />
                        <p className={`text-[10px] mt-1 ${seoDescription.length > 160 ? 'text-red-500' : 'text-muted-foreground/60'}`}>
                          {seoDescription.length}/160 chars
                        </p>
                      </div>
                      {/* Preview */}
                      {(seoTitle || seoDescription) && (
                        <div className="bg-card border border-muted rounded-xl p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Search Preview</p>
                          <p className="text-xs text-muted-foreground/60 font-mono mb-1">digitalbrandbuilder.in/blog/{slug}</p>
                          <p className="text-sm text-blue-600 font-medium leading-tight mb-1">{seoTitle || title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{seoDescription}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* FAQs Tab */}
                  {activeTab === 'faqs' && (
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-foreground">FAQs ({faqs.length})</p>
                        <button
                          type="button"
                          onClick={addFAQ}
                          className="text-xs text-primary font-bold cursor-pointer hover:underline"
                        >
                          + Add FAQ
                        </button>
                      </div>
                      {faqs.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-6">No FAQs yet.</p>
                      ) : (
                        faqs.map((faq, i) => (
                          <div key={i} className="space-y-2 border-t border-muted pt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-primary uppercase">Q{i + 1}</span>
                              <button type="button" onClick={() => removeFAQ(i)} className="text-[10px] text-red-400 hover:text-red-600 cursor-pointer">Remove</button>
                            </div>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={e => updateFAQ(i, 'question', e.target.value)}
                              className="w-full px-3 py-2 bg-background/40 border border-muted rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary/20"
                              placeholder="Question..."
                            />
                            <textarea
                              value={faq.answer}
                              onChange={e => updateFAQ(i, 'answer', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-background/40 border border-muted rounded-lg text-xs resize-none focus:outline-none focus:ring-1 focus:ring-primary/20"
                              placeholder="Answer..."
                            />
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

