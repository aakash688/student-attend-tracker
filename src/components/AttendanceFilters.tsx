import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, Info } from "lucide-react";

interface AttendanceFiltersProps {
  month: string;
  year: string;
  userType: string;
  society: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onUserTypeChange: (value: string) => void;
  onSocietyChange: (value: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = ["2023", "2024", "2025", "2026"];
const userTypes = ["All User Types", "Admin", "Site Supervisor", "Employee"];
const societies = ["All Societies", "Society A", "Society B", "Society C"];

export const AttendanceFilters = ({
  month,
  year,
  userType,
  society,
  onMonthChange,
  onYearChange,
  onUserTypeChange,
  onSocietyChange,
  onApplyFilters,
  onResetFilters
}: AttendanceFiltersProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onResetFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            Instructions
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Month</label>
          <Select value={month} onValueChange={onMonthChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Year</label>
          <Select value={year} onValueChange={onYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">User Type</label>
          <Select value={userType} onValueChange={onUserTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              {userTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Society</label>
          <Select value={society} onValueChange={onSocietyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select society" />
            </SelectTrigger>
            <SelectContent>
              {societies.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onApplyFilters} className="bg-primary hover:bg-primary/90">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};