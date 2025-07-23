import { useState } from "react";
import { AttendanceFilters } from "./AttendanceFilters";
import { AttendanceTable } from "./AttendanceTable";
import { useToast } from "@/hooks/use-toast";

export const AttendanceManagement = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    month: "July",
    year: "2025",
    userType: "All User Types",
    society: "All Societies"
  });

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Attendance data has been updated based on your filters.",
    });
  };

  const handleResetFilters = () => {
    setFilters({
      month: "July",
      year: "2025",
      userType: "All User Types",
      society: "All Societies"
    });
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage student attendance efficiently</p>
        </div>

        <AttendanceFilters
          month={filters.month}
          year={filters.year}
          userType={filters.userType}
          society={filters.society}
          onMonthChange={(value) => setFilters(prev => ({ ...prev, month: value }))}
          onYearChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
          onUserTypeChange={(value) => setFilters(prev => ({ ...prev, userType: value }))}
          onSocietyChange={(value) => setFilters(prev => ({ ...prev, society: value }))}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />

        <AttendanceTable />
      </div>
    </div>
  );
};