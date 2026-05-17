const ButtonLoader = ({ text = "Please wait..." }) => {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      <span>{text}</span>
    </span>
  );
};

export default ButtonLoader;