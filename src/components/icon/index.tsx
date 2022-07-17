const Icon = ({ name, className = "" }) => {
  return <i className={`fa fa-${name} ${className}`} />;
};

export { Icon };
