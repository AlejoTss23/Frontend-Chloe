import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VariableService } from 'src/app/service/variable.service';
import { Variable } from '../Variable.model';



@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
})
export class VariableComponent implements OnInit {
  variables: Variable[] = [];
  newVariable: Variable = { nombre: '', monto: 0, esIngreso: true }; // Define el nuevo campo esIngreso
  balanceId!: number;
  editMode = false;
  variableToEdit?: Variable;

  constructor(
    private variableService: VariableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.balanceId = +this.route.snapshot.paramMap.get('balanceId')!;
    this.getVariables();
  }

  getVariables(): void {
    this.variableService.getVariablesByBalanceId(this.balanceId)
      .subscribe(
        (variables) => this.variables = variables, // Reemplaza la lista completa
        (error) => console.error('Error getting variables:', error)
      );
  }
  

  addVariable(): void {
    if (this.editMode && this.variableToEdit) {
      this.variableService.updateVariable(this.variableToEdit.id!, this.newVariable)
        .subscribe(
          () => {
            this.getVariables(); // Refresca la lista de variables
            this.resetForm(); // Reinicia el formulario y el modo de edición
          },
          (error) => console.error('Error updating variable:', error)
        );
    } else {
      if (!this.newVariable || this.newVariable.nombre.trim() === '' || this.newVariable.monto <= 0) {
        return; // Evita la llamada si los datos están incompletos o incorrectos
      }

      this.variableService.createVariable(this.newVariable, this.balanceId)
        .subscribe(
          () => {
            this.getVariables();
            this.resetForm();
          },
          (error) => console.error('Error adding variable:', error)
        );
    }
}

  
  
deleteVariable(variableId: number): void {
  this.variableService.deleteVariable(variableId)
    .subscribe(
      () => {
        this.getVariables(); // Recarga la lista completa de variables después de eliminar
      },
      (error) => console.error('Error deleting variable:', error)
    );
}

  

editVariable(variable: Variable): void {
  this.editMode = true;
  this.variableToEdit = variable;
  this.newVariable = { ...variable }; // Copia los datos de la variable seleccionada para editarlos
}

  resetForm(): void {
    this.editMode = false;
    this.variableToEdit = undefined;
    this.newVariable = { nombre: '', monto: 0, esIngreso: true };
}
}


