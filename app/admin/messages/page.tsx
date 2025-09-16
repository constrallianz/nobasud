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
    selectedStatus,
    selectedPriority,
    searchTerm,
    statusOptions,
    setSelectedStatus,
    setSelectedPriority,
    setSearchTerm,
    handleMarkAsRead,
    handleViewDetails,
    handleDelete
  } = useMessages()

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
        {filteredMessages.length > 0 ? (
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
        ) : (
          <MessagePageStates 
            selectedStatus={selectedStatus}
            statusOptions={statusOptions}
          />
        )}
      </div>
    </div>
  )
}
