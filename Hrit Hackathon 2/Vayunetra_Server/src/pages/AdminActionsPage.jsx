import { AdminActions } from "@/components/AdminActions";

const AdminActionsPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Admin Actions</h1>
        <p className="text-sm text-muted-foreground">ML-generated recommendations for municipal officers to mitigate air pollution</p>
      </div>
      <AdminActions />
    </div>
  );
};

export default AdminActionsPage;
