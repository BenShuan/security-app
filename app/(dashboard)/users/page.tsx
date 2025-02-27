import UsersTable from './components/users-table';
import DashboardHeader from '../components/dashboard-header';

export default async function UserPage() {
  return (
    <div className="p-4 ">
      <DashboardHeader />
      <UsersTable />
    </div>
  );
}
