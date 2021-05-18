import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpensesService } from 'src/app/expenses.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { GridOptions, RowNode } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private api:ExpensesService,private dialog : MatDialog,private toastr : ToastrService) { }

  Expenses : any;
  Total : any;
  Users : any;
  user : any;

  ngOnInit(): void {
    this.user = 'all';
    this.getExpenses();
    this.api.getUsers()
    .subscribe(
      (data:any)=>{
        this.Users = data;
      }
    );
  }

  getExpensesByUser(){
    console.log(this.user);
    if(this.user != 'all'){
      this.api.getExpensesByUser(this.user)
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.Expenses = data['Expense'];
        this.Total = data['Total'];
      }
    );
    }else{
      this.getExpenses();
    }
  }

  getExpenses(){
    this.api.getExpenses().subscribe(
      (data:any)=>{
        console.log(data);
        this.Expenses = data['expenses'];
        this.Total = data['Total'];
      }
    );
  }

  deleteExpense(id){
    this.api.deleteExpenseById(id)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          this.toastr.success('Successfully Deleted');
          this.getExpenses();
        }
      }
    )
  }

  openDialog(teacher?:any): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '750px',
      height:'320px',
      data: teacher
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'The dialog was closed');
      this.getExpenses();
    });
  }

}
