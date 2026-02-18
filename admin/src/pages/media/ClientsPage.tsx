import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientList, ClientModal } from 'bazzuca-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { ROUTES } from '../../lib/constants';
import { Plus, Users } from 'lucide-react';

export function ClientsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(ADMIN_NAMESPACE);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleCreate = () => {
    setSelectedClient(null);
    setModalOpen(true);
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  const handleView = (client: any) => {
    navigate(ROUTES.CLIENT_NETWORKS(client.id));
  };

  const handleDelete = () => {
    refresh();
    toast.success(t('clients.deletedSuccess'));
  };

  const handleSave = () => {
    setModalOpen(false);
    setSelectedClient(null);
    refresh();
    toast.success(
      selectedClient ? t('clients.updatedSuccess') : t('clients.createdSuccess')
    );
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('clients.title')}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t('clients.description')}
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          {t('clients.newClient')}
        </button>
      </div>

      {/* Client List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <ClientList
          key={refreshKey}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>

      {/* Client Modal */}
      <ClientModal
        open={modalOpen}
        onClose={handleClose}
        onSave={handleSave}
        client={selectedClient}
      />
    </div>
  );
}
