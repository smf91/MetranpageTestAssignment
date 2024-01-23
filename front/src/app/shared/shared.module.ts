import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { LetDirective } from '@kernel/directive';
import { CommonModule } from '@angular/common';

const modules = [ComponentsModule, CommonModule];

@NgModule({
  declarations: [LetDirective],
  imports: modules,
  exports: [...modules],
})
export class SharedModule {}
