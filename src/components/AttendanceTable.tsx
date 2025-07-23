import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Download, Calendar, ChevronLeft, ChevronRight, Plus, Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
}

interface AttendanceEntry {
  type: 'present' | 'absent' | 'late' | 'holiday';
  time?: string;
  notes?: string;
}

interface AttendanceRecord {
  employeeId: string;
  date: string;
  entries: AttendanceEntry[];
}

const employees: Employee[] = [
  { id: '1', name: 'aakashkumar prajapati', role: 'Admin', initials: 'AS', avatarColor: 'bg-red-500' },
  { id: '2', name: 'Akash Yadav', role: 'Site Supervisor', initials: 'AY', avatarColor: 'bg-orange-500' },
  { id: '3', name: 'Kamlesh Prajapati', role: 'Site Supervisor', initials: 'KP', avatarColor: 'bg-red-500' },
  { id: '4', name: 'Nilesh Humbe', role: 'Admin', initials: 'NH', avatarColor: 'bg-red-500' },
];

export const AttendanceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [selectedCell, setSelectedCell] = useState<{employeeId: string, date: string} | null>(null);

  // Generate days for current month (simplified to 16 days as shown in image)
  const days = Array.from({ length: 16 }, (_, i) => i + 1);
  const month = "July";
  const year = "2025";

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceForDay = (employeeId: string, day: number): AttendanceEntry[] => {
    const record = attendanceData.find(
      r => r.employeeId === employeeId && r.date === `${year}-07-${day.toString().padStart(2, '0')}`
    );
    return record?.entries || [];
  };

  const addAttendanceEntry = (employeeId: string, day: number, entry: AttendanceEntry) => {
    const date = `${year}-07-${day.toString().padStart(2, '0')}`;
    setAttendanceData(prev => {
      const existing = prev.find(r => r.employeeId === employeeId && r.date === date);
      if (existing) {
        return prev.map(r => 
          r.employeeId === employeeId && r.date === date
            ? { ...r, entries: [...r.entries, entry] }
            : r
        );
      } else {
        return [...prev, { employeeId, date, entries: [entry] }];
      }
    });
  };

  const AttendanceCell = ({ employeeId, day }: { employeeId: string, day: number }) => {
    const entries = getAttendanceForDay(employeeId, day);
    const [isOpen, setIsOpen] = useState(false);

    const handleQuickMark = (type: AttendanceEntry['type']) => {
      addAttendanceEntry(employeeId, day, { type, time: new Date().toLocaleTimeString() });
    };

    if (entries.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 rounded-full border border-border hover:bg-accent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mark Attendance - Day {day}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => { handleQuickMark('present'); setIsOpen(false); }}
                  className="bg-present hover:bg-present/90"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Present
                </Button>
                <Button
                  onClick={() => { handleQuickMark('absent'); setIsOpen(false); }}
                  className="bg-absent hover:bg-absent/90"
                >
                  <X className="h-4 w-4 mr-2" />
                  Absent
                </Button>
                <Button
                  onClick={() => { handleQuickMark('late'); setIsOpen(false); }}
                  className="bg-late hover:bg-late/90"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Late
                </Button>
                <Button
                  onClick={() => { handleQuickMark('holiday'); setIsOpen(false); }}
                  className="bg-holiday hover:bg-holiday/90"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Holiday
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              {entries.map((entry, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "text-xs mr-1 mb-1",
                    entry.type === 'present' && "bg-present text-present-foreground",
                    entry.type === 'absent' && "bg-absent text-absent-foreground",
                    entry.type === 'late' && "bg-late text-late-foreground",
                    entry.type === 'holiday' && "bg-holiday text-holiday-foreground"
                  )}
                >
                  {entry.type === 'present' && 'P'}
                  {entry.type === 'absent' && 'A'}
                  {entry.type === 'late' && 'L'}
                  {entry.type === 'holiday' && 'H'}
                </Badge>
              ))}
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Attendance Details - Day {day}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {entries.map((entry, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={cn(
                        entry.type === 'present' && "bg-present text-present-foreground",
                        entry.type === 'absent' && "bg-absent text-absent-foreground",
                        entry.type === 'late' && "bg-late text-late-foreground",
                        entry.type === 'holiday' && "bg-holiday text-holiday-foreground"
                      )}
                    >
                      {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                    </Badge>
                    {entry.time && <span className="text-sm text-muted-foreground">{entry.time}</span>}
                  </div>
                  {entry.notes && <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>}
                </div>
              ))}
              <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Attendance Sheet</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Legend
          </Button>
          <Button size="sm" className="bg-success hover:bg-success/90">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">entries</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <span className="text-sm text-muted-foreground">
            Showing 1 to 4 of 4 entries
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <div className="min-w-full">
          <div className="flex bg-muted">
            {/* Employee Column - Fixed */}
            <div className="w-64 flex-shrink-0 bg-muted border-r border-border">
              <div className="h-12 flex items-center px-4 font-semibold text-foreground border-b border-border">
                EMPLOYEE
              </div>
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="h-16 flex items-center px-4 border-b border-border">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className={cn("text-white font-semibold", employee.avatarColor)}>
                      {employee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground text-sm">{employee.name}</div>
                    <div className="text-xs text-muted-foreground">{employee.role}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Days Grid - Scrollable */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex">
                {days.map((day) => (
                  <div key={day} className="w-16 flex-shrink-0">
                    <div className="h-12 flex items-center justify-center bg-muted border-b border-border border-r border-border font-semibold text-foreground">
                      {day}
                    </div>
                    {filteredEmployees.map((employee) => (
                      <div 
                        key={`${employee.id}-${day}`}
                        className="h-16 border-b border-border border-r border-border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <AttendanceCell employeeId={employee.id} day={day} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};