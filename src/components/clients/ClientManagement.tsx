import { useTranslation } from 'react-i18next';
import React, { useEffect, useMemo, useState } from 'react';
import { Search, ChevronDown, AlignLeft, AtSign, Phone, Calendar, CreditCard, Clock, ArrowDown, UserPlus } from 'lucide-react';
import { AddClientForm } from './AddClientForm.tsx';
import { EditClientForm } from './EditClientForm';
import { ClientDetails } from './ClientDetails.tsx';
import {
  deleteClient,
  DISPATCH_PREFILL_CLIENT_ID_STORAGE_KEY,
  listClients,
  SELECTED_CLIENT_ID_STORAGE_KEY,
} from '../../lib/api';
import { Client } from '../../types';

export const ClientManagement: React.FC<{ currentView?: string; onViewChange?: (v: string) => void }> = ({ currentView, onViewChange }) => {
  const { t } = useTranslation();
  const [clients, setClients] = useState<Client[]>([]);
  const [pendingDeleteClient, setPendingDeleteClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Client['status']>('all');
  const [sortMode, setSortMode] = useState<'recent' | 'name'>('recent');
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAddingClient = currentView === 'clients/add-client';
  const isEditingClient = currentView === 'clients/edit-client';
  const isViewingClientDetails = currentView === 'clients/client-details';

  useEffect(() => {
    const loadClients = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await listClients();
        setClients(data);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Failed to load clients';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadClients();
  }, [isAddingClient, isEditingClient, isViewingClientDetails]);

  const filteredClients = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const byFilter = clients.filter((client) => {
      if (statusFilter !== 'all' && client.status !== statusFilter) {
        return false;
      }
      if (!normalized) {
        return true;
      }
      return (
        client.name.toLowerCase().includes(normalized) ||
        (client.email ?? '').toLowerCase().includes(normalized) ||
        client.phone.toLowerCase().includes(normalized)
      );
    });

    return byFilter.sort((a, b) => {
      if (sortMode === 'name') {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [clients, searchTerm, statusFilter, sortMode]);

  const openClient = (clientId: string, view: 'details' | 'edit') => {
    sessionStorage.setItem(SELECTED_CLIENT_ID_STORAGE_KEY, clientId);
    onViewChange?.(view === 'details' ? 'clients/client-details' : 'clients/edit-client');
  };

  const getStatusBadge = (status: Client['status']) => {
    if (status === 'active') {
      return 'bg-primary/10 text-primary';
    }
    if (status === 'inactive') {
      return 'bg-surface-container-low text-on-surface-variant';
    }
    return 'bg-error/10 text-error';
  };

  const handleDeleteClient = async () => {
    if (!pendingDeleteClient) {
      return;
    }

    setDeletingClientId(pendingDeleteClient.id);
    setError(null);
    try {
      await deleteClient(pendingDeleteClient.id);
      setClients((prev) => prev.filter((entry) => entry.id !== pendingDeleteClient.id));
      setPendingDeleteClient(null);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to delete client';
      setError(message);
    } finally {
      setDeletingClientId(null);
    }
  };

  if (isViewingClientDetails) {
    return <ClientDetails 
      onBack={() => onViewChange?.('clients')} 
      onEdit={() => onViewChange?.('clients/edit-client')}
      onNewDispatch={() => {
        const selectedClientId = sessionStorage.getItem(SELECTED_CLIENT_ID_STORAGE_KEY);
        if (selectedClientId) {
          sessionStorage.setItem(DISPATCH_PREFILL_CLIENT_ID_STORAGE_KEY, selectedClientId);
        }
        onViewChange?.('live-dispatch');
      }}
    />;
  }

  if (isAddingClient) {
    return <AddClientForm onCancel={() => onViewChange?.('clients')} />;
  }

  if (isEditingClient) {
    return <EditClientForm onCancel={() => onViewChange?.('clients')} onSave={() => onViewChange?.('clients')} />;
  }

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-primary mb-2">{t("clients.title", "Client Management")}</h1>
          <p className="text-on-surface-variant max-w-2xl text-sm">{t("clients.subtitle", "Manage your corporate accounts and regular customers.")} Track engagement, billing status, and service history across your entire network.</p>
        </div>
        <button 
          onClick={() => onViewChange?.('clients/add-client')}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t("clients.add", "Add New Client")}</span>
        </button>
      </div>
      
      {/* Filters & Search Bento Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        <div className="md:col-span-6 bg-surface p-2 rounded-xl flex items-center gap-2 border border-outline-variant/30">
          <div className="bg-surface-container-low p-2 rounded-lg">
            <Search className="w-4 h-4 text-primary" />
          </div>
          <input
            className="bg-transparent border-none focus:ring-0 w-full font-body text-on-surface outline-none text-sm"
            placeholder={t("clients.search", "Search by client name, email, or company...")}
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div
          onClick={() => {
            setStatusFilter((prev) => {
              if (prev === 'all') {
                return 'active';
              }
              if (prev === 'active') {
                return 'inactive';
              }
              if (prev === 'inactive') {
                return 'suspended';
              }
              return 'all';
            });
          }}
          className="md:col-span-3 bg-surface p-3 rounded-xl flex items-center justify-between border border-outline-variant/30 px-4 cursor-pointer hover:bg-surface-container-low transition-colors"
        >
          <span className="text-sm font-semibold text-on-surface-variant">
            {statusFilter === 'all' ? t("clients.statusAll", "Status: All") : `Status: ${statusFilter}`}
          </span>
          <ChevronDown className="w-4 h-4 text-outline" />
        </div>
        <div
          onClick={() => setSortMode((prev) => (prev === 'recent' ? 'name' : 'recent'))}
          className="md:col-span-3 bg-surface p-3 rounded-xl flex items-center justify-between border border-outline-variant/30 px-4 cursor-pointer hover:bg-surface-container-low transition-colors"
        >
          <span className="text-sm font-semibold text-on-surface-variant">
            {sortMode === 'recent' ? t("clients.sortRecent", "Sort: Most Recent") : 'Sort: Name'}
          </span>
          <AlignLeft className="w-4 h-4 text-outline" />
        </div>
      </div>
      
      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 text-sm text-on-surface-variant">Loading clients...</div>
        ) : null}
        {error ? (
          <div className="bg-error/10 text-error p-6 rounded-xl border border-error/20 text-sm">{error}</div>
        ) : null}
        {!isLoading && !error && filteredClients.length === 0 ? (
          <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 text-sm text-on-surface-variant">No clients found.</div>
        ) : null}

        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group"
          >
            <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0 border border-outline-variant/30">
              <img
                alt="Company Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={client.logo_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=200'}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{client.name}</h3>
                    <p className="text-on-surface-variant font-medium text-xs mt-1">{client.client_type} • ID: #{client.id}</p>
                  </div>
                  <span className={`${getStatusBadge(client.status)} px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                    {client.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <AtSign className="w-3.5 h-3.5 text-outline" />
                    <span className="text-xs">{client.email || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Phone className="w-3.5 h-3.5 text-outline" />
                    <span className="text-xs">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Calendar className="w-3.5 h-3.5 text-outline" />
                    <span className="text-xs">Last: {client.last_service_date || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Clock className="w-3.5 h-3.5 text-outline" />
                    <span className="text-xs">Updated: {new Date(client.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <button onClick={() => openClient(client.id, 'details')} className="text-primary font-bold text-xs border border-primary/30 hover:border-primary px-4 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">{t('view_details', 'View Details')}</button>
                <button onClick={() => openClient(client.id, 'edit')} className="text-on-surface-variant font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors">{t('edit', 'Edit')}</button>
                <button
                  onClick={() => {
                    setPendingDeleteClient(client);
                  }}
                  disabled={deletingClientId === client.id}
                  className="text-error font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-error/10 transition-colors disabled:opacity-60"
                >
                  {deletingClientId === client.id ? 'Deleting...' : t('delete', 'Delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
        
      </div>
      
      {/* Pagination / View More */}
      <div className="mt-10 flex justify-center pb-8">
        <button className="bg-surface text-primary text-sm border border-outline-variant/30 shadow-sm px-6 py-2.5 rounded-full font-bold hover:bg-surface-container-low transition-all flex items-center gap-2 group">
          <span>{t('load_more_clients', 'Load More Clients')}</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {pendingDeleteClient ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 backdrop-blur-[1px] animate-in fade-in duration-200">
          <div className="w-[92%] max-w-md rounded-2xl border border-outline-variant/40 bg-surface p-6 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
            <h3 className="text-lg font-bold text-on-surface mb-2">{t('confirm_delete_client', 'Are you sure you want to delete this client?')}</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              {pendingDeleteClient.name}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPendingDeleteClient(null)}
                disabled={deletingClientId === pendingDeleteClient.id}
                className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors text-sm font-bold disabled:opacity-60"
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                onClick={() => {
                  void handleDeleteClient();
                }}
                disabled={deletingClientId === pendingDeleteClient.id}
                className="px-4 py-2 rounded-lg bg-error text-white hover:opacity-90 transition-all text-sm font-bold disabled:opacity-60"
              >
                {deletingClientId === pendingDeleteClient.id ? 'Deleting...' : t('delete', 'Delete')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};