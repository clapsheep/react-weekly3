function A11yHidden({ as: ComponentName = 'span', ...restProps }) {
  return (
    <ComponentName
      className="sr-only"
      style={{
        fontSize: 100,
      }}
      {...restProps}
    />
  );
}

export default A11yHidden;
