import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  semestresList = ["1°Semestre", "2°Semestre", "3°Semestre", "4°Semestre", "5°Semestre", "6°Semestre", "7°Semestre", "8°Semestre"];
  studentForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      nome : ['', Validators.required],
      curso : ['', Validators.required],
      semestre : ['', Validators.required],
      turno : ['', Validators.required]
    })
  }
  addStudent(){
    if(this.studentForm.valid){
      this.api.postStudent(this.studentForm.value)
      .subscribe({
        next:(res)=>{
          alert("Estudante adicionado com sucesso!!!");
          this.studentForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Erro ao adicionar estudante")
        }
      })
    }
  }

}
