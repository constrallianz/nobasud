import { useState } from "react";
import Link from "next/link";
import {
  UserIcon,
  CalendarIcon,
  TrashIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { type Feedback } from "@/lib/validations";

interface FeedbackCardProps {
  feedback: Feedback;
  onDelete: (id: string) => Promise<void>;
}

export default function FeedbackCard({
  feedback,
  onDelete,
}: FeedbackCardProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) {
      return;
    }

    try {
      setDeleting(true);
      if (typeof feedback.id === "string") {
        await onDelete(feedback.id);
      } else {
        alert("Impossible de supprimer : ID manquant");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Erreur lors de la suppression de l'avis");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <li className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {feedback.photoUrl ? (
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={feedback.photoUrl}
                  alt={feedback.name}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {feedback.name}
                </p>
                {feedback.company && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    - {feedback.company}
                  </span>
                )}

                {/* Star Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) =>
                    i < feedback.rating ? (
                      <StarIconSolid
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                      />
                    ) : (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 text-gray-300 dark:text-gray-600"
                      />
                    )
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    ({feedback.rating}/5)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {feedback.createdAt
                      ? new Date(feedback.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Date inconnue"}
                  </span>
                </div>

                {feedback.project && (
                  <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                    {feedback.project}
                  </span>
                )}

                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    feedback.published
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
                >
                  {feedback.published ? "Publié" : "Brouillon"}
                </span>
              </div>

              <div className="mt-2">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {feedback.message}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Link href={`/admin/avis/edit/${feedback.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Modifier
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 dark:text-red-400 dark:border-red-600"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            ) : (
              <TrashIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </li>
  );
}
