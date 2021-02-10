export const CodeElement = (props) => {
  console.log(props.attributes);
  console.log(props.children);

  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
