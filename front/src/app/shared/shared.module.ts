import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  ComponentsModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  imports: modules,
  exports: [...modules],
})
export class SharedModule {}
