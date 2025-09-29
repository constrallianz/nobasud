'use client'

import MessagePageHeader from '@/components/admin/messages/MessagePageHeader'
import MessageStats from '@/components/admin/messages/MessageStats'
import MessageFilters from '@/components/admin/messages/MessageFilters'
import MessageCard from '@/components/admin/messages/MessageCard'
import MessagePageStates from '@/components/admin/messages/MessagePageStates'
import { useMessages } from '@/components/admin/messages/useMessages'

export default function MessagesPage() {
  const {
    messages,
    filteredMessages,
    loading,
    error,
    selectedStatus,
    selectedPriority,
    searchTerm,
    statusOptions,
    setSelectedStatus,
    setSelectedPriority,
    setSearchTerm,
    refreshMessages,
    handleMarkAsRead,
    handleViewDetails,
    handleDelete
  } = useMessages()

  if (error) {
    return (
      <div className="space-y-8">
        <MessagePageHeader />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Erreur</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={refreshMessages}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <MessagePageHeader />
      
      <MessageStats messages={messages} />

      <MessageFilters
        messages={messages}
        selectedStatus={selectedStatus}
        selectedPriority={selectedPriority}
        searchTerm={searchTerm}
        onStatusChange={setSelectedStatus}
        onPriorityChange={setSelectedPriority}
        onSearchChange={setSearchTerm}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des messages...</p>
          </div>
        )}
        
        {!loading && filteredMessages.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onMarkAsRead={handleMarkAsRead}
                onViewDetails={handleViewDetails}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
        
        {!loading && filteredMessages.length === 0 && (
          <MessagePageStates 
            selectedStatus={selectedStatus}
            statusOptions={statusOptions}
          />
        )}
      </div>
    </div>
  )
}
