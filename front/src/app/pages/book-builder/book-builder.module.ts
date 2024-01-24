import { NgModule } from '@angular/core';
import { BookBuilderComponent } from './components/book-builder/book-builder.component';
import { BookBuilderService } from './book-builder.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookBuilderApiService } from '@domains/book-builder';

@NgModule({
  imports: [SharedModule],
  declarations: [BookBuilderComponent],
  providers: [BookBuilderApiService, BookBuilderService],
  exports: [BookBuilderComponent],
})
export class BookBuilderModule {}
