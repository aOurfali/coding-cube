import { Component } from '@angular/core';
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

  sortString(str: string)
  {
    const strAsArray = str.split('')
    //const newArr = strAsArray.map(char => {strAsArray.indexOf(char)})
    if (str.length <= 1)
      return true;
    else
      /*let mitte = str.length / 2;
      let l -> i <= mitte – 1
      let r -> i >= array.length – mitte – 1
      l = merge_sort(l)
      r = merge_sort(r)
      return verschmelze(l,r)*/
      //let charCount = new Array(26);
      //charCount.fill(0);
      return 0;

  }

  onSubmit(f: NgForm) {
    let word: string = f.value.inputWord;
    let text: string = f.value.inputText;

    debugger;
    this.columns = word.length;
    if(text.length % word.length == 0) {
      this.lines = text.length/word.length;
    }
    else{
      this.lines = parseInt(String(text.length/word.length)) + 1;
    }
    
    const textChars = text.split('');

    this.arrayAsVector = [...new Array(this.columns)].map(el => new Array(this.lines));

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

    console.log(this.arrayAsVector);

    this.columnsText = word.split('');
    this.columnsText.sort();
    console.log(this.columnsText);

    /*
    let i = 0;
    let j = 0;
    let l = 0;

    
    debugger;
    while(l < word.length) {
      if(i < columns && j < lines) {
        if(textChars[l] === ' ') {
          arrayAsVector[i][j] = "_";
          l++;
          i++;
        }
        else {
          arrayAsVector[i][j] = textChars[l];
          l++;
          i++;
        }
      }
      else if (i >= columns && j < lines) {
        if(textChars[l] === ' ') {
          j++;
          i = 0;
          arrayAsVector[i][j] = "_";
          i++;
          l++;
        }
        else {
          arrayAsVector[i][j] = textChars[l];
          l++;
          i++;
        }
      }
    }

    let alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const alphabet = alph.split('');*/
    
  }
}
