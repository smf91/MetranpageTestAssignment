import { NgModule } from '@angular/core';
import { BookBuilderApiService } from './book-builder.api';
import { BookBuilderComponent } from './components/book-builder/book-builder.component';
import { BookBuilderService } from './book-builder.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [BookBuilderComponent],
  providers: [BookBuilderApiService, BookBuilderService],
  exports: [BookBuilderComponent],
})
export class BookBuilderModule {}
