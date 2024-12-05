import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    IconButton,
    Menu,
    MenuItem,
    Box,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Button,
    Chip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

interface Column<T> {
    id: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
}

interface GenericTableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: (row: T) => React.ReactNode;
    searchPlaceholder?: string;
}

const GenericTable = <T,>({
    columns,
    data,
    actions,
    searchPlaceholder = 'Search...',
}: GenericTableProps<T>) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof T | null>('id' as keyof T);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRow, setSelectedRow] = useState<T | null>(null);

    const handleRequestSort = (property: keyof T) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setOrder(isAsc ? 'desc' : 'asc');
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: T) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const filteredData = data.filter((row) =>
        Object.values(row as Record<string, unknown>).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(search.toLowerCase())
        )
    );

    const sortedData = orderBy
        ? [...filteredData].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
            return 0;
        })
        : filteredData;

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Box display='flex' justifyContent='space-between' mb={2}>
                <TextField
                    variant='outlined'
                    size='small'
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={searchPlaceholder}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={String(column.id)}>
                                    {column.sortable ? (
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                            {actions && <TableCell>Hành động</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={String(column.id)}>
                                        {column.render ? column.render(row[column.id], row) : (row[column.id] as React.ReactNode)}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell>
                                        <IconButton onClick={(e) => handleMenuClick(e, row)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl) && selectedRow === row}
                                            onClose={handleMenuClose}
                                        >
                                            {actions(row)}
                                        </Menu>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={sortedData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    );
};

export default GenericTable;