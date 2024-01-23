import { NgModule } from '@angular/core';
import { DropdownMultiselectorComponent } from './dropdown-multiselector/dropdown-multiselector.component';
import { CommonModule } from '@angular/common';

const components = [DropdownMultiselectorComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: [...components],
})
export class ComponentsModule {}
