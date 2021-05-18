import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/expenses.service';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ExpenseDialogComponent>,private api:ExpensesService , private toastr : ToastrService) { }

  name : any ;
  expenseForm : FormGroup;
  Users : any ;

  ngOnInit(): void {

    this.api.getUsers().subscribe(
      (data:any) => {
        console.log(data);
        this.Users = data;
      }
    );

    this.expenseForm = new FormGroup({
      name : new FormControl('',Validators.required),
      purpose : new FormControl('',Validators.required),
      expenditure : new FormControl('',Validators.required),
      date : new FormControl('',Validators.required)
    });

  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

  addExpense(){
    console.log(this.expenseForm.value);
    this.api.postExpense(this.expenseForm.value)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data._id){
          this.expenseForm.reset();
          this.dialogRef.close();
          this.toastr.success('Successfully added');
        }
      }
    );
  }

}
