import { NgModule } from '@angular/core';
import { DropdownMultiselectorComponent } from './dropdown-multiselector/dropdown-multiselector.component';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@kernel/directive';
import { FormsModule } from '@angular/forms';

const components = [DropdownMultiselectorComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [...components, LetDirective],
  exports: [...components],
})
export class ComponentsModule {}
