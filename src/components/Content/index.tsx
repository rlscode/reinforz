import "./style.scss";

export interface ContentProps {
  children: JSX.Element | JSX.Element[] | string
  className?: string
  style?: React.CSSProperties,
}

export function Content(props: ContentProps) {
  const styles: React.CSSProperties = { ...props.style ?? {} };
  return <div className={`Content bg-dark p-5 ${props.className ?? ''}`} style={styles}>
    {props.children}
  </div>
}

export interface FlexContentProps extends ContentProps {
  direction?: React.CSSProperties["flexDirection"]
}

export function FlexContent(props: FlexContentProps) {
  return <Content style={{ display: 'flex', flexDirection: props.direction ?? 'row', ...props.style ?? {} }} className={`FlexContent ${props.className ?? ''}`}>
    {props.children}
  </Content>
}