import { Layout } from "@/components/Layout";
import { useTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { FileText, Clock, CheckCircle2, XCircle, Search, Download, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Quote {
  id: string;
  date: string;
  status: 'In Review' | 'Approved' | 'Completed' | 'Rejected';
  product: string;
  quantity: number;
  material: string;
  amount: string | null;
}

// Mock Data (Replaced API)
const MOCK_QUOTES: Quote[] = [
  {
    id: 'Q-2026-001',
    date: '2026-02-04T10:30:00Z',
    status: 'In Review',
    product: 'Compression Springs',
    quantity: 5000,
    material: 'Stainless Steel 304',
    amount: null
  },
  {
    id: 'Q-2026-002',
    date: '2026-01-28T14:15:00Z',
    status: 'Approved',
    product: 'Custom Wire Forms',
    quantity: 1000,
    material: 'Music Wire',
    amount: '$1,250.00'
  },
  {
    id: 'Q-2025-089',
    date: '2025-12-10T09:00:00Z',
    status: 'Completed',
    product: 'Heavy Duty Die Springs',
    quantity: 200,
    material: 'Chrome Silicon',
    amount: '$850.00'
  },
  {
    id: 'Q-2025-075',
    date: '2025-11-05T16:45:00Z',
    status: 'Rejected',
    product: 'Torsion Springs',
    quantity: 50,
    material: 'Phosphor Bronze',
    amount: null
  }
];

export default function Dashboard({ lang }: { lang: Language }) {
  const t = useTranslation(lang);
  const isRTL = lang === 'ar';
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setQuotes(MOCK_QUOTES);
      setLoading(false);
    }, 800);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Review': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Review': return <Clock className="w-4 h-4 mr-1" />;
      case 'Approved': return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case 'Completed': return <FileText className="w-4 h-4 mr-1" />;
      case 'Rejected': return <XCircle className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <Layout lang={lang}>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900">
                  {lang === 'en' ? 'Customer Dashboard' : 'لوحة تحكم العميل'}
                </h1>
                <p className="text-slate-600 mt-1">
                  {lang === 'en' 
                    ? 'Welcome back, Mohamed Labib' 
                    : 'مرحباً بك، محمد لبيب'}
                </p>
              </div>
              <Button onClick={fetchQuotes} variant="outline" className="gap-2">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {lang === 'en' ? 'Refresh Data' : 'تحديث البيانات'}
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{lang === 'en' ? 'Total Requests' : 'إجمالي الطلبات'}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{quotes.length}</h3>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{lang === 'en' ? 'In Review' : 'قيد المراجعة'}</p>
                    <h3 className="text-2xl font-bold text-blue-600">
                      {quotes.filter(q => q.status === 'In Review').length}
                    </h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{lang === 'en' ? 'Approved' : 'تمت الموافقة'}</p>
                    <h3 className="text-2xl font-bold text-green-600">
                      {quotes.filter(q => q.status === 'Approved').length}
                    </h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{lang === 'en' ? 'Total Spend' : 'إجمالي الإنفاق'}</p>
                    <h3 className="text-2xl font-bold text-slate-900">$2,100</h3>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-slate-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>{lang === 'en' ? 'Quote History' : 'سجل العروض'}</CardTitle>
                <CardDescription>
                  {lang === 'en' ? 'Track the status of your recent quote requests.' : 'تتبع حالة طلبات العروض الحديثة الخاصة بك.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">{lang === 'en' ? 'All Requests' : 'كل الطلبات'}</TabsTrigger>
                    <TabsTrigger value="active">{lang === 'en' ? 'Active' : 'نشط'}</TabsTrigger>
                    <TabsTrigger value="completed">{lang === 'en' ? 'Completed' : 'مكتمل'}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="rounded-md border border-slate-200 overflow-hidden">
                      <Table>
                        <TableHeader className="bg-slate-50">
                          <TableRow>
                            <TableHead className={isRTL ? 'text-right' : 'text-left'}>{lang === 'en' ? 'Quote ID' : 'رقم العرض'}</TableHead>
                            <TableHead className={isRTL ? 'text-right' : 'text-left'}>{lang === 'en' ? 'Product' : 'المنتج'}</TableHead>
                            <TableHead className={isRTL ? 'text-right' : 'text-left'}>{lang === 'en' ? 'Date' : 'التاريخ'}</TableHead>
                            <TableHead className={isRTL ? 'text-right' : 'text-left'}>{lang === 'en' ? 'Status' : 'الحالة'}</TableHead>
                            <TableHead className={isRTL ? 'text-right' : 'text-left'}>{lang === 'en' ? 'Amount' : 'القيمة'}</TableHead>
                            <TableHead className="text-center">{lang === 'en' ? 'Actions' : 'إجراءات'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                                {lang === 'en' ? 'Loading data...' : 'جاري تحميل البيانات...'}
                              </TableCell>
                            </TableRow>
                          ) : quotes.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                                {lang === 'en' ? 'No quotes found.' : 'لا توجد عروض.'}
                              </TableCell>
                            </TableRow>
                          ) : (
                            quotes.map((quote) => (
                              <TableRow key={quote.id} className="hover:bg-slate-50/50">
                                <TableCell className="font-mono font-medium">{quote.id}</TableCell>
                                <TableCell>
                                  <div className="font-medium text-slate-900">{quote.product}</div>
                                  <div className="text-xs text-slate-500">{quote.material} • {quote.quantity} pcs</div>
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  {new Date(quote.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'ar-EG')}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`${getStatusColor(quote.status)} border px-2 py-1`}>
                                    <span className="flex items-center">
                                      {getStatusIcon(quote.status)}
                                      {quote.status}
                                    </span>
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-mono font-medium text-slate-700">
                                  {quote.amount || '---'}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Search className="h-4 w-4 text-slate-500" />
                                  </Button>
                                  {quote.amount && (
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Download className="h-4 w-4 text-slate-500" />
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  {/* Simplified logic for other tabs just filtering the data */}
                  <TabsContent value="active">
                    <div className="p-8 text-center text-slate-500 bg-slate-50 rounded border border-dashed border-slate-300">
                      {lang === 'en' ? 'Filter view: Active requests shown here.' : 'تصفية العرض: الطلبات النشطة تظهر هنا.'}
                    </div>
                  </TabsContent>
                  <TabsContent value="completed">
                    <div className="p-8 text-center text-slate-500 bg-slate-50 rounded border border-dashed border-slate-300">
                      {lang === 'en' ? 'Filter view: Completed history shown here.' : 'تصفية العرض: السجل المكتمل يظهر هنا.'}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
}
