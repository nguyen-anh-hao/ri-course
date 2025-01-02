import GenericTable from '@/components/ui/GenericTable';
import { Menu, MenuItem } from '@mui/material';

interface Submission {
    id: number;
    student: string;
    status: string;
    score: number;
    submissionDate: string; // Add submission date field
}

interface SubmissionsTableProps {
    submissions: Submission[];
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ submissions }) => {
    const columns: { id: keyof Submission; label: string; sortable?: boolean; render?: (value: any) => any }[] = [
        { id: 'id', label: 'ID', sortable: true },
        { id: 'student', label: 'Học viên', sortable: true },
        { id: 'status', label: 'Trạng thái', sortable: true },
        { id: 'score', label: 'Điểm', sortable: true },
        { id: 'submissionDate', label: 'Ngày nộp', sortable: true }, // Add new column for submission date
    ];

    const actions = () => ([
        <MenuItem key="view" onClick={() => { }}>Xem bài làm</MenuItem>,
    ]);

    return <>
        <GenericTable
            data={submissions}
            columns={columns}
            searchPlaceholder='Tìm kiếm bài nộp'
            actions={actions}
        />
    </>;
};

export default SubmissionsTable;