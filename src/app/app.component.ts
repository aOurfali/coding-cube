import { Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  columns = 0;
  lines = 0;
  arrayAsVector = new Array();
  columnsText = [''];
  output = new Array();

  @Output() textChanged = new EventEmitter();

  sortIndices(toSort: string[]) {

    let sortWithIndices = new Array(toSort.length);
    let justIndices = new Array(toSort.length);
    for (var i = 0; i < toSort.length; i++) {
      sortWithIndices[i] = [toSort[i], i];
    }
    sortWithIndices.sort();
    for (var i = 0; i < toSort.length; i++) {
      justIndices[i] = sortWithIndices[i][1];
    }
    return justIndices;
  }

  transpose(matrix: any[]) {
    let [row] = matrix;
    return row.map((value: any, column: any) => matrix.map(row => row[column]));
  }

  onSubmit(f: NgForm) {
    let word: string = f.value.inputWord;
    let text: string = f.value.inputText;

    this.columns = word.length;
    if(text.length % word.length == 0) {
      this.lines = text.length/word.length;
    }
    else{
      this.lines = parseInt(String(text.length/word.length)) + 1;
    }

    this.arrayAsVector = [...new Array(this.lines)].map(el => new Array(this.columns));

    const textChars = text.split('');
    let l = 0;

    for (let i = 0; i < this.lines; i++) {
      for (let j = 0; j < this.columns; j++) {
        if( l < text.length)
        {
          if(textChars[l] == ' ')
          {
            this.arrayAsVector[i][j] = '_';
            l++;
          }
          else {
            this.arrayAsVector[i][j] = textChars[l];
            l++;
          }
        }
        else {
          this.arrayAsVector[i][j] = '_';
        }
      }
    }

    let newMatrix = this.transpose(this.arrayAsVector);
    
    this.columnsText = word.split('');
    
    let sortedIndices = this.sortIndices(this.columnsText);

    let outputMatrix = [...new Array(this.columns)].map(el => new Array(this.lines));

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.lines; j++) {
        outputMatrix[i][j] = newMatrix[sortedIndices[i]][j];
      }
    }
    this.output = this.transpose(outputMatrix);
  }
}
