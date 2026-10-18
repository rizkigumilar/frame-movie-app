import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { categories } from "../../constants/categories";
import CategoryIcon from "./CategoryIcon";
import type { Category } from "../../types";
interface CategoryTabsProps {
  category: Category;
  onChange: (category: Category) => void;
}
export default function CategoryTabs({
  category,
  onChange,
}: CategoryTabsProps) {
  return (
    <Box className="overflow-x-auto my-6 pb-2">
      <ToggleButtonGroup
        exclusive
        value={category}
        aria-label="Movie categories"
        onChange={(_, value: Category | null) => {
          if (value) onChange(value);
        }}
        color="primary"
        size="small"
        className="[&_.MuiToggleButton-root]:px-2 [&_.MuiToggleButton-root]:sm:px-5 [&_.MuiToggleButton-root]:gap-2 [&_.MuiToggleButton-root]:whitespace-nowrap"
      >
        {categories.map((item) => (
          <ToggleButton key={item.id} value={item.id}>
            <CategoryIcon category={item.id} />
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
