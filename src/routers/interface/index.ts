export interface MetaProps {
  keepAlive?: boolean;
  requiresAuth?: boolean;
  title: string;
  key?: string;
}

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  path: string;
  meta?: MetaProps;
  isLink?: string;
  [key: string]: any;
}
