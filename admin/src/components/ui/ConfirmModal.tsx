import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from "./Modal";
import { cn } from "../../lib/utils";

type ConfirmVariant = "danger" | "warning" | "default";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  loading?: boolean;
}

const variantStyles: Record<ConfirmVariant, string> = {
  danger:
    "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  warning:
    "bg-brand-orange hover:bg-orange-600 text-white focus:ring-orange-400",
  default:
    "bg-brand-blue hover:bg-blue-600 text-white focus:ring-brand-blue",
};

export function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  variant = "default",
  loading = false,
}: ConfirmModalProps) {
  const { t } = useTranslation(ADMIN_NAMESPACE);

  const resolvedConfirmLabel = confirmLabel ?? t('common.confirm');
  const resolvedCancelLabel = cancelLabel ?? t('common.cancel');

  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-md">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && (
            <ModalDescription>{description}</ModalDescription>
          )}
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild>
            <button
              type="button"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              {resolvedCancelLabel}
            </button>
          </ModalClose>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
              variantStyles[variant]
            )}
          >
            {loading ? t('common.loading') : resolvedConfirmLabel}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
