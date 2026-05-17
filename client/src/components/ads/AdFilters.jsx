import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const AdFilters = ({
  filters,
  onChange,
  onApply,
  onReset,
  categories = [],
  cities = [],
  loading = false,
}) => {
  const categoryOptions = categories.map((category) => ({
    label: category.name || category.title,
    value: category._id || category.id,
  }));

  const cityOptions = cities.map((city) => ({
    label: city.name || city.title,
    value: city._id || city.id,
  }));

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Featured First", value: "featured" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    onChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Input
          label="Search"
          name="search"
          placeholder="Search ads..."
          value={filters.search}
          onChange={handleChange}
        />

        <Select
          label="Category"
          name="category"
          placeholder="All categories"
          options={categoryOptions}
          value={filters.category}
          onChange={handleChange}
        />

        <Select
          label="City"
          name="city"
          placeholder="All cities"
          options={cityOptions}
          value={filters.city}
          onChange={handleChange}
        />

        <Select
          label="Sort"
          name="sort"
          placeholder="Sort ads"
          options={sortOptions}
          value={filters.sort}
          onChange={handleChange}
        />
      </div>

      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={onReset} disabled={loading}>
          Reset
        </Button>

        <Button onClick={onApply} loading={loading}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default AdFilters;