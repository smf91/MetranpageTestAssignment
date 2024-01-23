import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { BookBuilderModule } from './pages/book-builder/book-builder.module';

const modules = [BookBuilderModule];

@NgModule({
  declarations: [AppComponent],
  //TODO ...modules заменить на lazy loading
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ...modules],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
