import React from 'react';
import GenericTable from '../../../../components/ui/GenericTable';
import { IconButton, MenuItem } from '@mui/material';
import { Course } from '@/interfaces/course.interfaces';

interface CourseManagementTableProps {
    courses: Course[];
    onEdit: (course: Course) => void;
    onDelete: (course: Course) => void;
}

const CourseManagementTable: React.FC<CourseManagementTableProps> = ({ courses, onEdit, onDelete }) => {
    // console.log(courses);

    const columns: { id: keyof Course; label: string; sortable?: boolean; render?: (value: any) => any }[] = [
        { id: 'id', label: 'ID', sortable: true },
        { id: 'title', label: 'Tên khóa học', sortable: true },
        { id: 'description', label: 'Mô tả' },
        { id: 'createAt', label: 'Ngày tạo', sortable: true, render: (value: string) => new Date(value).toLocaleDateString('en-GB') },
        { id: 'updatedAt', label: 'Ngày cập nhật', sortable: true, render: (value: string) => new Date(value).toLocaleDateString('en-GB') },
    ];

    const actions = (course: Course) => ([
        <MenuItem key='edit' onClick={() => onEdit(course)}>Chỉnh sửa</MenuItem>,
        <MenuItem key='delete' onClick={() => onDelete(course)}> Xóa</MenuItem >,
    ]);

    return (
        <GenericTable
            columns={columns}
            data={courses}
            actions={actions}
            searchPlaceholder="Tìm kiếm khóa học"
        />
    );
};

export default CourseManagementTable;