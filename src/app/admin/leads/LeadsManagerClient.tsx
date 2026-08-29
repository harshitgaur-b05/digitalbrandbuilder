'use client';

import React, { useState } from 'react';

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  status: 'unread' | 'contacted' | 'archived';
  createdAt: string;
}

interface LeadsManagerClientProps {
  initialLeads: LeadData[];
}

export default function LeadsManagerClient({ initialLeads }: LeadsManagerClientProps) {
  const [leads, setLeads] = useState<LeadData[]>(initialLeads);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = async (id: string, newStatus: 'unread' | 'contacted' | 'archived') => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
        if (selectedLead?.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLeads(prev => prev.filter(lead => lead.id !== id));
        if (selectedLead?.id === id) {
          setSelectedLead(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const filteredLeads = leads
    .filter(lead => {
      if (filter === 'all') return true;
      return lead.status === filter;
    })
    .filter(lead => {
      const term = searchTerm.toLowerCase();
      return (
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.message.toLowerCase().includes(term) ||
        lead.service.toLowerCase().includes(term)
      );
    });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans selection:bg-primary/20/30">
      <div className="max-w-7xl mx-auto bg-card/80 border border-muted rounded-2xl p-6 md:p-8 shadow-xl shadow-foreground/5">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-muted gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Review and manage contact submissions from your website.</p>
          </div>
          <a
            href="/admin"
            className="inline-flex items-center px-4 py-2 border border-muted rounded-xl text-sm font-semibold text-muted-foreground hover:bg-background transition-smooth cursor-pointer w-fit"
          >
            &larr; Back to Dashboard
          </a>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'unread', 'contacted', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-smooth cursor-pointer ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-background text-muted-foreground hover:bg-muted'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-background/40 border border-muted rounded-xl text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth text-sm"
            />
          </div>
        </div>

        {/* Main Grid: List and Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Leads List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 bg-background/20 border border-muted rounded-2xl">
                <p className="text-muted-foreground">No leads found matching your filters.</p>
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-5 border rounded-2xl transition-smooth cursor-pointer ${
                    selectedLead?.id === lead.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-muted bg-card hover:border-primary/20'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-foreground">{lead.name}</h4>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                      {lead.service && (
                        <span className="inline-block mt-2 text-xs bg-muted text-foreground px-2.5 py-1 rounded-lg font-medium">
                          Service: {lead.service}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                        lead.status === 'unread'
                          ? 'bg-red-50 text-red-700 border border-red-100'
                          : lead.status === 'contacted'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-xs text-muted-foreground/60">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Lead Detail Panel */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <div className="bg-background/40 border border-muted rounded-2xl p-6 sticky top-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedLead.name}</h3>
                    <p className="text-sm text-muted-foreground/80 mt-1">Submitted details</p>
                  </div>
                  <button
                    onClick={() => deleteLead(selectedLead.id)}
                    className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-smooth cursor-pointer"
                    title="Delete Lead"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email</label>
                    <p className="text-sm font-semibold text-foreground">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Phone</label>
                    <p className="text-sm font-semibold text-foreground">{selectedLead.phone || 'N/A'}</p>
                  </div>
                  {selectedLead.service && (
                    <div>
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Interested Service</label>
                      <p className="text-sm font-semibold text-foreground">{selectedLead.service}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Message</label>
                    <div className="mt-1 bg-card border border-muted p-4 rounded-xl text-sm text-foreground whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {selectedLead.message}
                    </div>
                  </div>
                </div>

                <div className="border-t border-muted pt-4">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Update Status</label>
                  <div className="flex gap-2">
                    {(['unread', 'contacted', 'archived'] as const).map((status) => (
                      <button
                        key={status}
                        disabled={updatingId === selectedLead.id}
                        onClick={() => updateStatus(selectedLead.id, status)}
                        className={`flex-1 py-2 px-3 border rounded-xl text-xs font-semibold capitalize transition-smooth cursor-pointer ${
                          selectedLead.status === status
                            ? 'bg-primary text-white border-primary'
                            : 'bg-card text-muted-foreground border-muted hover:bg-background'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex flex-col items-center justify-center h-80 border-2 border-dashed border-muted rounded-2xl p-6 text-center text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V14.25c0-.621-.504-1.125-1.125-1.125H9.75M8.25 21h8.25A2.25 2.25 0 0 0 18.75 18.75V5.25A2.25 2.25 0 0 0 16.5 3H8.25A2.25 2.25 0 0 0 6 5.25v13.5A2.25 2.25 0 0 0 8.25 21Zm0 0V12m0 0h1.5" />
                </svg>
                <p className="text-sm">Select a lead to view complete details, message content, and manage status.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

