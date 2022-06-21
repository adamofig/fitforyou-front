import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
})
export class PicturesComponent implements OnInit {
  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {}

  public onBasicUpload(data: any) {
    console.log('onBasicUpload');

    this.uploadFile(data.files[0]);
    debugger;
  }

  uploadFile(file: any) {
    const filePath = 'name-your-file-path-here';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
  }
}
