import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Code, 
  FileJson, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Copy, 
  Download, 
  Plus, 
  Trash2, 
  RefreshCw, 
  AlertTriangle, 
  Zap,
  Globe,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import axios from 'axios';

interface WebhookTest {
  id: string;
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers: Record<string, string>;
  payload: string;
  response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: any;
    time: number;
  } | null;
  error?: string;
  timestamp: Date;
}

interface HeaderPair {
  key: string;
  value: string;
}

const WebhookTester = () => {
  const [url, setUrl] = useState('https://webhook.site/');
  const [method, setMethod] = useState<'POST' | 'GET' | 'PUT' | 'DELETE'>('POST');
  const [headers, setHeaders] = useState<HeaderPair[]>([
    { key: 'Content-Type', value: 'application/json' }
  ]);
  const [payload, setPayload] = useState(JSON.stringify({
    event: "order.placed",
    restaurant_id: "rest_12345",
    table: "7",
    items: [
      { name: "Veg Thali", qty: 1 },
      { name: "Water Bottle", qty: 1 }
    ],
    timestamp: new Date().toISOString()
  }, null, 2));
  
  const [testHistory, setTestHistory] = useState<WebhookTest[]>([]);
  const [expandedTest, setExpandedTest] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<'payload' | 'headers' | 'response' | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const payloadRef = useRef<HTMLTextAreaElement>(null);
  
  // Format JSON for display
  const formatJson = (json: string): string => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch (e) {
      return json;
    }
  };
  
  // Validate JSON
  const validateJson = (json: string): boolean => {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // Add header pair
  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };
  
  // Remove header pair
  const removeHeader = (index: number) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };
  
  // Update header key
  const updateHeaderKey = (index: number, key: string) => {
    const newHeaders = [...headers];
    newHeaders[index].key = key;
    setHeaders(newHeaders);
  };
  
  // Update header value
  const updateHeaderValue = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index].value = value;
    setHeaders(newHeaders);
  };
  
  // Format headers for request
  const formatHeaders = (): Record<string, string> => {
    const formattedHeaders: Record<string, string> = {};
    headers.forEach(header => {
      if (header.key.trim() && header.value.trim()) {
        formattedHeaders[header.key.trim()] = header.value.trim();
      }
    });
    return formattedHeaders;
  };
  
  // Send webhook test
  const sendWebhookTest = async () => {
    // Validate URL
    if (!url.trim() || !url.startsWith('http')) {
      setValidationError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    
    // Validate JSON payload
    if (!validateJson(payload)) {
      setValidationError('Invalid JSON payload. Please check your syntax.');
      return;
    }
    
    setValidationError(null);
    setIsSending(true);
    
    const testId = `test-${Date.now()}`;
    const startTime = performance.now();
    
    try {
      const formattedHeaders = formatHeaders();
      const response = await axios({
        method,
        url,
        headers: formattedHeaders,
        data: method !== 'GET' ? JSON.parse(payload) : undefined,
        timeout: 30000, // 30 second timeout
      });
      
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      // Create test result
      const testResult: WebhookTest = {
        id: testId,
        url,
        method,
        headers: formattedHeaders,
        payload,
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers as Record<string, string>,
          data: response.data,
          time: responseTime
        },
        timestamp: new Date()
      };
      
      // Add to history (limit to 10 items)
      setTestHistory(prev => [testResult, ...prev].slice(0, 10));
      setExpandedTest(testId);
      
    } catch (error) {
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      let errorMessage = 'Unknown error occurred';
      let errorResponse = null;
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.message;
        if (error.response) {
          errorResponse = {
            status: error.response.status,
            statusText: error.response.statusText,
            headers: error.response.headers as Record<string, string>,
            data: error.response.data,
            time: responseTime
          };
        }
      }
      
      // Create test result with error
      const testResult: WebhookTest = {
        id: testId,
        url,
        method,
        headers: formatHeaders(),
        payload,
        response: errorResponse,
        error: errorMessage,
        timestamp: new Date()
      };
      
      // Add to history (limit to 10 items)
      setTestHistory(prev => [testResult, ...prev].slice(0, 10));
      setExpandedTest(testId);
    } finally {
      setIsSending(false);
    }
  };
  
  // Toggle expanded test
  const toggleExpandTest = (id: string) => {
    setExpandedTest(expandedTest === id ? null : id);
  };
  
  // Toggle expanded section
  const toggleExpandSection = (section: 'payload' | 'headers' | 'response') => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Copy to clipboard
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  
  // Export test history as CSV
  const exportTestHistory = () => {
    if (testHistory.length === 0) return;
    
    const headers = ['Timestamp', 'URL', 'Method', 'Status', 'Response Time (ms)'];
    const rows = testHistory.map(test => [
      test.timestamp.toLocaleString(),
      test.url,
      test.method,
      test.response ? test.response.status : 'Error',
      test.response ? test.response.time : '-'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `webhook-tests-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };
  
  // Format timestamp
  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleString();
  };
  
  // Get status color
  const getStatusColor = (status: number | undefined): string => {
    if (!status) return 'bg-red-500';
    if (status >= 200 && status < 300) return 'bg-green-500';
    if (status >= 300 && status < 400) return 'bg-blue-500';
    if (status >= 400 && status < 500) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Webhook Tester</h1>
            <p className="text-gray-600">Test and validate webhook integrations with external services</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportTestHistory}
              disabled={testHistory.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              <span>Export Log</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Webhook Form */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* URL Input */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary-500" />
                Webhook URL
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex space-x-2">
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value as any)}
                      className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="POST">POST</option>
                      <option value="GET">GET</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://your-webhook-url.com/endpoint"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Ensure this endpoint is publicly accessible and can receive {method} requests.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Headers */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary-500" />
                  Headers
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleExpandSection('headers')}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {expandedSection === 'headers' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </motion.button>
              </div>
              
              <AnimatePresence>
                {(expandedSection === 'headers' || expandedSection === null) && (
                  <motion.div
                    initial={expandedSection === 'headers' ? { height: 0, opacity: 0 } : { opacity: 1 }}
                    animate={expandedSection === 'headers' ? { height: 'auto', opacity: 1 } : { opacity: 1 }}
                    exit={expandedSection === 'headers' ? { height: 0, opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 overflow-hidden"
                  >
                    {headers.map((header, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateHeaderKey(index, e.target.value)}
                          placeholder="Header Name"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateHeaderValue(index, e.target.value)}
                          placeholder="Value"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeHeader(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>
                    ))}
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addHeader}
                      className="w-full flex items-center justify-center space-x-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Header</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Payload */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <FileJson className="h-5 w-5 mr-2 text-primary-500" />
                  Payload
                </h2>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(payload, 'payload')}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copiedField === 'payload' ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleExpandSection('payload')}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {expandedSection === 'payload' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </motion.button>
                </div>
              </div>
              
              <AnimatePresence>
                {(expandedSection === 'payload' || expandedSection === null) && (
                  <motion.div
                    initial={expandedSection === 'payload' ? { height: 0, opacity: 0 } : { opacity: 1 }}
                    animate={expandedSection === 'payload' ? { height: 'auto', opacity: 1 } : { opacity: 1 }}
                    exit={expandedSection === 'payload' ? { height: 0, opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      <textarea
                        ref={payloadRef}
                        value={payload}
                        onChange={(e) => setPayload(e.target.value)}
                        rows={10}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono text-sm resize-none"
                      />
                      
                      {method === 'GET' && (
                        <div className="absolute inset-0 bg-gray-200/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                            <p className="text-gray-700 mb-2">Payload not applicable for GET requests</p>
                            <p className="text-sm text-gray-500">Parameters should be included in the URL</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {validationError && (
                      <div className="mt-2 text-red-500 text-sm flex items-center space-x-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{validationError}</span>
                      </div>
                    )}
                    
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => {
                          try {
                            const formatted = formatJson(payload);
                            setPayload(formatted);
                            setValidationError(null);
                          } catch (e) {
                            setValidationError('Invalid JSON. Unable to format.');
                          }
                        }}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Format JSON
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Send Button */}
            <motion.button
              whileHover={{ scale: isSending ? 1 : 1.02 }}
              whileTap={{ scale: isSending ? 1 : 0.98 }}
              onClick={sendWebhookTest}
              disabled={isSending}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Sending Request...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Test Request</span>
                </>
              )}
            </motion.button>
          </motion.div>
          
          {/* Test History */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary-500" />
                  Test History
                </h2>
                {testHistory.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportTestHistory}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </motion.button>
                )}
              </div>
              
              {testHistory.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No tests run yet</p>
                  <p className="text-sm text-gray-400">Send a test request to see results here</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {testHistory.map((test) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-white rounded-xl border ${
                        test.response && test.response.status >= 200 && test.response.status < 300
                          ? 'border-green-200'
                          : 'border-red-200'
                      } shadow-md overflow-hidden`}
                    >
                      {/* Test Header */}
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleExpandTest(test.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(test.response?.status)}`}></div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{test.method}</span>
                              <span className="text-gray-500 text-sm truncate max-w-[200px]">{test.url}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-gray-500">{formatTimestamp(test.timestamp)}</span>
                              {test.response && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  test.response.status >= 200 && test.response.status < 300
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {test.response.status} {test.response.statusText}
                                </span>
                              )}
                              {test.error && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                  Error
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {test.response && (
                            <span className="text-sm text-gray-500">{test.response.time}ms</span>
                          )}
                          {expandedTest === test.id ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {/* Expanded Test Details */}
                      <AnimatePresence>
                        {expandedTest === test.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 overflow-hidden"
                          >
                            <div className="p-4 space-y-4">
                              {/* Request Details */}
                              <div>
                                <h3 className="font-medium text-gray-900 mb-2">Request</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">URL:</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{test.url}</span>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => copyToClipboard(test.url, `url-${test.id}`)}
                                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                      >
                                        {copiedField === `url-${test.id}` ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </motion.button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Method:</span>
                                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{test.method}</span>
                                  </div>
                                  
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm text-gray-500">Headers:</span>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => copyToClipboard(JSON.stringify(test.headers, null, 2), `headers-${test.id}`)}
                                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                      >
                                        {copiedField === `headers-${test.id}` ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </motion.button>
                                    </div>
                                    <pre className="text-xs font-mono bg-gray-100 p-2 rounded-lg overflow-x-auto max-h-32">
                                      {JSON.stringify(test.headers, null, 2)}
                                    </pre>
                                  </div>
                                  
                                  {test.method !== 'GET' && (
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-500">Payload:</span>
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={() => copyToClipboard(test.payload, `payload-${test.id}`)}
                                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                        >
                                          {copiedField === `payload-${test.id}` ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                          ) : (
                                            <Copy className="h-4 w-4" />
                                          )}
                                        </motion.button>
                                      </div>
                                      <pre className="text-xs font-mono bg-gray-100 p-2 rounded-lg overflow-x-auto max-h-48">
                                        {formatJson(test.payload)}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Response or Error */}
                              {test.response ? (
                                <div>
                                  <h3 className="font-medium text-gray-900 mb-2">Response</h3>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-gray-500">Status:</span>
                                      <span className={`text-sm font-mono px-2 py-1 rounded ${
                                        test.response.status >= 200 && test.response.status < 300
                                          ? 'bg-green-100 text-green-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}>
                                        {test.response.status} {test.response.statusText}
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-gray-500">Time:</span>
                                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                        {test.response.time}ms
                                      </span>
                                    </div>
                                    
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-500">Response Headers:</span>
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={() => copyToClipboard(JSON.stringify(test.response.headers, null, 2), `resp-headers-${test.id}`)}
                                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                        >
                                          {copiedField === `resp-headers-${test.id}` ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                          ) : (
                                            <Copy className="h-4 w-4" />
                                          )}
                                        </motion.button>
                                      </div>
                                      <pre className="text-xs font-mono bg-gray-100 p-2 rounded-lg overflow-x-auto max-h-32">
                                        {JSON.stringify(test.response.headers, null, 2)}
                                      </pre>
                                    </div>
                                    
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-500">Response Body:</span>
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={() => copyToClipboard(
                                            typeof test.response.data === 'object' 
                                              ? JSON.stringify(test.response.data, null, 2) 
                                              : String(test.response.data),
                                            `resp-body-${test.id}`
                                          )}
                                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                        >
                                          {copiedField === `resp-body-${test.id}` ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                          ) : (
                                            <Copy className="h-4 w-4" />
                                          )}
                                        </motion.button>
                                      </div>
                                      <pre className="text-xs font-mono bg-gray-100 p-2 rounded-lg overflow-x-auto max-h-64">
                                        {typeof test.response.data === 'object' 
                                          ? JSON.stringify(test.response.data, null, 2) 
                                          : test.response.data}
                                      </pre>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <h3 className="font-medium text-red-600 mb-2 flex items-center">
                                    <XCircle className="h-5 w-5 mr-1" />
                                    Error
                                  </h3>
                                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                                    <p className="text-red-700">{test.error}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Rate Limit Info */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Rate Limits</p>
                  <p className="text-blue-700 text-sm">Maximum 10 webhook tests per hour per user to prevent abuse.</p>
                </div>
              </div>
            </div>
            
            {/* Documentation */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Tips</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Use <span className="font-mono bg-gray-100 px-1 rounded">webhook.site</span> for quick testing without setting up an endpoint.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Include an <span className="font-mono bg-gray-100 px-1 rounded">Authorization</span> header if your endpoint requires authentication.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    For testing FeedUP webhooks, use the event types: <span className="font-mono bg-gray-100 px-1 rounded">order.placed</span>, <span className="font-mono bg-gray-100 px-1 rounded">order.updated</span>, <span className="font-mono bg-gray-100 px-1 rounded">payment.success</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default WebhookTester;