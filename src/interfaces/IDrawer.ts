export interface IDrawer {
  isOpen: boolean;
  component: React.FunctionComponent | JSX.Element | null;
  title: string;
}
