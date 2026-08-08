import {
  Section,
  List,
  Spinner,
  useIntersectionLoadMore,
} from '../../shared/components';
import { useInboxPage } from './hooks/useInboxPage';
import { InboxFilters } from './components/InboxFilters';
import { ImportTriggers } from './components/ImportTriggers';
import { UploadFileModal } from './components/UploadFileModal';
import { TextImportModal } from './components/TextImportModal';
import { PendingImportRow } from './components/PendingImportRow';
import { ConvertModal } from './components/ConvertModal';
import './styles/inbox.css';

export const Inbox = () => {
  const {
    banks,
    relatedUsers,
    paymentCategories,
    incomeCategories,
    optionsLoading,
    filterBankId,
    setFilterBankId,
    uploadOpen,
    openUpload,
    closeUpload,
    uploadBankId,
    setUploadBankId,
    selectedFile,
    setSelectedFile,
    uploading,
    handleUploadImport,
    textOpen,
    openText,
    closeText,
    textBankId,
    setTextBankId,
    text,
    setText,
    parsingText,
    handleTextImport,
    pending,
    pendingTotal,
    pendingLoading,
    pendingLoadingMore,
    pendingHasMore,
    loadMorePending,
    activeRow,
    convertForm,
    openConvert,
    closeConvert,
    setConvertField,
    converting,
    handleConvertSubmit,
    handleDelete,
    notice,
    error,
  } = useInboxPage();

  const sentinelRef = useIntersectionLoadMore({
    onLoadMore: loadMorePending,
    hasMore: pendingHasMore,
    loading: pendingLoadingMore,
  });

  return (
    <div className="inbox">
      {error ? <p className="inbox__error">{error}</p> : null}
      {notice ? <p className="inbox__notice">{notice}</p> : null}

      <InboxFilters
        banks={banks}
        optionsLoading={optionsLoading}
        bankId={filterBankId}
        setBankId={setFilterBankId}
      />

      <ImportTriggers onOpenUpload={openUpload} onOpenText={openText} />

      <Section title={`Pending Imports (${pendingTotal})`}>
        {pendingLoading ? (
          <div className="inbox__loading">
            <Spinner size={24} />
          </div>
        ) : (
          <List>
            {pending.length === 0 ? (
              <p className="inbox__empty">No pending imports.</p>
            ) : (
              pending.map((row) => (
                <PendingImportRow
                  key={row.id}
                  row={row}
                  onOpen={openConvert}
                  onDelete={handleDelete}
                />
              ))
            )}
          </List>
        )}

        {pendingHasMore ? (
          <div ref={sentinelRef} className="inbox__sentinel">
            {pendingLoadingMore ? <Spinner size={20} /> : null}
          </div>
        ) : null}
      </Section>

      {uploadOpen ? (
        <UploadFileModal
          banks={banks}
          optionsLoading={optionsLoading}
          bankId={uploadBankId}
          setBankId={setUploadBankId}
          file={selectedFile}
          setFile={setSelectedFile}
          uploading={uploading}
          onSubmit={handleUploadImport}
          onClose={closeUpload}
        />
      ) : null}

      {textOpen ? (
        <TextImportModal
          banks={banks}
          optionsLoading={optionsLoading}
          bankId={textBankId}
          setBankId={setTextBankId}
          text={text}
          setText={setText}
          parsing={parsingText}
          onSubmit={handleTextImport}
          onClose={closeText}
        />
      ) : null}

      {activeRow && convertForm ? (
        <ConvertModal
          row={activeRow}
          relatedUsers={relatedUsers}
          paymentCategories={paymentCategories}
          incomeCategories={incomeCategories}
          form={convertForm}
          setField={setConvertField}
          submitting={converting}
          onSubmit={handleConvertSubmit}
          onClose={closeConvert}
        />
      ) : null}
    </div>
  );
};
