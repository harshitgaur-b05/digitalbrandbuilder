'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface BlogSummary {
  id: string;
  title: string;
  slug: string;
  category: string;
  isActive: boolean;
  date: string;
  createdAt: string;
}

interface BlogsManagerClientProps {
  initialBlogs: BlogSummary[];
}

export default function BlogsManagerClient({ initialBlogs }: BlogsManagerClientProps) {
  const [blogs, setBlogs] = useState<BlogSummary[]>(initialBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        setBlogs(prev =>
          prev.map(blog => (blog.id === id ? { ...blog, isActive: !currentStatus } : blog))
        );
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBlogs(prev => prev.filter(blog => blog.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const term = searchTerm.toLowerCase();
    return (
      blog.title.toLowerCase().includes(term) ||
      blog.category.toLowerCase().includes(term) ||
      blog.slug.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-[#F3F1EB] p-4 md:p-8 font-sans selection:bg-[#A0AD91]/30">
      <div className="max-w-7xl mx-auto bg-white/80 border border-[#E8E5DD] rounded-2xl p-6 md:p-8 shadow-xl shadow-[#20211D]/5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-[#E8E5DD] gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#20211D]">Blog Posting</h1>
            <p className="text-sm text-[#5A5D55] mt-1">Manage articles, case studies, and updates published on your blog.</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/blogs/new"
              className="px-4 py-2 bg-[#7E8E71] text-white font-semibold rounded-xl text-sm hover:bg-[#7E8E71]/90 shadow-md shadow-[#7E8E71]/15 transition-smooth flex items-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Blog
            </Link>
            <a
              href="/admin"
              className="px-4 py-2 border border-[#E8E5DD] rounded-xl text-sm font-semibold text-[#5A5D55] hover:bg-[#F3F1EB] transition-smooth cursor-pointer"
            >
              Back
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <input
            type="text"
            placeholder="Search articles by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-[#F3F1EB]/40 border border-[#E8E5DD] rounded-xl text-[#20211D] placeholder-[#5A5D55]/50 focus:outline-none focus:ring-2 focus:ring-[#A0AD91] focus:border-[#7E8E71] transition-smooth text-sm"
          />
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto border border-[#E8E5DD] rounded-2xl bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E5DD] bg-[#F3F1EB]/40 font-semibold text-[#5A5D55]">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Publish Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5DD]">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#5A5D55]">
                    No articles found. Click "Add New Blog" to write your first post!
                  </td>
                </tr>
              ) : (
                filteredBlogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-[#F3F1EB]/20 transition-smooth">
                    <td className="px-6 py-4 font-bold text-[#20211D]">
                      <div className="flex flex-col">
                        <span>{blog.title}</span>
                        <span className="text-xs font-normal text-[#5A5D55]/60 mt-0.5">/{blog.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#5A5D55]">
                      {blog.category ? (
                        <span className="bg-[#F3F1EB] text-[#20211D] px-2.5 py-1 rounded-lg text-xs font-medium border border-[#E8E5DD]/60">
                          {blog.category}
                        </span>
                      ) : (
                        <span className="text-xs text-[#5A5D55]/40 italic">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#5A5D55]">
                      {blog.date || new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActiveStatus(blog.id, blog.isActive)}
                        disabled={updatingId === blog.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-smooth ${
                          blog.isActive
                            ? 'bg-green-50 text-green-700 border-green-100'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${blog.isActive ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        {blog.isActive ? 'Active' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 text-[#5A5D55] hover:text-[#7E8E71] hover:bg-[#F3F1EB] rounded-lg transition-smooth"
                          title="Edit Post"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="p-2 text-[#5A5D55] hover:text-red-600 hover:bg-red-50 rounded-lg transition-smooth cursor-pointer"
                          title="Delete Post"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
