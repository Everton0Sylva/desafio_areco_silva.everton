export interface ITableAction<T> {
  type: string; // ex: 'edit' | 'delete' | 'custom'
  row: T;
}
