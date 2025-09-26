import { MediaCategoriesProps } from "@/types/media";
import { Button } from "../ui/button";

export default function MediaCategories({
  categories,
  selectedCategory,
  onCategorySelect,
}: MediaCategoriesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onCategorySelect(category)}
          className={`font-semibold ${
            selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
          data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
