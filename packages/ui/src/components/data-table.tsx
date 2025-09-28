'use client';

import { cn } from '../lib/utils';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Skeleton } from './skeleton';
import { Switch } from './switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, Bars3Icon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import {
  ColumnDef,
  FilterFn,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  EyeOff
} from 'lucide-react';
import * as React from 'react';

export type FilterType = 'text' | 'number' | 'select' | 'multi-select' | 'boolean' | 'date';

export type Filter = {
  key: string;
  type: FilterType;
  options?: { value: string; label: string }[]; // For select and multi-select
  label?: string;
};

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  isLoading?: boolean;
  onUpload?: (file: TData[]) => Promise<void>;
  filters?: Filter[];
  importFn?: (data: TData[]) => Promise<void>;
  disablePagination?: boolean;
  isDownloadable?: boolean;
};

type FilterState = {
  id: string;
  value: any;
  operator?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  onRowSelectionChange,
  isLoading = false,
  onUpload,
  filters,
  importFn,
  disablePagination,
  isDownloadable
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<FilterState[]>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [searchValue, setSearchValue] = React.useState('');
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: pageSize
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const handleRowSelectionChange = React.useCallback(
    (updatedRowSelection: any) => {
      setRowSelection(updatedRowSelection);

      if (onRowSelectionChange) {
        const selectedRows = Object.keys(updatedRowSelection)
          .filter((key) => updatedRowSelection[key])
          .map((key) => {
            const index = parseInt(key, 10);
            return data[index];
          })
          .filter((row): row is TData => row !== undefined);

        onRowSelectionChange(selectedRows);
      }
    },
    [data, onRowSelectionChange]
  );

  const selectionColumn: ColumnDef<TData, any> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all rows'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  };

  const tableColumns = React.useMemo(
    () => (!!onRowSelectionChange ? [selectionColumn, ...columns] : columns),
    [columns, onRowSelectionChange, selectionColumn]
  );

  const downloadAllData = async () => {
    if (!data.length) return;

    // Regardons directement la structure des données
    console.log('Data structure:', data[0]);

    // Utilisons l'approche la plus basique
    // 1. Récupérer les clés directement du premier objet
    const keys = Object.keys(data[0] as any);

    // 2. Créer un séparateur de colonne qui n'est pas susceptible d'être dans les données (semicolon)
    const separator = ';';

    // 3. Créer l'en-tête avec des guillemets autour de chaque valeur
    let csv = keys.map((key) => `"${key}"`).join(separator) + '\r\n';

    // 4. Ajouter chaque ligne
    data.forEach((item) => {
      const values = keys.map((key) => {
        const value = (item as any)[key];
        if (value === null || value === undefined) return '""';

        // Tous les autres cas, convertir en string et échapper les guillemets
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

        return `"${stringValue.replace(/"/g, '""')}"`;
      });

      csv += values.join(separator) + '\r\n';
    });

    // 5. Télécharger le fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export_data.csv';
    document.body.appendChild(a); // Nécessaire dans certains navigateurs
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderColumnFilter = (filter: Filter) => {
    const currentFilter = columnFilters.find((f) => f.id === filter.key);

    switch (filter.type) {
      case 'text':
        return (
          <Input
            placeholder={`Filter ${filter.label || filter.key}...`}
            value={(currentFilter?.value as string) || ''}
            onChange={(event) => {
              setColumnFilters((prev) => {
                const existingFilter = prev.find((f) => f.id === filter.key);
                if (existingFilter) {
                  return prev.map((f) => (f.id === filter.key ? { ...f, value: event.target.value } : f));
                }
                return [...prev, { id: filter.key, value: event.target.value }];
              });
            }}
            className='max-w-xs'
          />
        );
      case 'number':
        return (
          <div className='flex gap-2 flex-col'>
            <Select
              value={(currentFilter?.operator as string) || 'eq'}
              onValueChange={(value) => {
                setColumnFilters((prev) => {
                  const existingFilter = prev.find((f) => f.id === filter.key);
                  if (existingFilter) {
                    return prev.map((f) => (f.id === filter.key ? { ...f, operator: value } : f));
                  }
                  return [...prev, { id: filter.key, operator: value, value: '' }];
                });
              }}
            >
              <SelectTrigger className='w-[100px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='eq'>=</SelectItem>
                <SelectItem value='gt'>&gt;</SelectItem>
                <SelectItem value='lt'>&lt;</SelectItem>
                <SelectItem value='gte'>&gt;=</SelectItem>
                <SelectItem value='lte'>&lt;=</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type='number'
              placeholder='Value'
              value={(currentFilter?.value as string) || ''}
              onChange={(event) => {
                setColumnFilters((prev) => {
                  const existingFilter = prev.find((f) => f.id === filter.key);
                  if (existingFilter) {
                    return prev.map((f) => (f.id === filter.key ? { ...f, value: event.target.value } : f));
                  }
                  return [...prev, { id: filter.key, value: event.target.value, operator: 'eq' }];
                });
              }}
              className='w-[100px]'
            />
          </div>
        );
      case 'select':
      case 'multi-select':
        return (
          <Select
            value={(currentFilter?.value as string) || ''}
            onValueChange={(value) => {
              setColumnFilters((prev) => {
                const existingFilter = prev.find((f) => f.id === filter.key);
                if (existingFilter) {
                  return prev.map((f) => (f.id === filter.key ? { ...f, value } : f));
                }
                return [...prev, { id: filter.key, value }];
              });
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={`Select ${filter.label || filter.key}`} />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'boolean':
        return (
          <Switch
            className='mx-auto'
            checked={(currentFilter?.value as boolean) || false}
            onCheckedChange={(value) => {
              setColumnFilters((prev) => {
                const existingFilter = prev.find((f) => f.id === filter.key);
                if (existingFilter) {
                  return prev.map((f) => (f.id === filter.key ? { ...f, value } : f));
                }
                return [...prev, { id: filter.key, value }];
              });
            }}
          />
        );
      case 'date':
        return (
          <div className='flex flex-col gap-2'>
            <div className='flex items-center flex-col gap-2'>
              <Input
                type='date'
                placeholder='Start date'
                value={(currentFilter?.value?.start as string) || ''}
                onChange={(event) => {
                  setColumnFilters((prev) => {
                    const existingFilter = prev.find((f) => f.id === filter.key);
                    if (existingFilter) {
                      return prev.map((f) =>
                        f.id === filter.key ? { ...f, value: { ...f.value, start: event.target.value } } : f
                      );
                    }
                    return [...prev, { id: filter.key, value: { start: event.target.value, end: null } }];
                  });
                }}
                className='w-[150px]'
              />
              <span>à</span>
              <Input
                type='date'
                placeholder='End date'
                value={(currentFilter?.value?.end as string) || ''}
                onChange={(event) => {
                  setColumnFilters((prev) => {
                    const existingFilter = prev.find((f) => f.id === filter.key);
                    if (existingFilter) {
                      return prev.map((f) =>
                        f.id === filter.key ? { ...f, value: { ...f.value, end: event.target.value } } : f
                      );
                    }
                    return [...prev, { id: filter.key, value: { start: null, end: event.target.value } }];
                  });
                }}
                className='w-[150px]'
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const table = useReactTable({
    data,
    columns: tableColumns.map((column) => {
      const baseColumn = {
        ...column,
        enableSorting: column.enableSorting ?? true
      };

      if (filters?.some((f) => f.key === column.id || f.key === (column as any).accessorKey)) {
        return {
          ...baseColumn,
          filterFn: ((row: Row<TData>, columnId: string, filterValue: any) => {
            const filter = columnFilters.find((f) => f.id === columnId);
            console.log('filter', filter);
            if (!filter) return true;

            const cellValue = row.getValue(columnId);
            console.log('cell', cellValue);
            if (cellValue == null) return false;

            const filterConfig = filters?.find((f) => f.key === columnId);
            if (!filterConfig) return true;

            switch (filterConfig.type) {
              case 'text':
                return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
              case 'number':
                const numValue = Number(cellValue);
                const filterNum = Number(filterValue);
                switch (filter.operator) {
                  case 'eq':
                    return numValue === filterNum;
                  case 'gt':
                    return numValue > filterNum;
                  case 'lt':
                    return numValue < filterNum;
                  case 'gte':
                    return numValue >= filterNum;
                  case 'lte':
                    return numValue <= filterNum;
                  default:
                    return true;
                }
              case 'select':
              case 'multi-select': {
                const cellValue = row.getValue(columnId);
                console.log('cell', cellValue, filterValue);
                if (Array.isArray(cellValue)) {
                  return cellValue.includes(filterValue);
                }
                return String(cellValue) === String(filterValue);
              }
              case 'boolean':
                return Boolean(cellValue) === Boolean(filterValue);
              case 'date': {
                const dateValue = cellValue ? new Date(cellValue as string) : null;
                if (!dateValue || isNaN(dateValue.getTime())) return false;

                const startDate = filter.value?.start ? new Date(filter.value.start) : null;
                const endDate = filter.value?.end ? new Date(filter.value.end) : null;

                if (startDate && endDate) {
                  return dateValue >= startDate && dateValue <= endDate;
                } else if (startDate) {
                  return dateValue >= startDate;
                } else if (endDate) {
                  return dateValue <= endDate;
                }
                return true;
              }
              default:
                return true;
            }
          }) as FilterFn<TData>
        };
      }

      return baseColumn;
    }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: handleRowSelectionChange,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
      globalFilter: searchValue
    },
    enableRowSelection: !!onRowSelectionChange
  });

  return (
    <div>
      <div className='flex justify-between items-center flex-wrap gap-2 gap-y-4 mb-4'>
        {filters && filters.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {filters.map((filter) => (
              <DropdownMenu key={filter.key}>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='sm' className='h-8'>
                    <FunnelIcon className='mr-2 h-4 w-4' />
                    {filter.label || filter.key}
                    {columnFilters.some((f) => f.id === filter.key) && (
                      <span className='ml-2 h-2 w-2 rounded-full bg-primary' />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-[200px]'>
                  <div className='p-2 w-full flex justify-center'>{renderColumnFilter(filter)}</div>

                  {columnFilters.some((f) => f.id === filter.key) && (
                    <Button
                      variant='ghost'
                      size='sm'
                      className='w-full text-muted-foreground'
                      onClick={() => {
                        setColumnFilters((prev) => prev.filter((f) => f.id !== filter.key));
                      }}
                    >
                      Réinitialiser
                    </Button>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        )}

        <div className='flex items-center gap-2'>
          {importFn && (
            <Button variant='outline' size='sm' className='h-8' onClick={() => importFn(data)}>
              <ArrowUpTrayIcon className='mr-2 h-4 w-4' />
              Importer
            </Button>
          )}

          {isDownloadable && (
            <Button variant='outline' size='sm' className='h-8' onClick={downloadAllData}>
              <ArrowDownTrayIcon className='mr-2 h-4 w-4' />
              Télécharger
            </Button>
          )}
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isFirstColumn = index === 0;
                  const isLastColumn = index === headerGroup.headers.length - 1;
                  const shouldShowOnMobile = isFirstColumn || isLastColumn;

                  return (
                    <TableHead key={header.id} className={cn(!shouldShowOnMobile && 'hidden md:table-cell')}>
                      {header.isPlaceholder ? null : (
                        <div className='flex items-center space-x-2'>
                          {header.column.getCanSort() &&
                          header.column.getCanHide() &&
                          header.column.id !== 'actions' ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='sm' className='-ml-3 h-8 data-[state=open]:bg-accent'>
                                  <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                  {header.column.getIsSorted() === 'desc' ? (
                                    <ArrowDown className='ml-2 h-4 w-4' />
                                  ) : header.column.getIsSorted() === 'asc' ? (
                                    <ArrowUp className='ml-2 h-4 w-4' />
                                  ) : (
                                    <ChevronsUpDown className='ml-2 h-4 w-4' />
                                  )}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='start'>
                                <DropdownMenuCheckboxItem
                                  className='pl-3'
                                  onClick={() => header.column.toggleSorting(false)}
                                >
                                  <ArrowUp className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                                  Croissant
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                  className='pl-3'
                                  onClick={() => header.column.toggleSorting(true)}
                                >
                                  <ArrowDown className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                                  Décroissant
                                </DropdownMenuCheckboxItem>

                                <DropdownMenuCheckboxItem
                                  className='pl-3'
                                  onClick={() => header.column.toggleVisibility(false)}
                                >
                                  <EyeOff className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                                  Cacher
                                </DropdownMenuCheckboxItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <div className='flex items-center'>
                              <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                            </div>
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={`loading-row-${rowIndex}`}>
                  {Array.from({ length: columns.length }).map((_, colIndex) => {
                    const isFirstColumn = colIndex === 0;
                    const isLastColumn = colIndex === columns.length - 1;
                    const shouldShowOnMobile = isFirstColumn || isLastColumn;

                    return (
                      <TableCell
                        key={`loading-cell-${colIndex}`}
                        className={cn(!shouldShowOnMobile && 'hidden md:table-cell')}
                      >
                        <Skeleton className='h-8 w-full' />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell, index) => {
                        const isFirstColumn = index === 0;
                        const isLastColumn = index === row.getVisibleCells().length - 1;
                        const shouldShowOnMobile = isFirstColumn || isLastColumn;

                        return (
                          <TableCell key={cell.id} className={cn(!shouldShowOnMobile && 'hidden md:table-cell')}>
                            <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      Aucun résultat trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {!disablePagination && (
        <div className='flex items-center justify-between px-2 mt-4 md:mt-8'>
          <div className='flex items-center gap-2'>
            {!!onRowSelectionChange && (
              <div className='flex-1 text-sm text-muted-foreground'>
                {table.getFilteredSelectedRowModel().rows.length} sur {table.getFilteredRowModel().rows.length} ligne(s)
                sélectionnée(s).
              </div>
            )}
          </div>
          <div className='flex items-center space-x-6 lg:space-x-8'>
            <div className='items-center space-x-2 hidden md:flex'>
              <p className='text-sm'>Lignes par page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className='h-8 w-[70px]'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-[100px] items-center justify-center text-sm'>
              Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Première page</span>
                <ChevronsLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Page précédente</span>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Page suivante</span>
                <ChevronRight className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Dernière page</span>
                <ChevronsRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
