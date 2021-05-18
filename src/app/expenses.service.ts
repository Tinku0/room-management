import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http:HttpClient) { }

  ngOnInit() {

  }

  postExpense(expense){
    return this.http.post('https://safe-springs-84896.herokuapp.com/api/expenses',expense);
  }

  getExpenses(){
    return this.http.get('https://safe-springs-84896.herokuapp.com/api/expenses');
  }

  deleteExpenseById(id){
    return this.http.delete('https://safe-springs-84896.herokuapp.com/api/expenses/deleteExpenseById/'+ id);
  }

  getUsers(){
    return this.http.get('https://safe-springs-84896.herokuapp.com/api/users');
  }

  getExpensesByUser(user){
    return this.http.get('https://safe-springs-84896.herokuapp.com/api/expenses/byname/'+ user)
  }
  
}
