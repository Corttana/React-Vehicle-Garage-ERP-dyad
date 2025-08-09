import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErpLayout from '@/components/layout/ErpLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Car, Wrench, CheckCircle, Clock } from 'lucide-react';
import { getServiceReceptions } from '@/lib/api';
import { ServiceReception } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardPage = () => {
  const [stats, setStats] = useState({ total: 0, inProgress: 0, completed: 0, pending: 0 });
  const [recentServices, setRecentServices] = useState<ServiceReception[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const services = await getServiceReceptions();
      
      const total = services.length;
      const inProgress = services.filter(s => s.status === 'In Progress').length;
      const completed = services.filter(s => s.status === 'Completed').length;
      const pending = services.filter(s => s.status === 'Pending').length;
      
      setStats({ total, inProgress, completed, pending });
      setRecentServices(services.slice(0, 5));

      // Prepare data for the chart (e.g., services per status)
      setChartData([
        { name: 'Pending', count: pending, fill: '#f59e0b' },
        { name: 'In Progress', count: inProgress, fill: '#3b82f6' },
        { name: 'Completed', count: completed, fill: '#22c55e' },
        { name: 'Cancelled', count: services.filter(s => s.status === 'Cancelled').length, fill: '#ef4444' },
      ]);

      setLoading(false);
    };
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, loading }: { title: string, value: number, icon: React.ReactNode, loading: boolean }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{value}</div>}
      </CardContent>
    </Card>
  );

  return (
    <ErpLayout>
      <div className="erp-container space-y-6">
        <h1 className="text-2xl font-bold">Service Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Services" value={stats.total} icon={<Car className="h-4 w-4 text-muted-foreground" />} loading={loading} />
          <StatCard title="Services In Progress" value={stats.inProgress} icon={<Wrench className="h-4 w-4 text-muted-foreground" />} loading={loading} />
          <StatCard title="Pending Approval" value={stats.pending} icon={<Clock className="h-4 w-4 text-muted-foreground" />} loading={loading} />
          <StatCard title="Completed This Month" value={stats.completed} icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />} loading={loading} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader><CardTitle>Services by Status</CardTitle></CardHeader>
            <CardContent className="pl-2">
              {loading ? <Skeleton className="h-[300px] w-full" /> : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Services" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentServices.map(service => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">
                          <Link to={`/service-reception/edit/${service.id}`} className="text-primary hover:underline">
                            {service.id}
                          </Link>
                        </TableCell>
                        <TableCell>{service.customerName}</TableCell>
                        <TableCell><Badge>{service.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ErpLayout>
  );
};

export default DashboardPage;