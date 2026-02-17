import { useState } from 'react';
import { RoleList, RoleForm } from 'nauth-react';
import type { RoleInfo } from 'nauth-react';
import { toast } from 'sonner';
import { Card, CardContent } from '../../components/ui/Card';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
} from '../../components/ui/Modal';
import { X } from 'lucide-react';

type ModalMode = 'create' | 'edit' | null;

export default function RolesPage() {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedRole, setSelectedRole] = useState<RoleInfo | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (role: RoleInfo) => {
    setSelectedRole(role);
    setModalMode('edit');
  };

  const handleCreate = () => {
    setSelectedRole(null);
    setModalMode('create');
  };

  const handleFormSuccess = (role: RoleInfo) => {
    const message =
      modalMode === 'create'
        ? `Role "${role.name}" created successfully!`
        : `Role "${role.name}" updated successfully!`;

    toast.success(message);
    setModalMode(null);
    setSelectedRole(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleFormError = (error: Error) => {
    toast.error(error.message);
  };

  const handleCancel = () => {
    setModalMode(null);
    setSelectedRole(null);
  };

  const handleDeleteSuccess = () => {
    toast.success('Role deleted successfully!');
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteError = (error: Error) => {
    toast.error(`Failed to delete role: ${error.message}`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy">
          Management Roles
        </h1>
        <p className="mt-2 text-gray-600">
          Manage user roles and permissions
        </p>
      </div>
      <Card className="pt-5">
        <CardContent className="space-y-4">
          <RoleList
            key={refreshTrigger}
            onEdit={(role) => {
              if (role.roleId === 0) {
                handleCreate();
              } else {
                handleEdit(role);
              }
            }}
            onRoleClick={handleEdit}
            onSuccess={handleDeleteSuccess}
            onError={handleDeleteError}
            showCreateButton={true}
            initialPageSize={10}
            pageSizeOptions={[10, 25, 50, 100]}
          />
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal open={modalMode !== null} onOpenChange={(open) => { if (!open) handleCancel(); }}>
        <ModalContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <ModalHeader className="flex flex-row items-center justify-between">
            <ModalTitle>
              {modalMode === 'create' ? 'Create New Role' : 'Edit Role'}
            </ModalTitle>
            <ModalClose asChild>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </ModalClose>
          </ModalHeader>

          <RoleForm
            roleId={selectedRole?.roleId}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
            onCancel={handleCancel}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}
