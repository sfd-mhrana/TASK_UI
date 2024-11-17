import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@NgModule({
  imports: [RouterLink],
  exports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
})
export class AngularModule {}
