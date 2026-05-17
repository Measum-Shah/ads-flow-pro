import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition"
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text)",
        borderColor: "var(--color-border)",
      }}
    >
      {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
      <span>{isDarkMode ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;