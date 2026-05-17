import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";

const AdForm = ({
  formData,
  setFormData,
  categories = [],
  cities = [],
  loading = false,
  submitText = "Save Ad",
  onSubmit,
}) => {
  const categoryOptions = categories.map((category) => ({
    label: category.name || category.title,
    value: category._id || category.id,
  }));

  const cityOptions = cities.map((city) => ({
    label: city.name || city.title,
    value: city._id || city.id,
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="grid gap-5">
        <Input
          label="Ad Title"
          name="title"
          placeholder="Example: Premium laptop for sale"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Textarea
          label="Description"
          name="description"
          placeholder="Write complete details about your ad"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          required
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Select
            label="Category"
            name="categoryId"
            placeholder="Select category"
            options={categoryOptions}
            value={formData.categoryId}
            onChange={handleChange}
            required
          />

          <Select
            label="City"
            name="cityId"
            placeholder="Select city"
            options={cityOptions}
            value={formData.cityId}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="Contact Phone"
          name="contactPhone"
          placeholder="Example: 03001234567"
          value={formData.contactPhone}
          onChange={handleChange}
        />

        <Input
          label="Image URL"
          name="imageUrl"
          placeholder="Paste image URL for now"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <div
          className="rounded-xl p-4 text-sm leading-6"
          style={{
            backgroundColor: "var(--color-surface-soft)",
            color: "var(--color-muted)",
          }}
        >
          For now we are using image URL. Later we can replace this with
          Cloudinary/multer upload once backend media upload is ready.
        </div>

        <Button type="submit" loading={loading}>
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default AdForm;