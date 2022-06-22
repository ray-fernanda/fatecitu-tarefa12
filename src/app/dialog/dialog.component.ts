import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  semestresList = ["Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto", "Sexto", "Sétimo", "Oitavo"];
  studentForm !: FormGroup;
  actionBtn : string = "Salvar";
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      nome : ['', Validators.required],
      curso : ['', Validators.required],
      semestre : ['', Validators.required],
      turno : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.studentForm.controls['nome'].setValue(this.editData.nome);
      this.studentForm.controls['curso'].setValue(this.editData.curso);
      this.studentForm.controls['semestre'].setValue(this.editData.semestre);
      this.studentForm.controls['turno'].setValue(this.editData.turno);
    }
  }
  addStudent(){
    if(!this.editData){
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
    }else{
      this.updateStudent()
    }
  }
  updateStudent(){
    this.api.putStudent(this.studentForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Estudante atualizado com sucesso!!!");
        this.studentForm.reset();
        this.dialogRef.close('atualizar');
      },
      error:()=>{
        alert("Erro ao atualizar estudante");
      }
    })
  }
}
