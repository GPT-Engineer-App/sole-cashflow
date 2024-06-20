import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'income', category: 'Nike' },
    { id: 2, date: '2023-10-02', amount: 150, type: 'expense', category: 'Adidas' },
  ]);
  const [newTransaction, setNewTransaction] = useState({ date: '', amount: '', type: '', category: '' });
  const [editTransaction, setEditTransaction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    setNewTransaction({ date: '', amount: '', type: '', category: '' });
  };

  const editExistingTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setEditTransaction(transaction);
  };

  const updateTransaction = () => {
    setTransactions(transactions.map((t) => (t.id === editTransaction.id ? editTransaction : t)));
    setEditTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            name="date"
            placeholder="Date"
            value={newTransaction.date}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Input
            name="amount"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Select onValueChange={(value) => handleSelectChange('type', value)}>
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleSelectChange('category', value)}>
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nike">Nike</SelectItem>
              <SelectItem value="Adidas">Adidas</SelectItem>
              <SelectItem value="Puma">Puma</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button onClick={addTransaction}>Add Transaction</Button>
        </CardFooter>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your sneaker transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => editExistingTransaction(transaction.id)} className="mr-2">Edit</Button>
                    <Button variant="destructive" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {editTransaction && (
        <Dialog open={true} onOpenChange={() => setEditTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            <CardContent>
              <Input
                name="date"
                placeholder="Date"
                value={editTransaction.date}
                onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
                className="mb-2"
              />
              <Input
                name="amount"
                placeholder="Amount"
                value={editTransaction.amount}
                onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })}
                className="mb-2"
              />
              <Select onValueChange={(value) => setEditTransaction({ ...editTransaction, type: value })}>
                <SelectTrigger className="w-full mb-2">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setEditTransaction({ ...editTransaction, category: value })}>
                <SelectTrigger className="w-full mb-2">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Adidas">Adidas</SelectItem>
                  <SelectItem value="Puma">Puma</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button onClick={updateTransaction}>Update Transaction</Button>
            </CardFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;